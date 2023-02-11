import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
  @Input()
  public disabled = true;

  @Output()
  public startGame = new EventEmitter<void>();
}
