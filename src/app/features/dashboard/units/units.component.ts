import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'unicorn-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
