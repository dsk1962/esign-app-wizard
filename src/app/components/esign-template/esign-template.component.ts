import { Component } from '@angular/core';
import { EsignApplication, Option } from 'src/app/model/esign-model.model';
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
    this.formgroup.patchValue(
      {
      }
    );
  }

  onNext = () => {
    this.router.navigateByUrl("/esign-template");
  }
  onPrevious = () => {
    this.router.navigateByUrl("/esign-application");
  }
  setTemplateOptions = (v: Option[]) => {
    this.templateOptions = v;
    if (this.templateOptions.length > 0) {
      var templateId = this.templateOptions[0].id;
      this.templateOptions.forEach(option => {
        if (option.id == this.applicationServiceService.applicationId) { templateId = this.applicationServiceService.applicationId; }
      });
      this.applicationServiceService.templateId = templateId;
      this.formgroup.patchValue(
        {
          id: templateId
        }
      );

    }
  }

  ngOnInit() {
    var me = this;
    if (this.templateOptions.length == 0)
      this.applicationServiceService.getTemplateOptions(this.setTemplateOptions);
  }
}
