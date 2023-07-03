import { Component } from '@angular/core';
import { EsignApplication, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esign-application',
  templateUrl: './esign-application.component.html',
  styleUrls: ['./esign-application.component.scss']
})
export class EsignApplicationComponent {
  constructor(private applicationServiceService: ApplicationServiceService, private router: Router) {
  }
  applicationOptions: Option[] = [];

  formgroup = new FormGroup({
    id: new FormControl(''),
    serviceAccount: new FormControl(''),
    refreshToken: new FormControl(''),
  });

  readApplication(id: string): void {
    var me = this;
    this.applicationServiceService.runAction("application/" + id, (app: EsignApplication) => { me.setApplication(app) });
  }

  onApplicationChange = (ev: any) => {
    var id = ev.value;
    this.formgroup.patchValue(
      {
        serviceAccount: '',
        refreshToken: ''
      }
    );
    this.readApplication(id);
  }

  onNext = () => {
    if (this.formgroup.valid) {
      this.applicationServiceService.setApplicationHeaders(this.formgroup);
      this.router.navigateByUrl("/esign-template");
    }
  }


  setApplication(app: EsignApplication): void {
    this.formgroup.patchValue(
      {
        id: app.id,
        serviceAccount: app.serviceAccount,
        refreshToken: app.refreshToken
      }
    );
    this.applicationServiceService.applicationId = app.id;
  }

  setApplicationOptions = (v: Option[]) => {
    this.applicationOptions = v;
    if (this.applicationOptions.length > 0) {
      var appId = this.applicationOptions[0].id;
      this.applicationOptions.forEach(option => { if (option.id == this.applicationServiceService.applicationId) { appId = this.applicationServiceService.applicationId; } });
      this.applicationServiceService.applicationId = appId;
      this.readApplication(appId);
    }
  }

  ngOnInit() {
    var me = this;
    if (this.applicationOptions.length == 0)
      this.applicationServiceService.getApplicationOptions(this.setApplicationOptions);
  }
}
