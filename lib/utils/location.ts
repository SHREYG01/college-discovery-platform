export type ParsedLocation = {
  city: string;
  state: string;
  full: string;
};

export function parseLocation(location: string): ParsedLocation {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 3) {
    return {
      city: parts[parts.length - 2],
      state: parts[parts.length - 1],
      full: location,
    };
  }

  if (parts.length === 2) {
    return {
      city: parts[0],
      state: parts[1],
      full: location,
    };
  }

  return {
    city: parts[0] ?? location,
    state: "",
    full: location,
  };
}
