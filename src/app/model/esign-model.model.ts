import { HttpParams } from '@angular/common/http';

export class EsignApplication {
    id : string='';
    serviceAccount : string='';
    refreshToken : string='';
}

export class EsignTemplate {
    id : string='';
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
