import { TruncateWordsPipe } from './truncate-words.pipe';

describe('TruncateWordsPipe', () => {
  it('should properly truncate strings', () => {
    const pipe = new TruncateWordsPipe();
    const message1 = 'I am John Doe';
    const message2 = 'We are John and Jane Doe.';

    expect(pipe.transform(message1, 5)).toBe('I am John Doe');
    expect(pipe.transform(message2, 5)).toBe('We are John and Jane...');
  });

  it('should throw error if called without arguments', () => {
    const pipe = new TruncateWordsPipe();

    expect(() => pipe.transform('Hello')).toThrow(new Error('Please provide the number of words to truncate to'));
  });
});
