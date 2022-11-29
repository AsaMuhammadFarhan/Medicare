export function getRouterQuery(input: any) {
  if (typeof input === "string") return parseInt(input);
  return -1;
};

export function getRouterQueryAsString(input: any) {
  if (typeof input === "string") return input;
  return "";
};