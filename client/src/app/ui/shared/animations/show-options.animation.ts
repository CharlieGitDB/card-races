import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SHOW_OPTIONS = trigger('showOptions', [
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
      transform: 'translateX(-200%)',
    })
  ),
  transition('hide => show', [
    animate(
      '300ms ease-in',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
  ]),
]);
