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
    expect(
      enhancer.succeed({ ...defaultItem, enhancement: 5 }).enhancement
    ).toEqual(6);
    expect(
      enhancer.succeed({ ...defaultItem, enhancement: 15 }).enhancement
    ).toEqual(16);
  });

  it("should do not change if enhancement is equal or greater than 20", () => {
    defaultItem.enhancement = 21;
    const myEnhancer = enhancer.succeed(defaultItem);

    expect(myEnhancer.enhancement).toEqual(20);
    expect(
      enhancer.succeed({ ...defaultItem, enhancement: 20 }).enhancement
    ).toEqual(20);
  });

  it("should do not change the durability", () => {
    defaultItem.enhancement = 20;
    const myEnhancer = enhancer.succeed(defaultItem);

    expect(myEnhancer.durability).toEqual(100);
  });
});

describe("When enhancement fails", () => {
  it("should decrease durability by 5 if enhancement is less than 15", () => {
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 10 }).durability
    ).toEqual(95);
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 8 }).durability
    ).toEqual(95);
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 14 }).durability
    ).toEqual(95);
  });

  it("should decrease durability by 10 if enhancement is equal or greater than 15", () => {
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 16 }).durability
    ).toEqual(90);
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 17 }).durability
    ).toEqual(90);
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 20 }).durability
    ).toEqual(90);
  });

  it("should decrease enhancement level by 1 if enhancement is greater than 16", () => {
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 17 }).enhancement
    ).toEqual(16);
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 18 }).enhancement
    ).toEqual(17);
    expect(
      enhancer.fail({ ...defaultItem, enhancement: 20 }).enhancement
    ).toEqual(19);
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
