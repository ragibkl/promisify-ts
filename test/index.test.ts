import promisify from '../src';

describe('promisify', () => {
  describe('when called with string string function', () => {
    it('returns callable promise function', async () => {
      const sample = jest.fn((a: string, b: string, cb: (err: any, data: string) => void) => {
        const sum = a + b;
        cb(null, sum);
      });

      const sampleAsync = promisify(sample);

      await expect(sampleAsync('a', 'b')).resolves.toBe('ab');
      expect(sample.mock.calls[0][0]).toBe('a');
      expect(sample.mock.calls[0][1]).toBe('b');
    });
  });

  describe('when called with number number function', () => {
    it('returns callable promise function', async () => {
      const sample = jest.fn((a: number, b: number, cb: (err: any, data: number) => void) => {
        const sum = a + b;
        cb(null, sum);
      });

      const sampleAsync = promisify(sample);

      await expect(sampleAsync(1, 2)).resolves.toBe(3);
      expect(sample.mock.calls[0][0]).toBe(1);
      expect(sample.mock.calls[0][1]).toBe(2);
    });
  });

  describe('when called with divide function', () => {
    function divide(a: number, b: number, cb: (err: Error | null, data?: number) => void) {
      setTimeout(() => {
        try {
          if (!b) {
            throw new TypeError('Cannot divide by zero!');
          }

          cb(null, a / b);
        } catch (err) {
          cb(err);
        }
      }, 0);
    }

    const divideAsync = promisify(divide);

    describe('when 10 / 2', () => {
      it('returns 5', async () => {
        const val = await divideAsync(10, 2);
        expect(val).toEqual(5);
      });
    });

    describe('when 10 / 0', () => {
      it('rejects error', async () => {
        await expect(divideAsync(10, 0)).rejects.toThrowError(
          new TypeError('Cannot divide by zero!'),
        );
      });
    });
  });
});
