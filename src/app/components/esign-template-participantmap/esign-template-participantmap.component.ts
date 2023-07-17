import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EsignTemplateParticipantdMap, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';

@Component({
  selector: 'app-esign-template-participantmap',
  templateUrl: './esign-template-participantmap.component.html',
  styleUrls: ['./esign-template-participantmap.component.scss']
})
export class EsignTemplateParticipantmapComponent {
  constructor(public applicationServiceService: ApplicationServiceService, private router: Router) {
  }

  formgroup = new FormGroup({});

  participantMapping: EsignTemplateParticipantdMap[] = [];
  fieldIndex: number = 0;

  roles: Option[] = [
    {id:'',name:'AUTO'},
    {id:'SIGNER',name:'SIGNER'},
    {id:'FORM_FILLER',name:'FORM_FILLER'},
    {id:'APPROVER',name:'APPROVER'},
    {id:'ACCEPTOR',name:'ACCEPTOR'},
    {id:'CERTIFIED_RECIPIENT',name:'CERTIFIED_RECIPIENT'},
    {id:'DELEGATE_TO_SIGNER',name:'DELEGATE_TO_SIGNER'},
    {id:'DELEGATE_TO_APPROVER',name:'DELEGATE_TO_APPROVER'},
    {id:'DELEGATE_TO_ACCEPTOR',name:'DELEGATE_TO_ACCEPTOR'},
    {id:'DELEGATE_TO_CERTIFIED_RECIPIENT',name:'DELEGATE_TO_CERTIFIED_RECIPIENT'},
    {id:'DELEGATE_TO_FORM_FILLER',name:'DELEGATE_TO_FORM_FILLER'},
    {id:'NOTARY_SIGNER',name:'NOTARY_SIGNER'},
    {id:'ELECTRONIC_SEALER',name:'ELECTRONIC_SEALER'},
  ];

  submitData(successHandler?: any): void {
    var data = this.formgroup.value as any;
    var result = [] as any;
    var s = '';
    Object.keys(data).forEach(key => {
      if (key.startsWith("pname_")) {
        var v = new EsignTemplateParticipantdMap();
        v.templateParticipant = data[key];
        v.applicationParticipant = data['pappname_' + key.substring("pname_".length)];
        v.order = data['porder_' + key.substring("pname_".length)];
        v.role = data['prole_' + key.substring("pname_".length)];
        result.push(v);
      }
    });
    this.applicationServiceService.postBody("templates/templateparticipantmap/" + this.applicationServiceService.esignTemplate?.id, result, successHandler);
  }

  setParticipantMap = (map: EsignTemplateParticipantdMap[]) => {
    this.participantMapping = map;
    this.participantMapping.forEach(p => {
      p.fieldIndex = this.fieldIndex++;
        this.formgroup.addControl('pname_' + p.fieldIndex, new FormControl(p.templateParticipant));
        this.formgroup.addControl('pappname_' + p.fieldIndex, new FormControl(p.applicationParticipant, Validators.maxLength(64)));
        this.formgroup.addControl('porder_' + p.fieldIndex, new FormControl(p.order, Validators.min(1)));
        this.formgroup.addControl('prole_' + p.fieldIndex, new FormControl(p.role, Validators.maxLength(64)));
    });
  }

  readParticipantMapping(id: string): void {
    var me = this;
    this.applicationServiceService.runAction("templates/templateparticipantmap/" + id, this.setParticipantMap);
  }

  onPrevious = () => {
    var me = this;
    if (this.formgroup.valid)
      this.submitData(() => me.router.navigateByUrl("/esign-template-fieldmap", { skipLocationChange: true }));
  }
  ngOnInit() {
    var me = this;
    console.log("oninit");
    if (this.applicationServiceService.hasValidApplication()) {
      if (this.applicationServiceService.esignTemplate) {
        if (this.participantMapping.length == 0)
          this.readParticipantMapping(this.applicationServiceService.esignTemplate.id);
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
