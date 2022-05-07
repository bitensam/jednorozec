import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/shared/user/roles.enum';
import { User } from 'src/app/shared/user/user.interface';

import { CustomersService } from './customers.service';

@Component({
  selector: 'unicorn-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent {
  public rolesSelect: Roles[] = [Roles.admin, Roles.customer];
  public formAddUser: FormGroup = this.fb.group({
    email: ['', { validators: [Validators.email, Validators.required] }],
    password: [
      '',
      { validators: [Validators.required, Validators.minLength(6)] },
    ],
    role: ['', { validators: [Validators.required] }],
  });

  public customers$: Observable<User[]> = this.customersService.getCustomers$();

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService
  ) {}

  signUp() {
    this.customersService.addCustomer(this.formAddUser.value);
  }
}
