const enhancer = require("./enhancer.js");

let defaultItem = {
  name: "default",
  enhancement: 0,
  durability: 0,
};

beforeEach(() => {
  defaultItem = enhancer.repair(defaultItem);
});

// test away!
describe("Repair enhancer", () => {
  it("should returns a new item with the durability restored to 100", () => {
    const myEnhancer = enhancer.repair(defaultItem);

    expect(myEnhancer.durability).toEqual(100);
  });
});

describe("When enhancement succeeds", () => {
  it("should increase increase by 1 if enhancement level is less than 20", () => {
    const myEnhancer = enhancer.succeed(defaultItem);

    expect(myEnhancer.enhancement).toEqual(1);
  });

  it("should do not change if enhancement is equal or greater than 20", () => {
    defaultItem.enhancement = 21;
    const myEnhancer = enhancer.succeed(defaultItem);

    expect(myEnhancer.enhancement).toEqual(20);
  });

  it("should do not change the durability", () => {
    defaultItem.enhancement = 20;
    const myEnhancer = enhancer.succeed(defaultItem);

    expect(myEnhancer.durability).toEqual(100);
  });
});

describe("When enhancement fails", () => {
  it("should decrease durability by 5 if enhancement is less than 15", () => {
    defaultItem.enhancement = 10;
    const expectedResult = defaultItem.durability - 5;

    const myEnhancer = enhancer.fail(defaultItem);

    expect(myEnhancer.durability).toEqual(expectedResult);
  });

  it("should decrease durability by 10 if enhancement is equal or greater than 15", () => {
    defaultItem.enhancement = 16;
    const expectedResult = defaultItem.durability - 10;

    const myEnhancer = enhancer.fail(defaultItem);

    expect(myEnhancer.durability).toEqual(expectedResult);
  });

  it("should decrease enhancement level by 1 if enhancement is greater than 16", () => {
    defaultItem.enhancement = 20;
    const expectedResult = defaultItem.enhancement - 1;
    const myEnhancer = enhancer.fail(defaultItem);

    expect(myEnhancer.enhancement).toEqual(expectedResult);
  });
});

describe("When modified name property", () => {
  it("should do not change if the enhancement level is 0", () => {
    const myEnhancer = enhancer.get(defaultItem);

    expect(myEnhancer.name).toEqual(defaultItem.name);
  });

  it("should be prefixed by the enhancement level preceded by a plus sign, between brackets. if enhancement level is greater than 0", () => {
    defaultItem.enhancement = 5;
    const expectedResult = `[+${defaultItem.enhancement}] ${defaultItem.name}`;
    const myEnhancer = enhancer.get(defaultItem);

    expect(myEnhancer.name).toEqual(expectedResult);
  });
});
