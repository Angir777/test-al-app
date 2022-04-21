import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../shared/services/event-manager/event-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private eventManager: EventManagerService
  ) { }

  ngOnInit(): void {
    /**
     * E2. Tutaj prowadzony jest nasłuch i gdy z header wyjdzie wiadomość tutaj
     * w stopce zostanie ona odebrana
     */
    this.eventManager.subscribeEvent('ON_NAVBAR_EVENT', (res: any) => {
      console.log('ON_NAVBAR_EVENT', res)
    });
  }

  /**
   * E1. Po kliknięciu przycisku w stopce zostaje wysłany event do serwisu
   * skąd dalej zostanie przechwycone przez odbiorcę.
   */
  emmitEventToEventManager() {
    this.eventManager.broadcastEvent({
      name: 'ON_FOOTER_EVENT',
      content: {
        id: 1,
        title: 'Wiadomość ze stopki'
      }
    })
  }

}
