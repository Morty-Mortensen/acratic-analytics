import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.css']
})
export class LoginNavComponent implements OnInit {

  @Input() fontSize = '';

  constructor() { }

  ngOnInit(): void {
  }

}
