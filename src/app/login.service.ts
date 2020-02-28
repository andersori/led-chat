import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    public logar(password: String, username: String): Observable<Object> {
        return this.http.post(environment.apiUrl + '/public/login', {
            "username": username,
            "password": password
        }, {observe: "response" as 'body',
        responseType: "json"});
    }

}
