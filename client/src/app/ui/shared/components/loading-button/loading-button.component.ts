import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoadingData } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonComponent {
  private store: Store<AppState> = inject(Store);

  @Input()
  public disabled = false;

  @Input()
  public color: 'primary' | 'secondary' = 'primary';

  @Output()
  public clicked = new EventEmitter<void>();

  public loading$ = this.store.select(selectLoadingData);
}
