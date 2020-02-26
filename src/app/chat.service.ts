import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

export interface MessageLed {
  type: String,
  message: String,
  isBot: Boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public appUuid: String;
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
        catchError((err) => of(`Error=${err}`))
      ).subscribe((uuid) => {
        localStorage.setItem("APP_UUID", `${uuid}`);
      });
  }

  public sendMessage(msg: String) {
    this.messagesLed = [...this.messagesLed, { type: 'text', message: msg, isBot: false }];
    return this.http.post(environment.apiUrl + `/public/message?appUuid=${localStorage.getItem('APP_UUID')}`, msg)
      .pipe(
        catchError((err) => of(`Error=${err}`))
      )
      .pipe(map((res: Response) => {
        var mes: MessageLed[] = [];
        for (let i in res) {
          mes.push({
            type: res[i].response_type,
            message: res[i].text || res[i].source,
            isBot: true
          });
        }
        return mes;
      })).subscribe((messages: MessageLed[]) => {
        console.log(messages);
        this.messagesLed = [...this.messagesLed, ...messages];
      });
  }

  public getMessages(){
    return this.messagesLed;
  }
}
