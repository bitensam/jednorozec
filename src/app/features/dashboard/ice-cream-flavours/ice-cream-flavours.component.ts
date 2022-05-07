import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'unicorn-ice-cream-flavours',
  templateUrl: './ice-cream-flavours.component.html',
  styleUrls: ['./ice-cream-flavours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamFlavoursComponent {
  public formAddNewFlavour: FormGroup = this.fb.group({
    flavour: ['', { validators: [Validators.required] }],
  });

  constructor(private fb: FormBuilder) {}

  public addNewFlavour() {}
}
