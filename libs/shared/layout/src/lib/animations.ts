import {
  group,
  trigger,
  transition,
  style,
  query,
  animateChild,
  animate,
  AnimationMetadata,
} from '@angular/animations';

function isMobile() {
  if (typeof window === 'undefined') return false;
  return matchMedia('(max-width: 768px)').matches;
}

const pages = ['HomePage', 'AboutPage', 'ProjectsPage', 'BlogHomePage'];
const transissions: AnimationMetadata[] = [];

const enterStyleOne = isMobile()
  ? { top: '100%' }
  : ({ left: '100%' } as { top: string; left: string });
const enterStyleTwo = isMobile()
  ? { top: '-100%' }
  : ({ left: '-100%' } as { top: string; left: string });

pages.forEach((page) => {
  transissions.push(
    transition(`${page} => *`, [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
          }),
        ],
        { optional: true },
      ),
      query(':enter', [style(enterStyleOne)], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [animate('300ms ease-out', style(enterStyleTwo))], {
          optional: true,
        }),
        query(
          ':enter',
          [animate('300ms ease-in', style({ left: '0%', top: '0%' }))],
          {
            optional: true,
          },
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),
    transition(`* => ${page}`, [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
          }),
        ],
        { optional: true },
      ),
      query(':enter', [style(enterStyleTwo)], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [animate('300ms ease-out', style(enterStyleOne))], {
          optional: true,
        }),
        query(
          ':enter',
          [animate('300ms ease-in', style({ left: '0%', top: '0%' }))],
          {
            optional: true,
          },
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),
  );
});

export const slideInAnimation = trigger('routeAnimations', transissions);
