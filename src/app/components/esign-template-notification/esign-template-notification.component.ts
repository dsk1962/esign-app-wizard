import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationServiceService } from 'src/app/services/application-service.service';

@Component({
  selector: 'app-esign-template-notification',
  templateUrl: './esign-template-notification.component.html',
  styleUrls: ['./esign-template-notification.component.scss']
})
export class EsignTemplateNotificationComponent {
  constructor(public applicationServiceService: ApplicationServiceService, private router: Router) {
  }
  formgroup = new FormGroup({
    id: new FormControl(''),
    applicationId: new FormControl(''),
    notificationEndpoint: new FormControl('',Validators.maxLength(256)),
    notificationRequired: new FormControl('',Validators.maxLength(1)),
  });

  onNext = () => {
    var me = this;
    if (this.formgroup.valid)
      this.applicationServiceService.saveEsignTemplate(this.formgroup,
        () => { me.router.navigateByUrl("/esign-template-fieldmap", { skipLocationChange: true }); }
      );
  }
  onPrevious = () => {
    var me = this;
    if (this.formgroup.valid)
      this.applicationServiceService.saveEsignTemplate(this.formgroup,
        () => { me.router.navigateByUrl("/esign-template-p8", { skipLocationChange: true }); }
      );
  }
  ngOnInit() {
    var me = this;
    if (this.applicationServiceService.hasValidApplication()) {
      if (this.applicationServiceService.esignTemplate) {
        if (this.applicationServiceService.esignTemplate?.notificationRequired != 'Y')
          this.applicationServiceService.esignTemplate.notificationRequired = 'N';
        this.formgroup.patchValue(this.applicationServiceService.esignTemplate);
      }
      else {
        setTimeout(() => {
          this.router.navigateByUrl("/esign-template", { skipLocationChange: true });
        }, 10);

      }
    }
    else {
      setTimeout(() => {
        this.router.navigateByUrl("/esign-application", { skipLocationChange: true });
      }, 10);
    }
  }

}
