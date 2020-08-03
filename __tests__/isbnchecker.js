import { isbnformatchecker } from "../utils/isbnchecker";

describe("utils/isbnchecker", () => {
  describe("isbnformatchecker", () => {
    it("return false if the isbn is not 10 to 13 digits", () => {
      expect(isbnformatchecker("987654321")).toBe(false);
    });

    it("return true if the ISBN is 10 digits input without X follows the ISBN-10 format", () => {
      expect(isbnformatchecker("0596009208")).toBe(true);
    });

    it("return true if the ISBN is 10 digits input with X follows the ISBN-10 format", () => {
      expect(isbnformatchecker("043942089x")).toBe(true);
    });

    it("return false if the ISBN input is 10 digits but does not follow the ISBN-10 format", () => {
      expect(isbnformatchecker("0596009209")).toBe(false);
    });

    it("return true if the ISBN is 13 digits input follows the ISBN-13 format", () => {
      expect(isbnformatchecker("9783161484100")).toBe(true);
    });

    it("return false if the ISBN input is 13 digits but does not follow the ISBN-13 format", () => {
      expect(isbnformatchecker("9783161484101")).toBe(false);
    });

    it("return true if the ISBN with correct format is with hyphens", () => {
      expect(isbnformatchecker("978-3-16-148410-0")).toBe(true);
    });
  });
});
