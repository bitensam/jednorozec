import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Box } from 'src/app/shared/boxes/box.interface';
import { BoxesService } from 'src/app/shared/boxes/boxes.service';

@Component({
  selector: 'unicorn-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxesComponent {
  public formAddNewBox: FormGroup = this.fb.group({
    name: ['', { validators: [Validators.required] }],
    value: [100, { validators: [Validators.required] }],
  });

  public boxes$: Observable<Box[]> = this.boxesService.getBoxes$();

  public displayedColumns: string[] = ['name', 'value', 'actions'];

  constructor(private fb: FormBuilder, private boxesService: BoxesService) {}

  public addNewBox() {
    if (this.formAddNewBox.invalid) return;
    this.boxesService.addNewBox(this.formAddNewBox.value);
    this.formAddNewBox.reset();
  }

  public deleteBox(id: string) {
    this.boxesService.deleteBox(id);
  }
}
