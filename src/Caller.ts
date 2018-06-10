import Callable from "./Callable";

export default interface Caller extends Callable {
  call(thisArg: any, callable: Callable, ...args: any[]): Promise<any>;
}
