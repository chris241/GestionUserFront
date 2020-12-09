import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get<T>(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<HttpResponse<T> | Observable<never>> {
   
    return this.http.get<T>(`${environment.api_host}${path}`, { observe: 'response', params, headers })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_host}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  // post<T>(path: string, body: Object = {}): Observable<HttpResponse<T> | Observable<never>> {

  //   console.log("test :",`${environment.api_host}${path}`);
  //   return this.http.post<T>(`${environment.api_host}${path}`, JSON.stringify(body), { observe: 'response' })
  //     .pipe(catchError(this.formatErrors));
  // }
  post(path: string, body: Object = {}): Observable<any> {
    
    console.log(`${environment.api_host}${path}`);
    return this.http.post(
      `${environment.api_host}${path}`,
      JSON.stringify(body), { observe: 'response'  }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_host}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}