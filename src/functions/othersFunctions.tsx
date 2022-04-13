export function roundToTwo(num: number) {
  return +(Math.round(Number(num + "e+2")) + "e-2");
}
