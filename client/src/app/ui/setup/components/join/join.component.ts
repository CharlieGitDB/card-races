import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, take } from 'rxjs';
import { SetupFacade } from '../../facades/setup.facade';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SetupFacade], //do not use singleton here for the route
})
export class JoinComponent implements OnInit {
  private setupFacade = inject(SetupFacade);

  public suit$ = this.setupFacade.suit$;

  public joinForm = new FormGroup({
    nickname: new FormControl<string | null>(null, [
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.required,
    ]),
    groupId: new FormControl<string | null>(null, [
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.required,
    ]),
  });

  public loading = false;

  public ngOnInit(): void {
    this.setupFacade.groupId$.subscribe((groupId) =>
      this.joinForm.patchValue({
        groupId: groupId ?? null,
      })
    );
  }

  public async submit(): Promise<void> {
    const suit = await lastValueFrom(this.suit$.pipe(take(1)));
    const group = this.joinForm.controls.groupId.value;
    const nickname = this.joinForm.controls.nickname.value;

    if (!suit || !nickname || !group || !this.joinForm.valid || this.loading) {
      return;
    }

    this.loading = true;

    this.setupFacade.joinGame(group, suit, nickname);
  }
}
