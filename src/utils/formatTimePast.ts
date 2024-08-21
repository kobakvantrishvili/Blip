import { formatDistanceToNow, fromUnixTime } from "date-fns";

export const formatTimePast = (timestamp: string) => {
  const now = Date.now();
  const past = fromUnixTime(Number(timestamp)).getTime();
  const difference = now - past; // Difference in milliseconds

  if (difference < 0) return "—";

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

  let unit;
  let value;

  if (years > 0) {
    unit = "y";
    value = years;
  } else if (months > 0) {
    unit = "mo";
    value = months;
  } else if (days > 0) {
    unit = "d";
    value = days;
  } else if (hours > 0) {
    unit = "h";
    value = hours;
  } else if (minutes > 0) {
    unit = "m";
    value = minutes;
  } else {
    unit = "s";
    value = Math.floor(difference / 1000);
  }

  return `${value}${unit}`;
};
