import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EsignApplicationComponent } from './components/esign-application/esign-application.component';
import { EsignTemplateComponent } from './components/esign-template/esign-template.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { CalendarModule } from 'primeng/calendar';
import { BlockUIModule } from 'primeng/blockui';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EsignTemplateP8Component } from './components/esign-template-p8/esign-template-p8.component';
import { EsignTemplateNotificationComponent } from './components/esign-template-notification/esign-template-notification.component';
import { MessageAreaComponent } from './components/message-area/message-area.component';
import { EsignTemplateFieldmapComponent } from './components/esign-template-fieldmap/esign-template-fieldmap.component';

@NgModule({
  declarations: [
    AppComponent,
    EsignApplicationComponent,
    EsignTemplateComponent,
    InputFieldComponent,
    EsignTemplateP8Component,
    EsignTemplateNotificationComponent,
    MessageAreaComponent,
    EsignTemplateFieldmapComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot([
      {path: 'esign-application', component: EsignApplicationComponent},
      {path: 'esign-template', component: EsignTemplateComponent},
      {path: 'esign-template-p8', component: EsignTemplateP8Component},
      {path: 'esign-template-notification', component: EsignTemplateNotificationComponent},
      {path: 'esign-template-fieldmap', component: EsignTemplateFieldmapComponent},
      {path: '', redirectTo: '/esign-application', pathMatch: 'full'}]),
    AppRoutingModule,
    BlockUIModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputMaskModule, 
    InputNumberModule,
    InputTextModule,
    PasswordModule,
    RadioButtonModule,
    ReactiveFormsModule,
    TableModule,
    TreeModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
