import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IceCreamFlavour } from 'src/app/shared/ice-cream-flavours/ice-cream-flavour.interface';
import { IceCreamFlavoursService } from 'src/app/shared/ice-cream-flavours/ice-cream-flavours.service';

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

  public displayedColumns: string[] = ['name', 'action'];

  constructor(
    private fb: FormBuilder,
    private iceCreamFlavoursService: IceCreamFlavoursService
  ) {}

  public iceCreamFlavours$: Observable<IceCreamFlavour[]> =
    this.iceCreamFlavoursService.getIceCreamFlavours$();

  public addNewFlavour() {
    if (this.formAddNewFlavour.invalid) return;
    this.iceCreamFlavoursService.addNewFlavour(this.formAddNewFlavour.value);
    this.formAddNewFlavour.reset();
  }

  public deleteFlavour(id: string) {
    this.iceCreamFlavoursService.deleteFlavour(id);
  }
}
