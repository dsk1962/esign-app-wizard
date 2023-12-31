import { HttpParams } from '@angular/common/http';

export class EsignApplication {
    id: string = '';
    applicationName: string = '';
    serviceAccount: string = '';
    refreshToken: string = '';
}

export class EsignTemplate {
    id: string = '';
    applicationId: string = '';
    templateName: string = '';
    p8Archive: string = '';
    p8DocumentClass: string = '';
    notificationRequired: string = 'N';
    notificationEndpoint: string = '';
}

export class Option {
    id: string = '';
    name: string = '';
}

export class EsignTemplateFieldMap {
    templateId :string = '';
	templateField: string = '';
	applicationField: string = '';
	p8Property: string = '';
	p8DefaultValue: string = '';
    fieldIndex: number = 0;
}

export class EsignTemplateParticipantdMap {
    templateId :string = '';
	templateParticipant: string = '';
	applicationParticipant: string = '';
	order: number = 1;
	role: string = '';
    fieldIndex: number = 0;
}


export class ActionRequest {
    action?: string;
    parameters: HttpParams = new HttpParams();
    addParameters(obj: any): void {
        if (obj)
            for (var key in obj) {
                this.parameters = this.parameters.append(key, obj[key]);
            }
    }
}

