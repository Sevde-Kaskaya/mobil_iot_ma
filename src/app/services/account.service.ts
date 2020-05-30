import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap,retry, catchError } from 'rxjs/operators'
import { User } from './../models/user'
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedIn = false;

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/users";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUser(user): Observable<User[]> {
    return this.http
    .get<User[]>(this.path + "?name="+user.name+"&password="+user.password)
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }

  createUser(user): Observable<User>{
    return this.http
    .post<User>(this.path, JSON.stringify(user), this.httpOptions)
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

  logIn(){
      this.loggedIn = true;
      localStorage.setItem("isLogged", "true");
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logOut() {
    localStorage.removeItem("isLogged");
    this.loggedIn = false;
  }
}
