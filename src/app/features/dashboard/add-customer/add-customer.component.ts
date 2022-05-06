import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/shared/user/roles.enum';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'unicorn-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent implements OnInit {
  public rolesSelect: Roles[] = [Roles.admin, Roles.customer];
  public formAddUser: FormGroup = this.fb.group({
    email: ['', { validators: [Validators.email, Validators.required] }],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(6)] },
    ],
    role: ['', { validators: [Validators.required] }],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  signUp() {
    this.authService.signUp(this.formAddUser.value);
  }
}
