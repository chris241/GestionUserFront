import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NbAuthService, NbAuthToken, NbAuthOAuth2Token, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService, private router: Router) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',  
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Origin,Content-Type, X-Auth-Token'
      },
    });
    return next.handle(req);
  }

  /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let { url, method, headers, body } = req;
    if (url.endsWith(environment.generate_token_uri) && method === 'POST') {
      req = req.clone({
        body: body += '&client_id=' + environment.client_id
      });
      return next.handle(req);
    } else {
      return this.authService.getToken().pipe(
        switchMap((token: NbAuthOAuth2Token) => {
          if (token.isValid()) {
            return this.handleRequest(req, next, token);
          } else {
            return this.authService.refreshToken(environment.auth_strategy_name, token).pipe(
              switchMap((result: NbAuthResult) => {
                if (result.isSuccess()) {
                  return this.authService.getToken().pipe(
                    switchMap((token: NbAuthOAuth2Token) => {
                      return this.handleRequest(req, next, token);
                    })
                  );
                } else {
                  this.router.navigate(['/auth/login']);
                }
              })
            );
          }
        }));
    }

  }
  handleRequest(req: HttpRequest<any>, next: HttpHandler, token: NbAuthOAuth2Token) {
    const JWT = `Bearer ${token.getValue()}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
    return next.handle(req);
  } */
}