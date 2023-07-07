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

