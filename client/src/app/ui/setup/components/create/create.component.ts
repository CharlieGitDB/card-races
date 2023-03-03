import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, take } from 'rxjs';
import { SetupFacade } from '../../facades/setup.facade';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  private setupFacade = inject(SetupFacade);

  public suit$ = this.setupFacade.suit$;

  public createForm = new FormGroup({
    nickname: new FormControl<string | null>(null, [
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.required,
    ]),
  });

  public loading = false;

  public async submit() {
    const suit = await lastValueFrom(this.setupFacade.suit$.pipe(take(1)));
    const nickname = this.createForm.controls.nickname.value;

    if (!nickname || suit === null || this.loading || !this.createForm.valid) {
      return;
    }

    this.loading = true;
    this.setupFacade.createGame(suit, nickname);
  }
}
