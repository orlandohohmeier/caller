import Callable from "./Callable";
import Caller from "./Caller";

export default class ImmediateCaller implements Caller {
  public call(thisArg: any, callable: Callable, ...args: any[]): Promise<any> {
    return Promise.resolve().then(() => callable.call(thisArg, ...args));
  }
}
