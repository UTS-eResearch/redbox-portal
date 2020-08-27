import { Component } from '@angular/core';
import { SimpleComponent } from './field-simple.component';
import { WorkspaceRegisterField } from './workspace-field.component';
import * as _ from "lodash";

@Component({
  selector: 'workspace-register-parent',
  template: ''
})
export class WorkspaceRegisterComponent extends SimpleComponent {
  static clName = 'WorkspaceRegisterComponent';

  getLabel(val: any): string {
    const opt = _.find(this.field.options, (opt) => {
      return opt.value == val;
    });
    if (opt) {
      return opt.label;
    } else {
      return '';
    }
  }

}

@Component({
  selector: 'workspace-register',
  styleUrls: ['./workspace-register.component.css'],
  templateUrl: './workspace-register.component.html'
})
export class WorkspaceRegisterFieldComponent extends WorkspaceRegisterComponent {
  field: WorkspaceRegisterField
  static clName = 'WorkspaceRegisterFieldComponent';
  ngOnInit() {
    this.field.init();
    this.field.registerEvents();
  }
}
