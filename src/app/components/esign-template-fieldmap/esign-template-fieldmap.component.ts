import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EsignTemplateFieldMap, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';

@Component({
  selector: 'app-esign-template-fieldmap',
  templateUrl: './esign-template-fieldmap.component.html',
  styleUrls: ['./esign-template-fieldmap.component.scss']
})
export class EsignTemplateFieldmapComponent {
  constructor(public applicationServiceService: ApplicationServiceService, private router: Router) {
  }
  formgroup = new FormGroup({
  });

  fieldMapping: EsignTemplateFieldMap[] = [];
  fieldIndex: number = 0;

  p8Properties: Option[] = [];

  onNext = () => {
    var me = this;
    if (this.formgroup.valid)
      this.submitData(() => me.router.navigateByUrl("/esign-template-notification"));
  }

  submitData(successHandler?: any): void {
    var data = this.formgroup.value as any;
    var result = [] as any;
    var s = '';
    Object.keys(data).forEach(key => {
      if (key.startsWith("fp8n_")) {
        var v = new EsignTemplateFieldMap();
        v.p8Property = data[key];
        v.p8DefaultValue = data['fp8nv_' + key.substring("fp8n_".length)];
        result.push(v);
      }
      else if (key.startsWith("fname_")) {
        var v = new EsignTemplateFieldMap();
        v.templateField = data[key];
        v.applicationField = data['fappname_' + key.substring("fname_".length)];
        v.p8Property = data['fp8_' + key.substring("fname_".length)];
        result.push(v);
      }
    });
    this.applicationServiceService.postBody("templates/teplatefieldmap/" + this.applicationServiceService.esignTemplate?.id, result, successHandler);
  }

  hasFormFields(): boolean {
    var c = false;
    return !!this.fieldMapping.find(fm => !!fm.templateField);
  }

  addP8DefaultMap(): void {
    this.fieldIndex++;
    var v = new EsignTemplateFieldMap();
    v.fieldIndex = this.fieldIndex++;
    this.fieldMapping.push(v);
    this.formgroup.addControl('fp8n_' + v.fieldIndex, new FormControl());
    this.formgroup.addControl('fp8nv_' + v.fieldIndex, new FormControl());
  }

  removeP8DefaultMap(index: number): void {
    var entry = this.fieldMapping.find(fm => fm.fieldIndex == index);
    if (entry) {
      this.fieldMapping.splice(this.fieldMapping.indexOf(entry), 1);
      this.formgroup.removeControl('fp8n_' + index);
      this.formgroup.removeControl('fp8nv_' + index);
    }
  }

  setFieldMap = (map: EsignTemplateFieldMap[]) => {
    this.fieldMapping = map;
    this.fieldMapping.forEach(f => {
      f.fieldIndex = this.fieldIndex++;
      if (f.templateField) {
        this.formgroup.addControl('fname_' + f.fieldIndex, new FormControl(f.templateField));
        this.formgroup.addControl('fp8_' + f.fieldIndex, new FormControl(f.p8Property));
        this.formgroup.addControl('fappname_' + f.fieldIndex, new FormControl(f.applicationField));
      }
      else {
        this.formgroup.addControl('fp8n_' + f.fieldIndex, new FormControl(f.p8Property));
        console.info("add " + 'fp8n_' + f.fieldIndex);
        this.formgroup.addControl('fp8nv_' + f.fieldIndex, new FormControl(f.p8DefaultValue));
      }
    });
  }

  readFieldMapping(id: string): void {
    var me = this;
    this.applicationServiceService.runAction("templates/teplatefieldmap/" + id, this.setFieldMap);
    if (this.applicationServiceService.esignTemplate?.p8Archive == 'Y' && this.p8Properties.length == 0)
      this.applicationServiceService.runAction("p8/documentclass/" + this.applicationServiceService.esignTemplate.p8DocumentClass + "/propertydefinitions",
        (v: Option[]) => { me.p8Properties = v; me.p8Properties.unshift({ id: '', name: 'Not Set' }) });
  }

  onPrevious = () => {
    var me = this;
    if (this.formgroup.valid)
      this.applicationServiceService.saveEsignTemplate(this.formgroup,
        () => { me.router.navigateByUrl("/esign-template-notification"); }
      );
  }
  ngOnInit() {
    var me = this;
    console.log("oninit");
    if (this.applicationServiceService.hasValidApplication()) {
      if (this.applicationServiceService.esignTemplate) {
        if (this.fieldMapping.length == 0)
          this.readFieldMapping(this.applicationServiceService.esignTemplate.id);
      }
      else {
        setTimeout(() => {
          this.router.navigateByUrl("/esign-template");
        }, 10);

      }
    }
    else {
      setTimeout(() => {
        this.router.navigateByUrl("/esign-application");
      }, 10);
    }
  }
}
