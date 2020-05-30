import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap,retry, catchError } from 'rxjs/operators'
import { Project } from './../models/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  isCreate = false;

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/projects";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getProject(user_id): Observable<Project[]> {
    return this.http
    .get<Project[]>(this.path + "?user_id="+ user_id) 
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }

  createProject(project): Observable<Project>{
    return this.http
    .post<Project>(this.path, JSON.stringify(project), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  created(){
      this.isCreate = true;
      localStorage.setItem("isCreated", "true");
  }

  isCreated() {
    return this.created;
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
