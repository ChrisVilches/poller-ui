export const truncateString = (text: string, amount = 40) => {
  if (text.length > amount) {
    return text.substring(0, amount) + "...";
  }

  return text;
};

export const includesAny = (text: string, patterns: string[]): boolean => {
  for (const pattern of patterns) {
    if (text.includes(pattern)) {
      return true;
    }
  }

  return false;
};
