import { Component } from '@angular/core';
import { EsignApplication, EsignTemplate, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-esign-template',
  templateUrl: './esign-template.component.html',
  styleUrls: ['./esign-template.component.scss']
})
export class EsignTemplateComponent {
  constructor(private applicationServiceService: ApplicationServiceService, private router: Router) {
  }
  templateOptions: Option[] = [];
  formgroup = new FormGroup({
    id: new FormControl(''),
  });

  onTemplateChange = (ev: any) => {
    var id = ev.value;
    this.readTemplate(id);
  }

  readTemplate(id: string): void {
    var me = this;
    this.applicationServiceService.runAction("templates/" + id,
      (template: EsignTemplate) => { me.setTemplate(template) });
  }

  setTemplate(template: EsignTemplate): void {
    var me = this;
    if (!this.applicationServiceService.esignApplication || this.applicationServiceService.esignApplication.id == '') {
      this.applicationServiceService.setErrorMessage("No application selected.");
      setTimeout(() => {
        me.router.navigateByUrl("/esign-application");
      }, 10);
    }
    else {
      if (!template.applicationId || template.applicationId == '')
        template.applicationId = this.applicationServiceService.esignApplication.id;
      if (template.applicationId != this.applicationServiceService.esignApplication.id) {
        this.applicationServiceService.setErrorMessage("Application data error. This template is registred for another application.");
        setTimeout(() => {
          me.router.navigateByUrl("/esign-application");
        }, 10);
      }

      this.formgroup.patchValue(template);
      this.applicationServiceService.setEsignTemplate(template);
    }
  }


  onNext = () => {
    this.router.navigateByUrl("/esign-template-p8");
  }
  onPrevious = () => {
    this.router.navigateByUrl("/esign-application");
  }
  setTemplateOptions = (v: Option[]) => {
    this.templateOptions = v;
    if (this.templateOptions.length > 0) {
      var templateId = this.templateOptions[0].id;
      this.templateOptions.forEach(option => {
        if (option.id == this.applicationServiceService.esignTemplate?.id) {
          templateId = this.applicationServiceService.esignTemplate?.id;
        }
      });
      this.readTemplate(templateId);
    }
  }

  ngOnInit() {
    var me = this;
    if (this.applicationServiceService.hasValidApplication()) {
      if (this.templateOptions.length == 0)
        this.applicationServiceService.getTemplateOptions(this.setTemplateOptions);
    }
    else {
      setTimeout(() => {
        this.router.navigateByUrl("/esign-application");
      }, 10);
    }
  }
}
