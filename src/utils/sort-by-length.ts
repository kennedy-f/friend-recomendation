export function sortByLength(arr: Array<string[]>): string[] {
  return arr.sort((a, b) => b.length - a.length).flat();
}
