import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SetupFacade } from 'src/app/ui/setup/facades/setup.facade';
import { SHOW_OPTIONS } from './animations/show-options.animation';

@Component({
  selector: 'app-options',
  animations: [SHOW_OPTIONS],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent {
  private setupFacade = inject(SetupFacade);

  public selectedSuit$ = this.setupFacade.suit$;
}
