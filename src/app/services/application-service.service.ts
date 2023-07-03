import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { ActionRequest, EsignApplication, EsignTemplate, Option } from '../model/esign-model.model';
import { FormGroup } from '@angular/forms';

const endpoint = 'http://localhost:8092/ecmsign/';
@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  constructor(private http: HttpClient) {
  }
  private anEsignApplication: Subject<EsignApplication> = new Subject<EsignApplication>();
  public esignApplication = this.anEsignApplication.asObservable();
  private anErrorMessage: Subject<string> = new Subject<string>();    // consider putting the actual type of the data you will receive
  public errorMessage = this.anErrorMessage.asObservable();
  private anInfoMessage: Subject<string> = new Subject<string>();    // consider putting the actual type of the data you will receive
  public infoMessage = this.anInfoMessage.asObservable();

  private applicationHeaders: HttpHeaders = new HttpHeaders();
  public applicationId: string = '';
  public templateId: string = '';
  public template : EsignTemplate = new EsignTemplate();

  setApplicationHeader(obj: any, name: string, value: string) {
    this.applicationHeaders = this.applicationHeaders.set(name, value);
  }

  setApplicationHeaders(form : FormGroup) {
    this.setApplicationHeader(null,"ApplicationId",form.controls["id"].value);
    this.setApplicationHeader(null,"ServiceAccount",form.controls["serviceAccount"].value);
  }

  getApplicationOptions(successHandler: any): void {
    var me = this;
    this.applicationHeaders = new HttpHeaders().set("ApplicationId", "CBJCHBCAABAALcyDpww9YZlYuugnmLQpq0Tbqaicy6f3");
    this.runAction("applications", (v: Option[]) => successHandler(v));
  }
  getTemplateOptions(successHandler: any): void {
    var me = this;
    this.runAction("templates", (v: Option[]) => successHandler(v));
  }

  getP8DocumentClasses(successHandler: any): void {
    var me = this;
    this.runAction("p8/documentclass/tree", (v: Option[]) => successHandler(v));
  }

  setErrorMessage(message: string) {
    this.anErrorMessage.next(message);
  }

  setInfoMessage(message: string) {
    this.anInfoMessage.next(message);
  }

  getStaticForm(obj: any, formName: string) {
    let request = new ActionRequest();
    request.action = "staticForm";
    request.parameters = new HttpParams().append("formPath", formName);
    this.runAction(request);
  }
  private aBlockUI: Subject<boolean> = new Subject<boolean>();    // consider putting the actual type of the data you will receive
  public blockUI = this.aBlockUI.asObservable();

  setBlockUI(value: boolean) {
    this.aBlockUI.next(value);
  }

  runAction(request: ActionRequest | string, successHandler?: any): void {
    this.setBlockUI(true);
    if (typeof request === "string") {
      let action = request;
      request = new ActionRequest();
      request.action = action;
    }

    var params = request.parameters ? request.parameters : {};
    var options = { "params": params, "headers": this.applicationHeaders };
    this.http.get<any>(
      endpoint + request.action, options).subscribe({
        next: data => {
          this.setBlockUI(false);
          if (!data.errorMessage) {
            if (data.formRequest)
              this.runAction(data.formRequest);
            if (data.infoMessage)
              this.setInfoMessage(data.infoMessage);
            if (data.newWindow && data.newWindow.url)
              window.open(data.newWindow.url, data.newWindow.name ? data.newWindow.name : '_blank', data.newWindow.parameters ? data.newWindow.parameters : 'location=yes,scrollbars=yes,status=yes');
            if (successHandler)
              successHandler(data.result);
          }
          else {
            let msg = data.errorMessage ? data.errorMessage : "Operation failed. No error message in response";
            this.setErrorMessage(msg);
          }
        },
        error: error => {
          this.setBlockUI(false);
          this.setErrorMessage(error.message);
          console.error('runAction error!', error);
        }
      });
  }

  postBody(action: string, body: any, successHandler?: any): void {
    this.setBlockUI(true);
    var options = { "headers": this.applicationHeaders };
    this.http.post<any>(
      endpoint + action, body, options).subscribe({
        next: data => {
          this.setBlockUI(false);
          if (data.success) {
            if (data.formRequest)
              this.runAction(data.formRequest);
            if (data.infoMessage)
              this.setInfoMessage(data.infoMessage);
            if (successHandler)
              successHandler(data.result);
          }
          else {
            let msg = data.errorMessage ? data.errorMessage : "Operation failed. No error message in response";
            this.setErrorMessage(msg);
          }
        },
        error: error => {
          this.setBlockUI(false);
          this.setErrorMessage(error.message);
          console.error('postBody error!', error);
        }
      });
  }
  sendForm(obj: any, action: string) {
    let fgroup;
    if (obj instanceof FormGroup)
      fgroup = obj;
    else if (obj.dynamicFormGroup)
      fgroup = obj.dynamicFormGroup as FormGroup;
    let request = new ActionRequest();
    request.action = action;
    request.addParameters(fgroup?.value);
    this.runAction(request);
  }
  sendData(obj: any, action: string, ...params: string[]) {
    let request = new ActionRequest();
    request.action = action;
    if (obj.data) {
      if (params && params.length > 0) {
        const parameters: { [index: string]: any } = {}
        params.forEach(key => {
          if (obj.data[key])
            parameters[key] = obj.data[key];
        });
        request.addParameters(parameters);
      }
      else
        request.addParameters({ "data": obj.data });
    }
    this.runAction(request);
  }

  postForm(obj: any, action: string) {
    let fgroup;
    if (obj instanceof FormGroup)
      fgroup = obj;
    else if (obj.dynamicFormGroup)
      fgroup = obj.dynamicFormGroup as FormGroup;
    let values = fgroup?.value;
    this.postBody(action, values);
  }
  getResource(name: String): Promise<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return lastValueFrom(this.http.get<string>(
      endpoint + 'content/' + name, requestOptions));
  }
}
