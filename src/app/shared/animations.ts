import { group, trigger, transition, style, query, animateChild, animate } from '@angular/animations';

const animation = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '-100%'})
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%'}))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%'}))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage => *', animation),
    transition('AboutPage => *', animation),
    transition('ContactPage => *', animation),
    transition('BlogPage => *', animation),
  ]);
