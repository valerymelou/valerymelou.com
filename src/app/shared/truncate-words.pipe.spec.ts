import { TruncateWordsPipe } from './truncate-words.pipe';

describe('TruncateWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
