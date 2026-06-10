import { getPageNumbers } from "../pagination";

describe("getPageNumbers", () => {
  describe("when totalPages <= 7", () => {
    it("returns all page numbers", () => {
      expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getPageNumbers(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe("when currentPage <= 4", () => {
    it("returns first 5 pages, ellipsis, and last page", () => {
      expect(getPageNumbers(1, 17)).toEqual([1, 2, 3, 4, 5, "...", 17]);
      expect(getPageNumbers(4, 17)).toEqual([1, 2, 3, 4, 5, "...", 17]);
    });
  });

  describe("when currentPage is near the end", () => {
    it("returns first page, ellipsis, and last 5 pages", () => {
      expect(getPageNumbers(17, 17)).toEqual([1, "...", 13, 14, 15, 16, 17]);
      expect(getPageNumbers(14, 17)).toEqual([1, "...", 13, 14, 15, 16, 17]);
    });
  });

  describe("when currentPage is in the middle", () => {
    it("returns first, ellipsis, surrounding pages, ellipsis, last", () => {
      expect(getPageNumbers(9, 17)).toEqual([1, "...", 8, 9, 10, "...", 17]);
      expect(getPageNumbers(5, 17)).toEqual([1, "...", 4, 5, 6, "...", 17]);
    });
  });
});
