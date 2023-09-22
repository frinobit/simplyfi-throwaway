class Stack {
  constructor() {
    this.top = -1;
    this.items = {};
  }
}

describe("My Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it("is created empty", () => {
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });

  it.todo("can push to the top");

  it.todo("can pop off");
});
