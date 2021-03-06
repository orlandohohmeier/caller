import AsynchronousCaller from "../AsynchronousCaller";
import ImmediateCaller from "../ImmediateCaller";
import SynchronousCaller from "../SynchronousCaller";

describe("AsynchronousCaller", () => {
  const caller = new AsynchronousCaller();

  it("calls the provided callable", async () => {
    const callable = jest.fn();
    await caller.call(null, callable);
    expect(callable).toHaveBeenCalled();
  });

  it("passes arguments to the provided callable", async () => {
    const callable = jest.fn();
    await caller.call(null, callable, 1, 2, 3);
    expect(callable).toHaveBeenCalledWith(1, 2, 3);
  });

  it("sets the `this` context to the provided value", async () => {
    const context = { foo: "bar" };
    await caller.call(context, function(this: { foo: string }) {
      expect(this).toBe(context);
    });
  });

  it("asynchronously calls the callable", async () => {
    const callable = jest.fn();

    await Promise.all([
      new Promise(resolve => setTimeout(resolve)).then(() => callable("d")),
      caller.call(null, callable, "c"),
      new ImmediateCaller().call(null, callable, "b"),
      new SynchronousCaller().call(null, callable, "a")
    ]);

    expect(callable).toHaveBeenNthCalledWith(1, "a");
    expect(callable).toHaveBeenNthCalledWith(2, "b");
    expect(callable).toHaveBeenNthCalledWith(3, "c");
    expect(callable).toHaveBeenNthCalledWith(4, "d");
  });
});
