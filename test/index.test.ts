import promisify from '../src';

describe('promisify', () => {
  describe('when called with string string function', () => {
    it('returns callable promise function', async () => {
      const sample = jest.fn(
        (a: string, b: string, cb: (err: any, data: string) => void) => {
          const sum = a + b;
          cb(null, sum);
        },
      );

      const sampleAsync = promisify(sample);

      await expect(sampleAsync('a', 'b')).resolves.toBe('ab');
      expect(sample.mock.calls[0][0]).toBe('a');
      expect(sample.mock.calls[0][1]).toBe('b');
    });
  });

  describe('when called with number number function', () => {
    it('returns callable promise function', async () => {
      const sample = jest.fn(
        (a: number, b: number, cb: (err: any, data: number) => void) => {
          const sum = a + b;
          cb(null, sum);
        },
      );

      const sampleAsync = promisify(sample);

      await expect(sampleAsync(1, 2)).resolves.toBe(3);
      expect(sample.mock.calls[0][0]).toBe(1);
      expect(sample.mock.calls[0][1]).toBe(2);
    });
  });
});
