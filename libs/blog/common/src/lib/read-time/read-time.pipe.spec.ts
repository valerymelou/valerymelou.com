import { ReadTimePipe } from './read-time.pipe';

describe('ReadTimePipe', () => {
  it('computes the read time of a string', () => {
    const pipe = new ReadTimePipe();
    expect(pipe.transform('Hello world')).toEqual(1);
  });
});
