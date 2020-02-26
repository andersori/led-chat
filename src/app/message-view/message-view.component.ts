import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.itemElements.changes.subscribe(_ => {
      this.onItemElementsChanged()
    });
  }

  @ViewChild('scrollMe', { static: false }) viewPort: CdkVirtualScrollViewport;
  @ViewChildren('item') itemElements: QueryList<any>;

  constructor(private chat: ChatService) { }

  ngOnInit() {

  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  public scrollToBottom(): void {
    this.viewPort.scrollToIndex(this.chat.messagesLed.length, 'smooth')
  }

}
