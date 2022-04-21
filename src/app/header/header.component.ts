import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../shared/services/event-manager/event-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  test: any = {};

  constructor(
    private eventManager: EventManagerService
  ) { }

  ngOnInit(): void {
    /**
     * E1. Tutaj prowadzony jest nasłuch i gdy ze stopki wyjdzie wiadomość tutaj
     * w header zostanie ona odebrana
     */
    this.eventManager.subscribeEvent('ON_FOOTER_EVENT', (res: any) => {
      console.log('ON_FOOTER_EVENT', res);
      this.test = res.content;
    });

    /**
     * E2. Tutaj wysyłany jest nowy event, który zostanie odebrany w stopce
     */
    setTimeout(() => {
      this.emmitEventToEventManager();
    }, 5000);
  }

  emmitEventToEventManager() {
    this.eventManager.broadcastEvent({
      name: 'ON_NAVBAR_EVENT',
      content: {
        id: 2,
        title: 'Wiadomość do stopki'
      }
    })
  }

}
