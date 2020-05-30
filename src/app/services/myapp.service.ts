import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators'
import { Myapp } from './../models/myapp'
import { Project } from '../models/project';
//import { Myappprojects } from '../models/myappprojects';
@Injectable({
  providedIn: 'root'
})
export class MyappService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/app";
  app_projects_PATH = "http://localhost:3000/app_projects";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getApps(user_id): Observable<Myapp[]> {
    return this.http
      .get<Myapp[]>(this.path + "?user_id=" + user_id)
      .pipe(
        tap(data => console.log(JSON.stringify)),
        catchError(this.handleError)
      )
  }

  getApp(app_id): Observable<Myapp> {
    return this.http
      .get<Myapp>(this.path + "?id=" + app_id)
      .pipe(
        tap(data => console.log(JSON.stringify)),
        catchError(this.handleError)
      )
  }

  /* getAppProjects(app_id): Observable<Myappprojects> {
     return this.http
       .get<Myappprojects>(this.app_projects_PATH + "?app_id=" + app_id)
       .pipe(
         tap(data => console.log(JSON.stringify)),
         catchError(this.handleError)
       )
   }*/

  createApp(myapp): Observable<Myapp> {
    return this.http
      .post<Myapp>(this.path, JSON.stringify(myapp), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createAppProjects(myapp): Observable<Myapp> {
    return this.http
      .post<Myapp>(this.app_projects_PATH, JSON.stringify(myapp), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(err: HttpErrorResponse) {
    let errMessage = "";
    if (err.error instanceof ErrorEvent) {
      errMessage = "Error" + err.error.message;
    } else {
      errMessage = "System error";
    }

    console.log(errMessage);
    return throwError(errMessage);
  }
}