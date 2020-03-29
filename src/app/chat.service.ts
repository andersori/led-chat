import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';

export interface MessageLed {
  type: String,
  message: String,
  isBot: Boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messagesLed: MessageLed[] = [];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('APP_UUID') === null) {
      this.getAppUuid();
    }
  }

  public getAppUuid() {
    this.http.get<String>(environment.apiUrl + "/public/message",
      { responseType: 'text' as 'json' })
      .pipe(
        catchError((err) => of(`null`))
      ).subscribe((uuid) => {
        if(uuid !== 'null'){
          localStorage.setItem("APP_UUID", `${uuid}`);
        }
      });
  }

  public sendMessage(msg: String) {
    
    if(localStorage.getItem('APP_UUID') === null){
      this.getAppUuid();
    }

    this.messagesLed = [...this.messagesLed, { type: 'text', message: msg, isBot: false }];
    this.messagesLed = [...this.messagesLed, { type: 'load', message: '', isBot: true }];
    this.http.post(environment.apiUrl + `/public/message?appUuid=${localStorage.getItem('APP_UUID')}`, msg)
    .pipe(
      timeout(18000)
    )  
    .subscribe((res: Response) => {
        var mes: MessageLed[] = [];
        for (let i in res) {
          mes.push({
            type: res[i].response_type,
            message: res[i].text || res[i].source,
            isBot: true
          });
        }
        this.messagesLed.splice(this.messagesLed.length - 1, 1);
        this.messagesLed = [...this.messagesLed, ...mes];
      },
      error => {
        this.messagesLed.splice(this.messagesLed.length - 1, 1);
        this.messagesLed = [...this.messagesLed, { type: 'warn', message: '', isBot: true }];
      });
  }

  public getMessages() {
    return this.messagesLed;
  }
}
