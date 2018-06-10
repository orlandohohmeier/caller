import SynchronousCaller from "../SynchronousCaller";

describe("SynchronousCaller", () => {
  const caller = new SynchronousCaller();

  it("calls the provided callable", () => {
    const callable = jest.fn();
    caller.call(null, callable);
    expect(callable).toHaveBeenCalled();
  });

  it("passes arguments to the provided callable", () => {
    const callable = jest.fn();
    caller.call(null, callable, 1, 2, 3);
    expect(callable).toHaveBeenCalledWith(1, 2, 3);
  });

  it("sets the `this` context to the provided value", () => {
    const context = { foo: "bar" };
    caller.call(context, function(this: { foo: string }) {
      expect(this).toBe(context);
    });
  });

  it("synchronously calls the callables", async () => {
    const callable = jest.fn();

    caller.call(null, callable, "a");
    callable.call(null, "b");

    expect(callable).toHaveBeenNthCalledWith(1, "a");
    expect(callable).toHaveBeenNthCalledWith(2, "b");
  });
});
