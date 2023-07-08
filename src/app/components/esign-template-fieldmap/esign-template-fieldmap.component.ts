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
      this.applicationServiceService.saveEsignTemplate(this.formgroup,
        () => { me.router.navigateByUrl("/esign-template-notification"); }
      );
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
        this.formgroup.addControl('fname_' + f.fieldIndex, new FormControl());
        this.formgroup.addControl('fp8_' + f.fieldIndex, new FormControl());
        this.formgroup.addControl('fappname_' + f.fieldIndex, new FormControl());
      }
      else {
        this.formgroup.addControl('fp8n_' + f.fieldIndex++, new FormControl());
        console.info("add " + 'fp8n_' + f.fieldIndex++);
        this.formgroup.addControl('fp8nv_' + f.fieldIndex++, new FormControl());
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
