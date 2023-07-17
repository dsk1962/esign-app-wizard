import { Component } from '@angular/core';
import { EsignApplication, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esign-application',
  templateUrl: './esign-application.component.html',
  styleUrls: ['./esign-application.component.scss']
})
export class EsignApplicationComponent {
  constructor(public applicationServiceService: ApplicationServiceService, private router: Router) {
  }

  formgroup = new FormGroup({
    id: new FormControl('',Validators.maxLength(64)),
    serviceAccount: new FormControl('',Validators.maxLength(32)),
    applicationName: new FormControl(''),
    refreshToken: new FormControl('',Validators.maxLength(256)),
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
    var me = this;
    if (this.formgroup.valid)
      this.applicationServiceService.saveEsignApplication(this.formgroup, () => { me.router.navigateByUrl("/esign-template", { skipLocationChange: true }); });
  }


  setApplication(app: EsignApplication): void {
    this.applicationServiceService.applicationOptions.forEach(option => {
      if (option.id == app.id) { app.applicationName = option.name; }
    });
    this.formgroup.patchValue(app);
    this.applicationServiceService.setEsignApplication(app);
  }

  setApplicationOptions = (v: Option[]) => {
    this.applicationServiceService.applicationOptions = v;
    if (this.applicationServiceService.applicationOptions.length > 0) {
      var appId = this.applicationServiceService.applicationOptions[0].id;
      this.applicationServiceService.applicationOptions.forEach(option => {
        if (option.id == this.applicationServiceService.esignApplication?.id) { appId = this.applicationServiceService.esignApplication.id; }
      });
      if (appId == this.applicationServiceService.esignApplication?.id)
        this.setApplication(this.applicationServiceService.esignApplication);
      else
        this.readApplication(appId);
    }
  }

  ngOnInit() {
    var me = this;
    if (this.applicationServiceService.applicationOptions.length == 0)
      this.applicationServiceService.getApplicationOptions(this.setApplicationOptions);
    else
      this.setApplicationOptions(this.applicationServiceService.applicationOptions);
  }
}
