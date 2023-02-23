import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom, take } from 'rxjs';
import { IntroFacade } from '../../facades/intro.facade';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  private introFacade = inject(IntroFacade);

  public suit$ = this.introFacade.suit$;

  public joinForm = new FormGroup({
    groupId: new FormControl<string | null>(null),
  });

  public loading = false;

  public async submit(): Promise<void> {
    const suit = await lastValueFrom(this.suit$.pipe(take(1)));
    const group = this.joinForm.controls.groupId.value;

    if (!suit || !group || !this.joinForm.valid) {
      return;
    }

    this.loading = true;

    this.introFacade.joinGame(group, suit);
  }
}
