import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem('token');

    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', `Bearer ${token}`);
    } else {
      url.headers.set('Authorization', `Bearer ${token}`);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        location.replace('login');
        console.error(res);
      }
      return Observable.throw(res);
    };
  }

}
