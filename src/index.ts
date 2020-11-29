type Fn = (...args: any[]) => void;
type Cb = (err: any, data?: any) => void;

type Args<F extends Fn> = Parameters<F> extends [...args: infer I, cb?: Cb] ? I : never;
type Callback<F extends Fn> = Parameters<F> extends [...args: infer _I, cb?: infer C] ? C : never;

type Data<F extends Cb> = F extends (err: any, data?: infer T) => void ? T : never;
type Err<F extends Cb> = F extends (err: infer E, data?: any) => void ? E | null : never;

type Return<F extends Fn> = Callback<F> extends Cb ? Data<Callback<F>> : never;
type Reject<F extends Fn> = Callback<F> extends Cb ? Err<Callback<F>> : never;

export default function promisify<F extends Fn>(fn: F) {
  return function (...args: Args<F>): Promise<Return<F>> {
    return new Promise((resolve, reject) => {
      fn(...args, (err: Reject<F>, data: Return<F>) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  };
}
