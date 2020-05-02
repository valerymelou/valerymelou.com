import { SlugifyPipe } from './slugify.pipe';

describe('SlugifyPipe', () => {
  it('create an instance', () => {
    const pipe = new SlugifyPipe();
    expect(pipe.transform('Hello World')).toBe('hello-world');
  });
});
