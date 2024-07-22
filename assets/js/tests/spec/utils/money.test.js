import { formatCurrency } from "../../../modules/utils/money.js";

describe("Test suite: formatCurrency()", () => {
  it("Should convert cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("Should work with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("Should round up the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });

   it("Should round down the nearest cent", () => {
     expect(formatCurrency(2000.4)).toEqual("20.00");
   });

   it("Should round down the nearest cent", () => {
     expect(formatCurrency(-2000.4)).toEqual("-20.00");
   });
});
