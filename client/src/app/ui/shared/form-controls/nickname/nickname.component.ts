import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NicknameComponent),
    },
  ],
})
export class NicknameComponent implements ControlValueAccessor {
  public nickname = new FormControl<string | null>(null, [
    Validators.minLength(3),
    Validators.maxLength(3),
  ]);

  private _onChange = (value: string | null) => null;

  private _onTouched = () => null;

  constructor() {
    this.nickname.valueChanges.subscribe((value) => {
      this._onChange(value);
      this._onTouched();
    });
  }

  writeValue(nickname: string): void {
    this.nickname.setValue(nickname);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
