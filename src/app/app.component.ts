import { Component } from '@angular/core';
import { ApplicationServiceService } from './services/application-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private applicationServiceService: ApplicationServiceService) {
    this.applicationServiceService.blockUI.subscribe((v) => {
      this.blockDocument(v);
    });
  }
  title = 'esign-app-wizard';
  blockedDocumentCounter: number = 0;
  blockedDocument: boolean = false;
  
  blockDocument(v: boolean) {
    var me = this;
    if (v)
      this.blockedDocumentCounter++;
    else
      if (this.blockedDocumentCounter > 0)
        this.blockedDocumentCounter--;
    let b = this.blockedDocumentCounter > 0;
    if (!b)
      setTimeout(() => { if (me.blockedDocumentCounter == 0) me.blockedDocument = false }, 100);
    else
      this.blockedDocument = b;
    console.log("this.blockedDocument=", this.blockedDocument);
    console.log("this.blockedDocumentCounter=", this.blockedDocumentCounter);
  }}


