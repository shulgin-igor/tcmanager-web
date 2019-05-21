import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let config: any = {
            url: `${environment.apiURL}${req.url}`
        };

        if (localStorage.getItem('APIKEY')) {
            config.setHeaders = {
                APIKEY: localStorage.getItem('APIKEY')
            };
        }

        return next.handle(req.clone(config));
    }
}