export default interface Callable {
  call(thisArg: any, ...args: any[]): any;
}
