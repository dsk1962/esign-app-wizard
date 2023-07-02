import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'esign-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  WSUBTYPES = WIDGET_SUB_TYPES;
  @Input() formgroup?: FormGroup;
  @Input() fieldType: String = this.WSUBTYPES.TEXT;
  @Input() classname: String = "";
  @Input() wrapperClassname: String = "";
  @Input() labelClassname: String = "";
  @Input() initValue?: string | number | null | Date | boolean;
  @Input() tooltip: string = "";
  @Input() placeHolder: string = "";
  @Input() name: string = "";
  @Input() mask: string = "*";
  @Input() pattern: string = "";
  @Input() label: string = "";
  @Input() id?: string;
  @Input() optionLabel?: string = "name";
  @Input() optionValue: string = "id";
  @Input() options: object[] = [];
  @Input() rows: string = "";

  @Input() required: string = "false";
  @Input() readonly: string = "false";
  @Input() onchange: (value: any) => any = () => { };

  getClassName(): string {
    return "esign-inputfield " + this.classname;
  }
  getId(): string {
    return this.id ? this.id : this.name;
  }

  isReadOnly():boolean{
    return this.readonly === 'true';
  }
  isRequired():boolean{
    return this.required === 'true';
  }
  getLabelClassName(): string {
    return "esign-inputfield-label " + this.labelClassname;
  }
  getWrapperClassName(): string {
    return "esign-inputfield-wrapper " + this.wrapperClassname;
  }
}

export enum WIDGET_SUB_TYPES {
  // backend supported type(input fields)
  CHECKBOX = 'checkbox',
  COMBOBOX = 'combobox',
  DATE = 'date',
  MASK = 'mask',
  NUMERIC = 'numeric',
  PASSWORD = 'password',
  TEXT = 'text',
  DISPLAY = 'display',
  HIDDEN = 'hiddenfield',
  TEXTAREA = 'textarea',
  // backend supported type(others)
  IMAGE = 'image'
}
