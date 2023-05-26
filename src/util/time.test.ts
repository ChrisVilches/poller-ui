import { formatMinutes } from "./time";

test(`${formatMinutes.name}`, () => {
  expect(formatMinutes(1)).toBe("1 minute");
  expect(formatMinutes(3)).toBe("3 minutes");
  expect(formatMinutes(59)).toBe("59 minutes");
  expect(formatMinutes(60)).toBe("1 hour");
  expect(formatMinutes(61)).toBe("1 hour, 1 minute");
  expect(formatMinutes(62)).toBe("1 hour, 2 minutes");
  expect(formatMinutes(119)).toBe("1 hour, 59 minutes");
  expect(formatMinutes(120)).toBe("2 hours");
  expect(formatMinutes(121)).toBe("2 hours, 1 minute");
  expect(formatMinutes(122)).toBe("2 hours, 2 minutes");
});

test(`${formatMinutes.name} with errors`, () => {
  expect(() => formatMinutes(0)).toThrow("Value must be positive");
  expect(() => formatMinutes(-20)).toThrow("Value must be positive");
  expect(() => formatMinutes(0.2)).toThrow("Value must be an integer");
  expect(() => formatMinutes(4576.5)).toThrow("Value must be an integer");
});
