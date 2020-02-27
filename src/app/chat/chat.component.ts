import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msg: String = '';

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  sendMessageLed(): void {
    this.chat.sendMessage(this.msg);
    this.msg = '';
  }

}
