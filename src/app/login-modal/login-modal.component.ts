import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass'],
})
export class LoginModalComponent implements OnInit {
  @Input() active = false;
  @Output() closed = new EventEmitter();
  @Output() submitted = new EventEmitter<{
    username: string;
    password: string;
  }>();

  constructor() {}

  ngOnInit() {}

  public close() {
    this.active = false;
    this.closed.emit();
  }

  public login(username: string, password: string) {
    this.submitted.emit({ username, password });
  }
}
