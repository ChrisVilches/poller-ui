const pluralize = ({ value, label }) => ({ label: value === 1 ? label : `${label}s`, value });

export const formatMinutes = (minutes: number) => {
  if (Math.round(minutes) !== minutes) {
    throw new Error("Value must be an integer");
  }

  if (minutes < 1) {
    throw new Error("Value must be positive");
  }

  return [
    {
      label: "hour",
      value: Math.floor(minutes / 60)
    },
    {
      label: "minute",
      value: minutes % 60
    }
  ].map(pluralize)
    .filter(({ value }) => value !== 0)
    .map(({ label, value }) => `${value} ${label}`)
    .join(", ");
};
