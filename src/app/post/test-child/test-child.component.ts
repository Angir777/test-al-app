import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.scss']
})
export class TestChildComponent implements OnInit {

  // to co wchodzi tutaj do komponentu od rodzica, czyli od show-post
  @Input() exampleTitle: string = '';

  // to co z tąd wychodzi i idzie do rodzica
  @Output() kurier = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendToParent() {
    const message: string = 'Jakaś wiadomość od dziecka do rodzica';
    this.kurier.emit(message);
  }

}
