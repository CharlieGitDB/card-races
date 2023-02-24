import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IntroFacade } from '../../facades/intro.facade';
import { SHOW_OPTIONS } from './animations/show-options.animation';

@Component({
  selector: 'app-options',
  animations: [SHOW_OPTIONS],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent {
  private introFacade = inject(IntroFacade);

  public selectedSuit$ = this.introFacade.suit$;
}
