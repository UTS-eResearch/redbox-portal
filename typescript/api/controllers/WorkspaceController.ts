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

declare var module;
declare var sails;
import {Observable} from 'rxjs/Rx';

declare var _;

declare var BrandingService, WorkspaceService;
/**
 * Package that contains all Controllers.
 */
import controller = require('../core/CoreController.js');

export module Controllers {
    /**
     * WorkspaceType related methods
     *
     * Author: <a href='https://github.com/moisbo' target='_blank'>moisbo</a>
     */
    export class Workspace extends controller.Controllers.Core.Controller {
        protected _exportedMethods: any = [
            'createWorkspace'
        ];

        public bootstrap() {
        }

        public createWorkspace(req, res) {
            let redboxHeaders = {};
            try {
                redboxHeaders = sails.config.workspaces.portal;
            } catch (error) {
                const errorMessage = `redboxHeaders (sails.config.workspaces.portal.authorization) was not found ${sails.config.workspaces.portal.authorization}`;
                sails.log.error(errorMessage);
                this.ajaxFail(req, res, error.message, {status: false, message: errorMessage});
            }
            let recordMetadata = {};
            let rdmpTitle = '';
            const rdmp = req.param('rdmp');
            const username = req.user.username
            const workspaceInfo = req.param('workspaceInfo');
            const workspaceType = req.param('workspaceType');
            const workspaceTitle = workspaceInfo['name'];
            const workspaceLocation = workspaceInfo['location'];
            const workspaceDescription = workspaceInfo['details'];
            let emailPermissions = [];
            const config = {
                workflowStage: 'draft',
                recordType: 'genericWorkspace',
                brandingAndPortalUrl: BrandingService.getFullPath(req),
                redboxHeaders: redboxHeaders
            };
            return WorkspaceService.getRecordMeta(config, rdmp)
                .flatMap(response => {
                    sails.log.debug('getRecordMetadata');
                    recordMetadata = response;
                    rdmpTitle = recordMetadata['title'];
                    const record = {
                        rdmpOid: rdmp,
                        rdmpTitle: rdmpTitle,
                        title: workspaceTitle,
                        location: workspaceLocation,
                        description: workspaceDescription,
                        type: config.recordType,
                        subtype: workspaceType
                    };
                    if (sails.config.workspaces.permissions && Array.isArray(sails.config.workspaces.permissions)) {
                        _.each(sails.config.workspaces.permissions, (o) => {
                            const email = _.get(recordMetadata, o, undefined);
                            if (email) {
                                emailPermissions.push(email);
                            }
                        });
                    }
                    sails.log.debug(`username ${username}`);
                    return WorkspaceService.createWorkspaceRecord(
                        config, username, record, config.recordType, config.workflowStage, emailPermissions
                    );
                }).flatMap(workspace => {
                    sails.log.debug('create WorkspaceRecord');
                    if (recordMetadata['workspaces']) {
                        const wss = recordMetadata['workspaces'].find(id => workspace.oid === id);
                        if (!wss) {
                            recordMetadata['workspaces'].push({id: workspace.oid});
                        }
                    }
                    return WorkspaceService.updateRecordMeta(config, recordMetadata, rdmp);
                })
                .subscribe(response => {
                    sails.log.debug('createWorkspace, linkWorkspace');
                    const workspace = response;
                    this.ajaxOk(req, res, null, {
                        status: true,
                        workspace: workspace
                    });
                }, error => {
                    sails.log.error('request: error');
                    const errorMessage = 'There was an error submitting your request. Please contact support team';
                    sails.log.error(`${errorMessage} ${error.message}`);
                    this.ajaxFail(req, res, error.message, {status: false, message: errorMessage});
                });
        }
    }
}

module.exports = new Controllers.Workspace().exports();
