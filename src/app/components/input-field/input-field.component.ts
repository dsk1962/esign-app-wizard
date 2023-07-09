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
  @Input() checked: boolean = false;


  @Input() required: string | boolean = "false";
  @Input() readonly: string = "false";
  @Input() onchange: (value: any) => any = () => { };
  @Input() onclick: (value: any) => any = () => { };

  getClassName(): string {
    return "esign-inputfield " + this.classname;
  }
  getId(): string {
    return this.id ? this.id : this.name;
  }

  isReadOnly(): boolean {
    return this.readonly === 'true';
  }
  isRequired(): boolean {
    return '' + this.required === 'true';
  }
  getLabelClassName(): string {
    return "esign-inputfield-label " + this.labelClassname;
  }
  getWrapperClassName(): string {
    return "esign-inputfield-wrapper " + this.wrapperClassname;
  }
  getErrorList(errorObject: any): any[] {
    if (errorObject) {
      let result: any[] = [];
      Object.keys(errorObject).forEach(key => result.push({ key: key, errorValue: errorObject[key] }));
      return result;
    }
    return [];
  }
  getError(errObject: any): string {
    if (errObject) {
      let err = errObject.key;
      if (err == 'required')
        return 'This field is required';
      if (err == 'pattern')
        return 'Value must match pattern: ' + this.pattern;
      if (err == 'minlength')
        return 'Text length must be greater or equal ' + errObject.errorValue.requiredLength + " actual length: " + errObject.errorValue.actualLength;
      if (err == 'maxlength')
        return 'Text length must be less or equal: ' + errObject.errorValue.requiredLength + " actual length: " + errObject.errorValue.actualLength;
      if (err == 'min')
        return 'Value must be greater or equal  '//; + (this.inputWidget as any)?.minValue;
      if (err == 'max')
        return 'Value must be less or equal  ';// + (this.inputWidget as any)?.maxValue;
      if (err == 'p8PropertyNotUnique')
        return 'P8 property not unique';// + (this.inputWidget as any)?.maxValue;
    }
    return '';
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
