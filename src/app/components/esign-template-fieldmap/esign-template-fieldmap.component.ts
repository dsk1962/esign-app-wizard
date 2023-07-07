import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  p8Properties: Option[] = [];

  onNext = () => {
    var me = this;
    if (this.formgroup.valid)
      this.applicationServiceService.saveEsignTemplate(this.formgroup,
        () => { me.router.navigateByUrl("/esign-template-notification"); }
      );
  }

  readFieldMapping(id: string): void {
    var me = this;
    this.applicationServiceService.runAction("templates/teplatefieldmap/" + id,
      (map: EsignTemplateFieldMap[]) => { me.fieldMapping = map; });
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
