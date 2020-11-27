type Callback = (err: any, data: any) => void;
type AnyFunc = (...args: any[]) => void;

type ArgsOf<F extends AnyFunc> = Parameters<F> extends [...args: infer I, cb?: Callback]
  ? I
  : never;

type CallbackOf<F extends AnyFunc> = Parameters<F> extends [
  ...args: infer _I,
  cb?: infer C & Callback,
]
  ? C
  : never;

type ReturnOf<F extends AnyFunc> = CallbackOf<F> extends Callback &
  ((err: any, data: infer T) => void)
  ? T
  : never;

type ErrorOf<F extends AnyFunc> = CallbackOf<F> extends Callback &
  ((err: infer E, data: any) => void)
  ? E
  : never;

export default function promisify<F extends AnyFunc>(fn: F) {
  return function (...args: ArgsOf<F>): Promise<ReturnOf<F>> {
    return new Promise((resolve, reject) => {
      fn(...args, (err: ErrorOf<F>, data: ReturnOf<F>) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  };
}
