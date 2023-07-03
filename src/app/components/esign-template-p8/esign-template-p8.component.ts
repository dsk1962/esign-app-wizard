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
  
  @ViewChild('classTree') classTree? : Tree;

  showSelector:boolean=false;
  p8ArchiveOn:boolean=false;

  p8Documents: TreeNode[] = [];
  selectedClass: TreeNode | TreeNode[] | null = null;
  formgroup = new FormGroup({
    p8Archive: new FormControl(''),
    p8DocumentClassLabel: new FormControl('')
  });

  onP8ArchiveChange = (ev: any) => {
    this.p8ArchiveOn = ev.checked;
  }

  onNext = () => {
    this.router.navigateByUrl("/esign-template");
  }
  onPrevious = () => {
    this.router.navigateByUrl("/esign-template");
  }

  onDocClassSelection(ev: any){
    this.selectedClass = ev.node;
    this.hideDocClassSelector();
    this.setDocClassName(this.selectedClass);
  }

  setDocClassName(v:any):void{
    this.formgroup.controls["p8DocumentClassLabel"].setValue(v && v.label ? v.label:'');
  }

  setP8Documents = (v: TreeNode[]) => {
    this.p8Documents = v;
    this.selectedClass = v[0].children ? v[0].children[4]:null;
    this.setDocClassName(this.selectedClass);
  }
  showDocClassSelector(){
    this.showSelector=true;
  }
  
  hideDocClassSelector(){
    this.showSelector=false;
  }
  ngOnInit() {
    var me = this;
    if (this.p8Documents.length == 0)
      this.applicationServiceService.getP8DocumentClasses(this.setP8Documents);
  }
}
