import { Component, ViewChild } from '@angular/core';
import { EsignApplication, Option } from 'src/app/model/esign-model.model';
import { ApplicationServiceService } from 'src/app/services/application-service.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'esign-template-p8',
  templateUrl: './esign-template-p8.component.html',
  styleUrls: ['./esign-template-p8.component.scss']
})
export class EsignTemplateP8Component {
  constructor(public applicationServiceService: ApplicationServiceService, private router: Router) {
  }

  @ViewChild('classTree') classTree?: Tree;

  showSelector: boolean = false;
  p8ArchiveOptions: Option[] = [{"id":"Y","name":"Yes"},{"id":"N","name":"No"}];
  p8ArchiveOn: boolean = false;
  selectedClass: TreeNode | TreeNode[] | null = null;
  formgroup = new FormGroup({
    id: new FormControl(''),
    applicationId: new FormControl(''),
    p8Archive: new FormControl(''),
    p8DocumentClassLabel: new FormControl(''),
    p8DocumentClass: new FormControl('')
  });

  onP8ArchiveChange = (ev: any) => {
    this.p8ArchiveOn = ev.value == 'Y';
  }

  onNext = () => {
    var me = this;
    if (this.formgroup.valid)
      this.applicationServiceService.saveEsignTemplate(this.formgroup,
        () => { me.router.navigateByUrl("/esign-template-p8"); }
      );
  }
  onPrevious = () => {
    this.router.navigateByUrl("/esign-template");
  }

  onDocClassSelection(ev: any) {
    this.selectedClass = ev.node;
    this.hideDocClassSelector();
    this.setDocClass(this.selectedClass);
  }

  useP8(): boolean {
    return this.applicationServiceService.esignTemplate?.p8Archive == 'Y';
  }

  setDocClass(v: any): void {
    this.formgroup.controls["p8DocumentClassLabel"].setValue(v && v.label ? v.label : '');
    this.formgroup.controls["p8DocumentClass"].setValue(v && v.key ? v.key : '');
  }

  setP8Documents = (v: TreeNode[]) => {
    this.applicationServiceService.p8Documents = v;
    this.selectedClass = v[0];
    this.setDocClass(this.selectedClass);
  }
  showDocClassSelector() {
    this.showSelector = true;
  }

  hideDocClassSelector() {
    this.showSelector = false;
  }
  ngOnInit() {
    var me = this;
    if (this.applicationServiceService.hasValidApplication()) {
      if (this.applicationServiceService.esignTemplate) {
        this.formgroup.patchValue(this.applicationServiceService.esignTemplate);
        if (this.applicationServiceService.p8Documents.length == 0)
          this.applicationServiceService.getP8DocumentClasses(this.setP8Documents);
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
