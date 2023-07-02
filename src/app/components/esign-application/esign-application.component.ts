import { Component } from '@angular/core';
import { EsignApplication, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-esign-application',
  templateUrl: './esign-application.component.html',
  styleUrls: ['./esign-application.component.scss']
})
export class EsignApplicationComponent {
  constructor(private applicationServiceService: ApplicationServiceService) {
    this.applicationServiceService.applicationOptions.subscribe((v) => {
      this.applicationOptions = v;
      if (this.applicationOptions.length > 0)
        this.applicationId = this.applicationOptions[1]["id"];
        this.readApplication(this.applicationId);
    });
  }
  applicationOptions: Option[] = [];
  applicationId: string = "";

  formgroup = new FormGroup({
    id: new FormControl(''),
    serviceAccount: new FormControl(''),
    refreshToken: new FormControl(''),
  });

  readApplication(id: string): void {
    var me = this;
    this.applicationServiceService.runAction("application/" + id, (app: EsignApplication) => {me.setApplication(app) });
  }

  onApplicationChange = (ev:any)=>{
    var id = ev.value;
    this.formgroup.patchValue(
      {
        serviceAccount: '',
        refreshToken: ''
      }
    );
    this.readApplication(id);
  }

  setApplication(app: EsignApplication): void {
    this.formgroup.patchValue(
      {
        id: app.id,
        serviceAccount: app.serviceAccount,
        refreshToken: app.refreshToken
      }
    );
  }
}
