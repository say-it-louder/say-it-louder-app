import { formatDate } from "@/app/lib/utils";

describe("formatDate", () => {
  let currentDate = new Date();

  beforeEach(() => {
    currentDate = new Date();
  });

  test("should throw an error for an invalid start date", () => {
    const invalidDate = new Date("invalid date");
    expect(formatDate(invalidDate)).toBe("Invalid Date");
  });

  test("should throw an error if the start date is in the future", () => {
    const futureDate = new Date(currentDate.getTime() + 61000);
    expect(() => formatDate(futureDate)).toThrow("invalid start date");
  });

  test(`should return "just now" if the difference is less than 45 seconds`, () => {
    const pastDate = new Date(currentDate.getTime() - 43000);
    expect(formatDate(pastDate)).toBe("just now");
  });

  test('should return "few seconds ago" if the difference is less than 90 seconds', () => {
    const pastDate = new Date(currentDate.getTime() - 60000);
    expect(formatDate(pastDate)).toBe("few seconds ago");
  });

  test('should return "X minutes ago" if the difference is less than 60 minutes', () => {
    const pastDate = new Date(currentDate.getTime() - 3500000);
    expect(formatDate(pastDate)).toBe("58 minutes ago");
  });

  test('should return "one hour ago" if the difference is less than 120 minutes', () => {
    const pastDate = new Date(currentDate.getTime() - 7100000);
    expect(formatDate(pastDate)).toBe("one hour ago");
  });

  test('should return "X hours ago" if the difference is less than 24 hours', () => {
    const pastDate = new Date(currentDate.getTime() - 10800000);
    expect(formatDate(pastDate)).toBe("3 hours ago");
  });

  test('should return "yesterday" if the difference is less than 48 hours', () => {
    const pastDate = new Date(currentDate.getTime() - 86400000);
    expect(formatDate(pastDate)).toBe("yesterday");
  });

  test('should return "X days ago" if the difference is less than 30 days', () => {
    const pastDate = new Date(currentDate.getTime() - 172800000);
    expect(formatDate(pastDate)).toBe("2 days ago");
  });

  test('should return "one month ago" if the difference is less than 60 days', () => {
    const pastDate = new Date(currentDate.getTime() - 2592000000);
    expect(formatDate(pastDate)).toBe("one month ago");
  });

  test('should return "X months ago" if the difference is less than 1 year', () => {
    const pastDate = new Date(currentDate.getTime() - 15552000000);
    expect(formatDate(pastDate)).toBe("6 months ago");
  });

  test('should return "one year ago" if the difference is less than 730 days', () => {
    const pastDate = new Date(currentDate.getTime() - 31536000000);
    expect(formatDate(pastDate)).toBe("one year ago");
  });

  test("should return the formatted date if the difference is greater than or equal to 1 year", () => {
    const pastDate = new Date(currentDate.getTime() - 157680000000);
    expect(formatDate(pastDate)).toBe(pastDate.toLocaleDateString());
  });
});
