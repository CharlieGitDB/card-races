import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonComponent {
  @Input()
  public loading = false;

  @Input()
  public disabled = false;

  @Input()
  public color: 'primary' | 'secondary' = 'primary';

  @Output()
  public clicked = new EventEmitter<void>();
}
