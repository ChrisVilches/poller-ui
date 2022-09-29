export const truncateString = (text: string, amount = 40) => {
  if (text.length > amount) {
    return text.substring(0, amount) + "...";
  }

  return text;
};
