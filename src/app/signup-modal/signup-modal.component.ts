import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.sass'],
})
export class SignupModalComponent implements OnInit {
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

  public signup(username: string, password: string, confirmation: string) {
    if (password !== confirmation) {
      throw new Error('Passwords do not match');
    }

    this.submitted.emit({ username, password });
  }
}
