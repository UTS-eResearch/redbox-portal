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

import { Observable } from 'rxjs/Rx';
import services = require('../core/CoreService.js');
import { Sails, Model } from "sails";
import 'rxjs/add/operator/toPromise';
import * as request from "request-promise";
import * as ejs from 'ejs';
import * as fs from 'graceful-fs';
import path = require('path');

import { Index, jsonld } from 'calcyte';
const datacrate = require('datacrate').catalog;

declare var sails: Sails;
declare var RecordsService;

// NOTE: the publication isn't being triggered if you 

// Note: onNotifySuccess doesn't work as simply as I hoped, the method calling 
// it has to explicitly look for it

export module Services {
  /**
   *
   * a Service to extract a DataPub and put it in a DataCrate with the
   * metadata crosswalked into the right JSON-LD
   *
   * @author <a target='_' href='https://github.com/spikelynch'>Mike Lynch</a>
   *
   */
  export class DataPublication extends services.Services.Core.Service {

  	protected _exportedMethods: any = [
  		'exportDataset'
  	];



  	public exportDataset(oid, record, options): Observable<any> {
  		sails.log.info("!exportDataset! " + oid);
   		if( this.metTriggerCondition(oid, record, options) === "true") {

   			sails.log.info("Called exportDataset on update");
      	sails.log.info("oid: " + oid);
      	sails.log.info("options: " + JSON.stringify(options));
				const sitedir = sails.config.datapubs.sites[options['site']];
				if( ! sitedir ) {
					sails.log.error("Unknown publication site " + options['site']);
					return Observable.of(null);
				}

				const md = record['metadata'];

				const drec = md['dataRecord'];
				const drid = drec ? drec['oid'] : undefined;

				if( ! drid ) {
					sails.log.error("Couldn't find dataRecord or id for data pub " + oid);
					sails.log.info(JSON.stringify(record));
					return Observable.of(null)
				}

				sails.log.info("Got data record: " + drid);

				const attachments = md['dataLocations'].filter(
					(a) => a['type'] === 'attachment'
				);

				const dir = path.join(sitedir, oid);
				try {

					sails.log.info("making dataset dir: " + dir);
					fs.mkdirSync(dir);
				} catch(e) {
					sails.log.error("Couldn't create dataset dir " + dir);
					sails.log.error(e.name);
					sails.log.error(e.message);
					sails.log.error(e.stack);
					return Observable.of(null);
				}
				
				sails.log.info("Going to write attachments");
				
				// build a list of observables, each of which writes out an
				// attachment

				const obs = attachments.map((a) => {
					sails.log.info("building attachment observable " + a['name']);
					return RecordsService.getDatastream(drid, a['fileId']).
						flatMap(ds => {
							const filename = path.join(dir, a['name']);
							sails.log.info("about to write " + filename);
							return Observable.fromPromise(this.writeDatastream(ds, filename))
								.catch(error => {
									sails.log.error("Error writing attachment " + a['fileId']);
									sails.log.error(e.name);
									sails.log.error(e.message);
								});
						});
				});

				obs.push(this.makeDataCrate(oid, dir, md));

				return Observable.merge(...obs);
    	} else {
     		sails.log.info(`Not sending notification log for: ${oid}, condition not met: ${_.get(options, "triggerCondition", "")}`)
    		return Observable.of(null);
   		}
  	}


		private writeDatastream(stream: Readable, fn: string): Promise<boolean> {
  		var wstream = fs.createWriteStream(fn);
  		sails.log.info("start writeDatastream " + fn);
  		stream.pipe(wstream);
  		return new Promise<boolean>( (resolve, reject) => {
    		wstream.on('finish', () => {
    			sails.log.info("finished writeDatastream " + fn);
    			resolve(true)
    		}); 
    		wstream.on('error', reject);
  		});
		}


		private makeDataCrate(oid: string, dir: string, metadata: Object): Observable<any> {

			const owner = 'TODO@shouldnt.the.owner.come.from.the.datapub';
			const approver = 'TODO@get.the.logged-in.user';

			return Observable.of({})
				.flatMap(() => {
					return Observable.fromPromise(datacrate.datapub2catalog({
						'id': oid,
						'datapub': metadata,
						'organisation': sails.config.datapubs.datacrate.organization,
						'owner': owner,
						'approver': approver
					}))
				}).flatMap((catalog) => {
					// the following writes out the CATALOG.json and CATALOG.html, and it's all
					// sync because of legacy code in calcyte.
					try {
						const jsonld_h = new jsonld();
						const catalog_json = path.join(dir, sails.config.datapubs.datacrate.catalog_json);
						sails.log.info(`Writing CATALOG.json`);
						jsonld_h.init(catalog);
						jsonld_h.trim_context();
						fs.writeFileSync(catalog_json, JSON.stringify(jsonld_h.json_ld, null, 2));
						const index = new Index();
						index.init(catalog, dir, false);
						sails.log.info(`Writing CATALOG.html`);
						index.make_index_html("text_citation", "zip_path"); //writeFileSync
						return Observable.of({});
					} catch (e) {
						sails.log.error("Error while creating DataCrate");
						sails.log.error(e.name);
						sails.log.error(e.message);
						sails.log.error(e.stack);
						return Observable.of(null);
					}
				}).catch(error => {
					sails.log.error("Error while creating DataCrate");
					sails.log.error(error.name);
					sails.log.error(error.message);
					return Observable.of({});
				});
		}
	}
}

module.exports = new Services.DataPublication().exports();
