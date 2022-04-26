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
  ) {
    // Jeśli odświerzę stronę to mi nie zniknie w menu link 'Nowy post'
    this.loggedIn = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    // Sprawdza czy user jest zalogowany (czy w localStorage istnieje 'user_info') poprzez event
    this.eventManager.subscribeEvent('ON_AUTH_CHANGED', (res: any) => {
      this.loggedIn = res.content.isLogin;
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

  // Sprawdza czy user jest zalogowany (czy w localStorage istnieje 'user_info') poprzez funkcję
  // isAuth(): boolean{
  //   return this.authService.isAuthenticated;
  // }

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
