import Callable from "./Callable";
import Caller from "./Caller";

export default class SynchronousCaller implements Caller {
  public call(thisArg: any, callable: Callable, ...args: any[]): Promise<any> {
    return new Promise(resolve => resolve(callable.call(thisArg, ...args)));
  }
}
