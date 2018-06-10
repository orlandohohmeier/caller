# ☎️ Caller

---

👩‍🔬 Please be aware that this package is still experimental,
changes to the interface and underlying implementation are likely,
and future development or maintenance is not guaranteed.

---

This package provides different interchangeable `function` (`Callable`) call
strategies to manage _call_ execution.
The different strategies can be used to switch from synchronous to asynchronous
executions and back for optimal performance.

![Homer Simpson yelling "WHOO-HOO!" on the phone](https://media.giphy.com/media/xT5LMQ8rHYTDGFG07e/giphy.gif)

## Example

```js
import {
  AsynchronousCaller,
  ImmediateCaller,
  SynchronousCaller
} from "@orlandohohmeier/caller";

function print(msg)
  console.log(msg);
}

Promise.all([
  new AsynchronousCaller().call(null, print, "c"),
  new ImmediateCaller().call(null, print, "b"),
  new SynchronousCaller().call(null, print, "a")
]).then(() => print("done"));
```

/codesandbox: https://codesandbox.io/s/ryy86omk94?module=%2Fsrc%2Findex.js

## Asynchronous Caller

This caller uses `setTimeout` (Tasks) to defer calls until the stack is empty.
The asynchronous strategy is useful when the calls take potentially longer
as it allows the browser to render updates in between.

## Immediate Caller

The immediate caller uses `Promise.resolve()` (MicroTasks) to postpone calls
until the current task is done but before the next task is running.
The caller makes the respective calls async without the penalty of a new task.

Please note that as the calls are scheduled to run before the next task,
the browser may not be able to render update between calls.

## Synchronous Caller

This caller synchronously calls the provided `Callable` (e.g. `function`).
