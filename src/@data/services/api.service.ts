import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { APPkeys } from "../utils/app.constant";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private url = APPkeys.url;

  constructor(protected http: HttpClient) {}

  private formatErrors(error: any) {
    return error(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${this.url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options?: any): Observable<any> {
    return this.http
      .post(`${this.url}${path}`, body, options)
      .pipe(catchError(this.formatErrors));
  }

  getGeneral(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
}
