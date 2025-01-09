export function SortDominoes(
  dominoes: number[][],
  order: "asc" | "desc"
): number[][] {
  return [...dominoes].sort((a, b) => {
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];
    if (order === "asc")
      return totalA === totalB ? a[0] - b[0] : totalA - totalB;
    else return totalA === totalB ? b[0] - a[0] : totalB - totalA;
  });
}

export function FlipDominoes(dominoes: number[][]): number[][] {
  return [...dominoes].map((domino) => [domino[1], domino[0]]);
}

export function RemoveDuplicate(dominoes: number[][]): number[][] {
  const seen = new Set<number>();
  return dominoes.filter((domino) => {
    const total = domino[0] + domino[1];
    if (seen.has(total)) {
      return false;
    }
    seen.add(total);
    return true;
  });
}

export function RemoveTotal(dominoes: number[][], total: number): number[][] {
  return dominoes.filter(([a, b]) => a + b !== total);
}
