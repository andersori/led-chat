import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msg: String = '';
  mobile : Boolean = false;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    if (window.screen.width < 940) {
      this.mobile = true;
    }
  }

  sendMessageLed(): void {
    this.chat.sendMessage(this.msg);
    this.msg = '';
  }

}
