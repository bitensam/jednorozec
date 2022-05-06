import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'unicorn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  emailControl = new FormControl('');
  passwordControl = new FormControl('');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    const email: string = this.emailControl.value;
    const password: string = this.passwordControl.value;
    this.authService.login({ email, password });
  }
}
