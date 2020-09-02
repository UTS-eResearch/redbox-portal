// Copyright (c) 2017 Queensland Cyber Infrastructure Foundation (http://www.qcif.edu.au/)
//
// GNU GENERAL PUBLIC LICENSE
//    Version 2, June 1991
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import {
  Observable
} from 'rxjs/Rx';
import services = require('../core/CoreService.js');
import DatastreamService from '../core/DatastreamService.js';
import {
  Sails,
  Model
} from "sails";
import * as request from "request-promise";
import * as luceneEscapeQuery from "lucene-escape-query";
import * as fs from 'fs';
import moment = require('moment');
import RecordsService from '../core/RecordsService.js';
import SearchService from '../core/SearchService.js';
import {
  isObservable
} from 'rxjs';
import StorageService from '../core/StorageService.js';
const util = require('util');

declare var FormsService, RolesService, UsersService, WorkflowStepsService, RecordTypesService, RedboxJavaStorageService;
declare var sails: Sails;
declare var _;
declare var _this;

export module Services {
  /**
   * Records related functions...
   *
   * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
   *
   */
  export class Records extends services.Services.Core.Service implements DatastreamService, RecordsService, SearchService, StorageService {

    storageService: StorageService = null;


    constructor() {
      super();
      let that = this;
      sails.on('ready', function () {
        that.getStorageService();
      });
    }

    getStorageService() {
      if (_.isEmpty(sails.config.storage) || _.isEmpty(sails.config.storage.serviceName)) {
        this.storageService = RedboxJavaStorageService;
  
      } else {
        this.storageService = sails.services[sails.config.storage.serviceName];
      }
    }

    protected _exportedMethods: any = [
      'create',
      'updateMeta',
      'getMeta',
      'hasEditAccess',
      'hasViewAccess',
      'search',
      'createBatch',
      'provideUserAccessAndRemovePendingAccess',
      'searchFuzzy',
      'addDatastream',
      'addDatastreams',
      'removeDatastream',
      'updateDatastream',
      'getDatastream',
      'listDatastreams',
      'deleteFilesFromStageDir',
      'getRelatedRecords',
      'delete',
      'updateNotificationLog',
      'updateWorkflowStep',
      'triggerPreSaveTriggers',
      'triggerPostSaveTriggers',
      'triggerPostSaveSyncTriggers',
      'checkRedboxRunning',
      'getAttachments',
      'appendToRecord'
    ];



    create(brand: any, record: any, recordType: any, user ? : any, triggerPreSaveTriggers ? : boolean, triggerPostSaveTriggers ? : boolean): Promise < any > {
      return this.storageService.create(brand, record, recordType, user, triggerPreSaveTriggers, triggerPostSaveTriggers);
    }
    updateMeta(brand: any, oid: any, record: any, user ? : any, triggerPreSaveTriggers ? : boolean, triggerPostSaveTriggers ? : boolean): Promise < any > {
      return this.storageService.updateMeta(brand, oid, record, user, triggerPreSaveTriggers, triggerPostSaveTriggers);
    }
    getMeta(oid: any): Promise < any > {
      return this.storageService.getMeta(oid);
    }
    createBatch(type: any, data: any, harvestIdFldName: any): Promise < any > {
      return this.storageService.createBatch(type, data, harvestIdFldName);
    }
    provideUserAccessAndRemovePendingAccess(oid: any, userid: any, pendingValue: any): void {
      this.storageService.provideUserAccessAndRemovePendingAccess(oid, userid, pendingValue);
    }
    getRelatedRecords(oid: any, brand: any): Promise < any > {
      return this.storageService.getRelatedRecords(oid, brand);
    }
    delete(oid: any): Promise < any > {
      return this.storageService.delete(oid);
    }
    updateNotificationLog(oid: any, record: any, options: any): Promise < any > {
      return this.storageService.updateNotificationLog(oid, record, options);
    }

    // Gets attachments for this record, will use the `sails.config.record.datastreamService` if set, otherwise will use this service
    //
    // Params:
    // oid - record idea
    // labelFilterStr - set if you want to be selective in your attachments, will just run a simple `.indexOf`
    public getAttachments(oid: string, labelFilterStr: string = undefined): Promise < any > {
      let datastreamServiceName = sails.config.record.datastreamService;
      if (datastreamServiceName == undefined) {
        datastreamServiceName = "recordsservice";
      }
      let datastreamService = sails.services[datastreamServiceName];
      return datastreamService.listDatastreams(oid)
        .flatMap(datastreams => {
          let attachments = [];
          _.each(datastreams['datastreams'], datastream => {
            let attachment = {};
            attachment['dateUpdated'] = moment(datastream['lastModified']['$date']).format();
            attachment['label'] = datastream['label'];
            attachment['contentType'] = datastream['contentType'];
            if (_.isUndefined(labelFilterStr) && _.isEmpty(labelFilterStr)) {
              attachments.push(attachment);
            } else {
              if (datastream['label'] && datastream['label'].indexOf(labelFilterStr) != -1) {
                attachments.push(attachment);
              }
            }
          });
          return Observable.of(attachments).toPromise();
        });
    }

    /*
     * TODO: Move/remove this block once direct mongo access is implemented
     */
    public async checkRedboxRunning(): Promise < any > {
      // check if a valid storage plugin is loaded....
      if (!_.isEmpty(sails.config.storage)) {
        sails.log.info("ReDBox storage plugin is active!");
        return true;
      }
      let retries = 1000;
      for (let i = 0; i < retries; i++) {
        try {
          let response: any = await this.info();
          if (response['applicationVersion']) {
            return true;
          }
        } catch (err) {
          sails.log.info("ReDBox Storage hasn't started yet. Retrying...")
        }
        await this.sleep(1000);
      }
      return false;
    }

    private sleep(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms)
      });
    }

    private info(): Promise < any > {

      const options = this.getOptions(sails.config.record.baseUrl.redbox + sails.config.record.api.info.url);
      return request[sails.config.record.api.info.method](options)
    }

    protected getOptions(url, oid = null, packageType = null, isJson: boolean = true) {
      if (!_.isEmpty(oid)) {
        url = url.replace('$oid', oid);
      }
      if (!_.isEmpty(packageType)) {
        url = url.replace('$packageType', packageType);
      }
      const opts: any = {
        url: url,
        headers: {
          'Authorization': `Bearer ${sails.config.redbox.apiKey}`
        }
      };
      if (isJson == true) {
        opts.json = true;
        opts.headers['Content-Type'] = 'application/json; charset=utf-8';
      } else {
        opts.encoding = null;
      }
      return opts;
    }


    /**
     * End of block to move/remove
     */



    /**
     * Sets/appends to a field in the targetRecord
     *
     * @param  targetRecordOid - the record to modify
     * @param  data - the data to set
     * @param  fieldName - the field name to use
     * @param  fieldType - blank for any, 'array' to create an array
     * @param  targetRecord - leave blank, otherwise will use this record for updates...
     * @return - response of the update
     */
    public async appendToRecord(targetRecordOid: string, linkData: any, fieldName: string, fieldType: string = undefined, targetRecord: any = undefined) {
      sails.log.verbose(`RecordsService::Appending to record:${targetRecordOid}`);
      if (_.isEmpty(targetRecord)) {
        sails.log.verbose(`RecordsService::Getting record metadata:${targetRecordOid}`);
        targetRecord = await this.getMeta(targetRecordOid);
      }
      const existingData = _.get(targetRecord, fieldName);
      if (_.isUndefined(existingData)) {
        if (fieldType == "array") {
          linkData = [linkData];
        }
      } else if (_.isArray(existingData)) {
        existingData.push(linkData);
        linkData = existingData;
      }
      _.set(targetRecord, fieldName, linkData);
      sails.log.verbose(`RecordsService::Updating record:${targetRecordOid}`);
      return await this.updateMeta(null, targetRecordOid, targetRecord);
    }


    /**
     * Compares existing record metadata with new metadata and either removes or deletes the datastream from the record
     */
    public updateDatastream(oid, record, newMetadata, fileRoot, fileIdsAdded) {
      // loop thru the attachment fields and determine if we need to add or remove
      return FormsService.getFormByName(record.metaMetadata.form, true).flatMap(form => {
        const reqs = [];
        record.metaMetadata.attachmentFields = form.attachmentFields;
        _.each(form.attachmentFields, (attField) => {
          const oldAttachments = record.metadata[attField];
          const newAttachments = newMetadata[attField];
          const removeIds = [];
          // process removals
          if (!_.isUndefined(oldAttachments) && !_.isNull(oldAttachments) && !_.isNull(newAttachments)) {
            const toRemove = _.differenceBy(oldAttachments, newAttachments, 'fileId');
            _.each(toRemove, (removeAtt) => {
              if (removeAtt.type == 'attachment') {
                removeIds.push(removeAtt.fileId);
              }
            });
          }
          // process additions
          if (!_.isUndefined(newAttachments) && !_.isNull(newAttachments)) {
            const toAdd = _.differenceBy(newAttachments, oldAttachments, 'fileId');
            _.each(toAdd, (addAtt) => {
              if (addAtt.type == 'attachment') {
                fileIdsAdded.push(addAtt.fileId);
              }
            });
          }
          const req = this.addAndRemoveDatastreams(oid, fileIdsAdded, removeIds);
          if (req) {
            reqs.push(req);
          }
        });
        if (!_.isEmpty(reqs)) {
          return Observable.of(reqs);
        } else {
          return Observable.of(null);
        }
      });
    }

    public removeDatastream(oid, fileId) {
      const apiConfig = sails.config.record.api.removeDatastream;
      const opts = this.getOptions(`${sails.config.record.baseUrl.redbox}${apiConfig.url}`, oid);
      opts.url = `${opts.url}?skipReindex=true&datastreamId=${fileId}`;
      return request[apiConfig.method](opts);
    }

    public addDatastream(oid, fileId) {
      const apiConfig = sails.config.record.api.addDatastream;
      const opts = this.getOptions(`${sails.config.record.baseUrl.redbox}${apiConfig.url}`, oid);
      opts.url = `${opts.url}?skipReindex=true&datastreamId=${fileId}`;
      const fpath = `${sails.config.record.attachments.stageDir}/${fileId}`;
      opts['formData'] = {
        content: fs.createReadStream(fpath)
      };
      return request[apiConfig.method](opts);
    }

    public addAndRemoveDatastreams(oid, addIds: any[], removeIds: any[]) {
      const apiConfig = sails.config.record.api.addAndRemoveDatastreams;
      const opts = this.getOptions(`${sails.config.record.baseUrl.redbox}${apiConfig.url}`, oid);
      opts.url = `${opts.url}?skipReindex=false`;
      if (!_.isEmpty(removeIds)) {
        const removeDataStreamIds = removeIds.join(',');
        opts.url = `${opts.url}&removePayloadIds=${removeDataStreamIds}`;
      }
      if (!_.isEmpty(addIds)) {
        const formData = {};
        _.each(addIds, fileId => {
          const fpath = `${sails.config.record.attachments.stageDir}/${fileId}`;
          formData[fileId] = fs.createReadStream(fpath);
        });
        opts['formData'] = formData;
        opts.json = false;
        opts.headers['Content-Type'] = 'application/octet-stream';
      }
      if (_.size(addIds) > 0 || _.size(removeIds) > 0) {
        return request[apiConfig.method](opts);
      }
    }

    public addDatastreams(oid, fileIds: any[]) {
      const apiConfig = sails.config.record.api.addDatastreams;
      const opts = this.getOptions(`${sails.config.record.baseUrl.redbox}${apiConfig.url}`, oid);
      opts.url = `${opts.url}?skipReindex=false&datastreamIds=${fileIds.join(',')}`;
      const formData = {};
      _.each(fileIds, fileId => {
        const fpath = `${sails.config.record.attachments.stageDir}/${fileId}`;
        formData[fileId] = fs.createReadStream(fpath);
      });
      opts['formData'] = formData;

      return request[apiConfig.method](opts);
    }

    public getDatastream(oid, fileId) {
      const apiConfig = sails.config.record.api.getDatastream;
      const opts: any = this.getOptions(`${sails.config.record.baseUrl.redbox}${apiConfig.url}`, oid, null, false);
      opts.url = `${opts.url}?datastreamId=${fileId}`;
      opts.headers['Content-Type'] = 'application/octet-stream';
      opts.headers['accept'] = 'application/octet-stream';
      opts.resolveWithFullResponse = true;
      opts.timeout = apiConfig.readTimeout;
      sails.log.verbose(`Getting datastream using: `);
      sails.log.verbose(JSON.stringify(opts));
      return Observable.fromPromise(request[apiConfig.method](opts));
    }

    public listDatastreams(oid, fileId) {
      const apiConfig = sails.config.record.api.listDatastreams;
      const opts: any = this.getOptions(`${sails.config.record.baseUrl.redbox}${apiConfig.url}`, oid);

      return Observable.fromPromise(request[apiConfig.method](opts));
    }

    public deleteFilesFromStageDir(stageDir, fileIds) {
      _.each(fileIds, fileId => {
        const path = `${stageDir}/${fileId}`;
        fs.unlinkSync(path);
      });
    }



    /**
     * Fine-grained access to the record, converted to sync.
     *
     */
    public hasViewAccess(brand, user, roles, record): boolean {
      // merge with the edit user and roles, since editors are viewers too...
      const viewArr = record.authorization ? _.union(record.authorization.view, record.authorization.edit) : _.union(record.authorization_view, record.authorization_edit);
      const viewRolesArr = record.authorization ? _.union(record.authorization.viewRoles, record.authorization.editRoles) : _.union(record.authorization_viewRoles, record.authorization_editRoles);

      const uname = user.username;

      const isInUserView = _.find(viewArr, username => {
        return uname == username;
      });
      if (!_.isUndefined(isInUserView)) {
        return true;
      }
      const isInRoleView = _.find(viewRolesArr, roleName => {
        const role = RolesService.getRole(brand, roleName);
        return role && !_.isUndefined(_.find(roles, r => {
          return role.id == r.id;
        }));
      });
      return !_.isUndefined(isInRoleView);
      // Lines below commented out because we're not checking workflow auths anymore,
      // we're expecting that the workflow auths are bolted into the document on workflow updates.
      //
      // if (isInRoleEdit !== undefined) {
      //   return Observable.of(true);
      // }
      //
      // return WorkflowStepsService.get(brand, record.workflow.stage).flatMap(wfStep => {
      //   const wfHasRoleEdit = _.find(wfStep.config.authorization.editRoles, roleName => {
      //     const role = RolesService.getRole(brand, roleName);
      //     return role && UsersService.hasRole(user, role);
      //   });
      //   return Observable.of(wfHasRoleEdit !== undefined);
      // });
    }

    /**
     * Fine-grained access to the record, converted to sync.
     *
     */
    public hasEditAccess(brand, user, roles, record): boolean {
      const editArr = record.authorization ? record.authorization.edit : record.authorization_edit;
      const editRolesArr = record.authorization ? record.authorization.editRoles : record.authorization_editRoles;
      const uname = user.username;

      const isInUserEdit = _.find(editArr, username => {
        sails.log.verbose(`Username: ${uname} == ${username}`);
        return uname == username;
      });
      // sails.log.verbose(`isInUserEdit: ${isInUserEdit}`);
      if (!_.isUndefined(isInUserEdit)) {
        return true;
      }
      const isInRoleEdit = _.find(editRolesArr, roleName => {
        const role = RolesService.getRole(brand, roleName);
        return role && !_.isUndefined(_.find(roles, r => {
          return role.id == r.id;
        }));
      });
      return !_.isUndefined(isInRoleEdit);
      // Lines below commented out because we're not checking workflow auths anymore,
      // we're expecting that the workflow auths are bolted into the document on workflow updates.
      //
      // if (isInRoleEdit !== undefined) {
      //   return Observable.of(true);
      // }
      //
      // return WorkflowStepsService.get(brand, record.workflow.stage).flatMap(wfStep => {
      //   const wfHasRoleEdit = _.find(wfStep.config.authorization.editRoles, roleName => {
      //     const role = RolesService.getRole(brand, roleName);
      //     return role && UsersService.hasRole(user, role);
      //   });
      //   return Observable.of(wfHasRoleEdit !== undefined);
      // });
    }



    public search(type, searchField, searchStr, returnFields): Promise < any > {
      const url = `${this.getSearchTypeUrl(type, searchField, searchStr)}&start=0&rows=${sails.config.record.export.maxRecords}`;
      sails.log.verbose(`Searching using: ${url}`);
      const options = this.getOptions(url);
      return Observable.fromPromise(request[sails.config.record.api.search.method](options))
        .flatMap(resp => {
          let response: any = resp;
          const customResp = [];
          _.forEach(response.response.docs, solrdoc => {
            const customDoc = {};
            _.forEach(returnFields, retField => {
              customDoc[retField] = solrdoc[retField][0];
            });
            customResp.push(customDoc);
          });
          return Observable.of(customResp);
        }).toPromise();
    }

    public searchFuzzy(type, workflowState, searchQuery, exactSearches, facetSearches, brand, user, roles, returnFields): Promise < any > {
      const username = user.username;
      // const url = `${this.getSearchTypeUrl(type, searchField, searchStr)}&start=0&rows=${sails.config.record.export.maxRecords}`;
      let searchParam = workflowState ? ` AND workflow_stage:${workflowState} ` : '';
      searchParam = `${searchParam} AND full_text:${searchQuery}`;
      _.forEach(exactSearches, (exactSearch) => {
        searchParam = `${searchParam}&fq=${exactSearch.name}:${this.luceneEscape(exactSearch.value)}`
      });
      if (facetSearches.length > 0) {
        searchParam = `${searchParam}&facet=true`
        _.forEach(facetSearches, (facetSearch) => {
          searchParam = `${searchParam}&facet.field=${facetSearch.name}${_.isEmpty(facetSearch.value) ? '' : `&fq=${facetSearch.name}:${this.luceneEscape(facetSearch.value)}`}`
        });
      }

      let url = `${sails.config.record.baseUrl.redbox}${sails.config.record.api.search.url}?q=metaMetadata_brandId:${brand.id} AND metaMetadata_type:${type}${searchParam}&version=2.2&wt=json&sort=date_object_modified desc`;
      url = this.addAuthFilter(url, username, roles, brand, false)
      sails.log.error(`Searching fuzzy using: ${url}`);
      const options = this.getOptions(url);
      return Observable.fromPromise(request[sails.config.record.api.search.method](options))
        .flatMap(resp => {
          let response: any = resp;
          const customResp = {
            records: []
          };
          _.forEach(response.response.docs, solrdoc => {
            const customDoc = {};
            _.forEach(returnFields, retField => {
              if (_.isArray(solrdoc[retField])) {
                customDoc[retField] = solrdoc[retField][0];
              } else {
                customDoc[retField] = solrdoc[retField];
              }
            });
            customDoc["hasEditAccess"] = this.hasEditAccess(brand, user, roles, solrdoc);
            customResp.records.push(customDoc);
          });
          // check if have facets turned on...
          if (response.facet_counts) {
            customResp['facets'] = [];
            _.forOwn(response.facet_counts.facet_fields, (facet_field, facet_name) => {
              const numFacetsValues = _.size(facet_field) / 2;
              const facetValues = [];
              for (var i = 0, j = 0; i < numFacetsValues; i++) {
                facetValues.push({
                  value: facet_field[j++],
                  count: facet_field[j++]
                });
              }
              customResp['facets'].push({
                name: facet_name,
                values: facetValues
              });
            });
          }
          return Observable.of(customResp);
        }).toPromise();
    }

    protected addAuthFilter(url, username, roles, brand, editAccessOnly = undefined) {

      var roleString = ""
      var matched = false;
      for (var i = 0; i < roles.length; i++) {
        var role = roles[i]
        if (role.branding == brand.id) {
          if (matched) {
            roleString += " OR ";
            matched = false;
          }
          roleString += roles[i].name;
          matched = true;
        }
      }
      url = url + "&fq=authorization_edit:" + username + (editAccessOnly ? "" : (" OR authorization_view:" + username + " OR authorization_viewRoles:(" + roleString + ")")) + " OR authorization_editRoles:(" + roleString + ")";
      return url;
    }


    protected getSearchTypeUrl(type, searchField = null, searchStr = null) {
      const searchParam = searchField ? ` AND ${searchField}:${searchStr}*` : '';
      return `${sails.config.record.baseUrl.redbox}${sails.config.record.api.search.url}?q=metaMetadata_type:${type}${searchParam}&version=2.2&wt=json&sort=date_object_modified desc`;
    }



    protected luceneEscape(str: string) {
      return luceneEscapeQuery.escape(str);
    }





    /**
     *  Pre-save trigger to clear and re-assign permissions based on security config
     *
     */
    public assignPermissions(oid, record, options, user) {

      // sails.log.verbose(`Assign Permissions executing on oid: ${oid}, using options:`);
      // sails.log.verbose(JSON.stringify(options));
      // sails.log.verbose(`With record: `);
      // sails.log.verbose(record);
      // const emailProperty = _.get(options, "emailProperty", "email");
      // const editContributorProperties = _.get(options, "editContributorProperties", []);
      // const viewContributorProperties = _.get(options, "viewContributorProperties", []);
      // let authorization = _.get(record, "authorization", {});
      // let editContributorObs = [];
      // let viewContributorObs = [];
      // let editContributorEmails = [];
      // let viewContributorEmails = [];
      //
      // // get the new editor list...
      // editContributorEmails = this.populateContribList(editContributorProperties, record, emailProperty, editContributorEmails);
      // // get the new viewer list...
      // viewContributorEmails = this.populateContribList(viewContributorProperties, record, emailProperty, viewContributorEmails);
      //
      // if (_.isEmpty(editContributorEmails)) {
      //   sails.log.error(`No editors for record: ${oid}`);
      // }
      // if (_.isEmpty(viewContributorEmails)) {
      //   sails.log.error(`No viewers for record: ${oid}`);
      // }
      // _.each(editContributorEmails, editorEmail => {
      //   editContributorObs.push(this.getObservable(User.findOne({email: editorEmail})));
      // });
      // _.each(viewContributorEmails, viewerEmail => {
      //   viewContributorObs.push(this.getObservable(User.findOne({email: viewerEmail})));
      // });
      //
      // return Observable.zip(...editContributorObs)
      // .flatMap(editContributorUsers => {
      //   let newEditList = [];
      //   this.filterPending(editContributorUsers, editContributorEmails, newEditList);
      //   record.authorization.edit = newEditList;
      //   record.authorization.editPending = editContributorEmails;
      //   return Observable.zip(...viewContributorObs);
      // })
      // .flatMap(viewContributorUsers => {
      //   let newviewList = [];
      //   this.filterPending(viewContributorUsers, editContributorEmails, newviewList);
      //   record.authorization.view = newviewList;
      //   record.authorization.viewPending = viewContributorEmails;
      //   return Observable.of(record);
      // });
    }

    public updateWorkflowStep(currentRec, nextStep): void {
      if (!_.isEmpty(nextStep)) {
        currentRec.previousWorkflow = currentRec.workflow;
        currentRec.workflow = nextStep.config.workflow;
        // TODO: validate data with form fields
        currentRec.metaMetadata.form = nextStep.config.form;
        // Check for JSON-LD config
        if (sails.config.jsonld.addJsonLdContext) {
          currentRec.metadata['@context'] = sails.config.jsonld.contexts[currentRec.metaMetadata.form];
        }
        // update authorizations based on workflow...
        currentRec.authorization.viewRoles = nextStep.config.authorization.viewRoles;
        currentRec.authorization.editRoles = nextStep.config.authorization.editRoles;
      }
    }

    public async triggerPreSaveTriggers(oid: string, record: any, recordType: object, mode: string = 'onUpdate', user: object = undefined) {
      sails.log.verbose("Triggering pre save triggers for record type: ");
      sails.log.verbose(`hooks.${mode}.pre`);
      sails.log.verbose(JSON.stringify(recordType));

      let preSaveUpdateHooks = _.get(recordType, `hooks.${mode}.pre`, null);
      sails.log.debug(preSaveUpdateHooks);

      if (_.isArray(preSaveUpdateHooks)) {

        for (var i = 0; i < preSaveUpdateHooks.length; i++) {
          let preSaveUpdateHook = preSaveUpdateHooks[i];
          let preSaveUpdateHookFunctionString = _.get(preSaveUpdateHook, "function", null);
          if (preSaveUpdateHookFunctionString != null) {
            let preSaveUpdateHookFunction = eval(preSaveUpdateHookFunctionString);
            let options = _.get(preSaveUpdateHook, "options", {});


            sails.log.verbose(`Triggering pre save triggers: ${preSaveUpdateHookFunctionString}`);
            let hookResponse = preSaveUpdateHookFunction(oid, record, options, user);
            record = await this.resolveHookResponse(hookResponse);

          }
        }
      }
      return record;
    }

    public async triggerPostSaveSyncTriggers(oid: string, record: any, recordType: any, mode: string = 'onUpdate', user: object = undefined, response: any = {}) {
      sails.log.debug("Triggering post save sync triggers ");
      sails.log.debug(`hooks.${mode}.postSync`);
      sails.log.debug(recordType);
      let postSaveSyncHooks = _.get(recordType, `hooks.${mode}.postSync`, null);
      if (_.isArray(postSaveSyncHooks)) {
        for (var i = 0; i < postSaveSyncHooks.length; i++) {
          let postSaveSyncHook = postSaveSyncHooks[i];
          sails.log.debug(postSaveSyncHooks);
          let postSaveSyncHooksFunctionString = _.get(postSaveSyncHook, "function", null);
          if (postSaveSyncHooksFunctionString != null) {
            let postSaveSyncHookFunction = eval(postSaveSyncHooksFunctionString);
            let options = _.get(postSaveSyncHook, "options", {});
            if (_.isFunction(postSaveSyncHookFunction)) {
              sails.log.debug(`Triggering post-save sync trigger: ${postSaveSyncHooksFunctionString}`)
              let hookResponse = postSaveSyncHookFunction(oid, record, options, user, response);
              response = await this.resolveHookResponse(hookResponse);
              sails.log.debug(`${postSaveSyncHooksFunctionString} response now is:`);
              sails.log.verbose(JSON.stringify(response));
              sails.log.debug(`post-save trigger ${postSaveSyncHooksFunctionString} completed for ${oid}`)
            } else {
              sails.log.error(`Post save function: '${postSaveSyncHooksFunctionString}' did not resolve to a valid function, what I got:`);
              sails.log.error(postSaveSyncHookFunction);
            }
          }
        }
      }
      return response;
    }



    public triggerPostSaveTriggers(oid: string, record: any, recordType: any, mode: string = 'onUpdate', user: object = undefined): void {
      sails.log.debug("Triggering post save triggers ");
      sails.log.debug(`hooks.${mode}.post`);
      sails.log.debug(recordType);
      let postSaveCreateHooks = _.get(recordType, `hooks.${mode}.post`, null);
      if (_.isArray(postSaveCreateHooks)) {
        _.each(postSaveCreateHooks, postSaveCreateHook => {
          sails.log.debug(postSaveCreateHook);
          let postSaveCreateHookFunctionString = _.get(postSaveCreateHook, "function", null);
          if (postSaveCreateHookFunctionString != null) {
            let postSaveCreateHookFunction = eval(postSaveCreateHookFunctionString);
            let options = _.get(postSaveCreateHook, "options", {});
            if (_.isFunction(postSaveCreateHookFunction)) {
              postSaveCreateHookFunction(oid, record, options, user).subscribe(result => {
                sails.log.debug(`post-save trigger ${postSaveCreateHookFunctionString} completed for ${oid}`)
              });
            } else {
              sails.log.error(`Post save function: '${postSaveCreateHookFunctionString}' did not resolve to a valid function, what I got:`);
              sails.log.error(postSaveCreateHookFunction);
            }
          }
        });
      }
    }

    private resolveHookResponse(hookResponse) {
      let response = hookResponse;
      if (isObservable(hookResponse)) {
        response = hookResponse.toPromise();
      } else {
        response = Promise.resolve(hookResponse);
      }
      return response;
    }

    

  }
}
module.exports = new Services.Records().exports();