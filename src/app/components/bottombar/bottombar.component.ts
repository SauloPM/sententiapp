import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss'],
})
export class BottombarComponent {

  @Input() color: string = 'dorado';

  constructor() { }

}
