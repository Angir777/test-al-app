import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { EventManagerService } from '../shared/services/event-manager/event-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  test: any = {};

  loggedIn:boolean = false;

  constructor(
    private eventManager: EventManagerService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    // sprawdza czy user jest zalogowany i zwraca true / false, inne podejście bo mam jeszcze jedno w tym projekcie z AuthGuardService
    // to dobre jak podstrona ma być dostępna, ale jakaś funkcjonalność ma być zablokowana
    this.authService.status().subscribe((res)=>{
      console.log(res);
      this.loggedIn = res;
    });

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
