export type TileCount = number[]; // length 34

export const tileLabels: string[] = [
  "1m",
  "2m",
  "3m",
  "4m",
  "5m",
  "6m",
  "7m",
  "8m",
  "9m",
  "1p",
  "2p",
  "3p",
  "4p",
  "5p",
  "6p",
  "7p",
  "8p",
  "9p",
  "1s",
  "2s",
  "3s",
  "4s",
  "5s",
  "6s",
  "7s",
  "8s",
  "9s",
  "東",
  "南",
  "西",
  "北",
  "白",
  "發",
  "中",
];

export const honorShort = ["E", "S", "W", "N", "P", "F", "C"];

export function emptyCounts(): TileCount {
  return Array(34).fill(0);
}

export function totalTiles(counts: TileCount): number {
  return counts.reduce((a, b) => a + b, 0);
}

function suitBase(suit: "m" | "p" | "s" | "z"): number {
  if (suit === "m") return 0;
  if (suit === "p") return 9;
  if (suit === "s") return 18;
  return 27;
}

export function tileLabel(index: number): string {
  return tileLabels[index] ?? "?";
}

export function parseHand(input: string): TileCount {
  const counts = emptyCounts();
  let buffer: string[] = [];
  const pushBuffered = (suit: "m" | "p" | "s" | "z") => {
    buffer.forEach((d) => {
      const n = Number(d);
      if (Number.isInteger(n) && n >= 1 && n <= (suit === "z" ? 7 : 9)) {
        const idx = suitBase(suit) + n - 1;
        if (counts[idx] < 4) counts[idx] += 1;
      }
    });
    buffer = [];
  };

  for (const ch of input.replace(/\s+/g, "")) {
    if (["m", "p", "s", "z"].includes(ch)) {
      pushBuffered(ch as "m" | "p" | "s" | "z");
      continue;
    }
    if ("123456789".includes(ch)) {
      buffer.push(ch);
      continue;
    }
    // honor letters
    const honorIndex = honorShort.indexOf(ch.toUpperCase());
    if (honorIndex >= 0) {
      pushBuffered("z");
      const idx = 27 + honorIndex;
      if (counts[idx] < 4) counts[idx] += 1;
    }
    // honor kanji
    if ("東南西北白發中".includes(ch)) {
      pushBuffered("z");
      const idx = 27 + "東南西北白發中".indexOf(ch);
      if (counts[idx] < 4) counts[idx] += 1;
    }
  }
  return counts;
}

export function countsToString(counts: TileCount): string {
  const parts: string[] = [];
  const appendSuit = (start: number, len: number, mark: string) => {
    const digits: string[] = [];
    for (let i = 0; i < len; i += 1) {
      for (let k = 0; k < counts[start + i]; k += 1) {
        digits.push(String(i + 1));
      }
    }
    if (digits.length) parts.push(`${digits.join("")}${mark}`);
  };
  appendSuit(0, 9, "m");
  appendSuit(9, 9, "p");
  appendSuit(18, 9, "s");
  const honors: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    for (let k = 0; k < counts[27 + i]; k += 1) {
      honors.push(tileLabels[27 + i]);
    }
  }
  if (honors.length) parts.push(honors.join(""));
  return parts.join(" ");
}

function canFormSets(counts: TileCount, startIdx = 0): boolean {
  let i = startIdx;
  while (i < 34 && counts[i] === 0) i += 1;
  if (i === 34) return true;

  const suit = i < 9 ? "m" : i < 18 ? "p" : i < 27 ? "s" : "z";
  // try triplet
  if (counts[i] >= 3) {
    counts[i] -= 3;
    if (canFormSets(counts, i)) return true;
    counts[i] += 3;
  }
  // try sequence for suits
  if (suit !== "z") {
    const pos = i % 9;
    if (pos <= 6 && counts[i + 1] > 0 && counts[i + 2] > 0) {
      counts[i] -= 1;
      counts[i + 1] -= 1;
      counts[i + 2] -= 1;
      if (canFormSets(counts, i)) return true;
      counts[i] += 1;
      counts[i + 1] += 1;
      counts[i + 2] += 1;
    }
  }

  return false;
}

export function isWinningHand(counts: TileCount): boolean {
  if (totalTiles(counts) % 3 !== 2) return false;
  for (let i = 0; i < 34; i += 1) {
    if (counts[i] >= 2) {
      counts[i] -= 2;
      if (canFormSets(counts)) {
        counts[i] += 2;
        return true;
      }
      counts[i] += 2;
    }
  }
  return false;
}

export function winningTilesForTenpai(counts: TileCount): { tile: number; remaining: number }[] {
  if (totalTiles(counts) % 3 !== 1) return [];
  const res: { tile: number; remaining: number }[] = [];
  for (let i = 0; i < 34; i += 1) {
    if (counts[i] >= 4) continue;
    counts[i] += 1;
    if (isWinningHand(counts)) {
      res.push({ tile: i, remaining: 4 - counts[i] });
    }
    counts[i] -= 1;
  }
  return res;
}

export function bestDiscardByUkeire(counts: TileCount): {
  discardIndex: number;
  ukeire: number;
  waits: { tile: number; remaining: number }[];
} | null {
  if (totalTiles(counts) % 3 !== 2) return null;
  let best: { discardIndex: number; ukeire: number; waits: { tile: number; remaining: number }[] } | null =
    null;
  for (let i = 0; i < 34; i += 1) {
    if (counts[i] === 0) continue;
    counts[i] -= 1;
    const waits = winningTilesForTenpai(counts);
    const ukeire = waits.reduce((acc, w) => acc + w.remaining, 0);
    if (!best || ukeire > best.ukeire) {
      best = { discardIndex: i, ukeire, waits };
    }
    counts[i] += 1;
  }
  return best;
}

export function shapeSummary(counts: TileCount): {
  triplets: string[];
  sequences: string[];
  pairs: string[];
  isolated: string[];
} {
  const tmp = counts.slice();
  const triplets: string[] = [];
  const sequences: string[] = [];
  const pairs: string[] = [];
  const isolated: string[] = [];

  // grab triplets first
  for (let i = 0; i < 34; i += 1) {
    while (tmp[i] >= 3) {
      triplets.push(tileLabel(i));
      tmp[i] -= 3;
    }
  }
  // sequences
  for (let i = 0; i < 27; i += 1) {
    const suitPos = i % 9;
    if (suitPos > 6) continue;
    while (tmp[i] > 0 && tmp[i + 1] > 0 && tmp[i + 2] > 0) {
      sequences.push(`${tileLabel(i)}${tileLabel(i + 1)}${tileLabel(i + 2)}`);
      tmp[i] -= 1;
      tmp[i + 1] -= 1;
      tmp[i + 2] -= 1;
    }
  }
  // pairs and singles
  for (let i = 0; i < 34; i += 1) {
    if (tmp[i] === 2) {
      pairs.push(tileLabel(i));
    } else if (tmp[i] === 1) {
      isolated.push(tileLabel(i));
    }
  }

  return { triplets, sequences, pairs, isolated };
}

export type PointContext = {
  han: number;
  fu: number;
  dealer: boolean;
  tsumo: boolean;
};

export type PointResult = {
  base: number;
  limitName?: string;
  dealerRon: number;
  childRon: number;
  dealerTsumoEach: number;
  childTsumoDealer: number;
  childTsumoNonDealer: number;
};

function roundPoint(v: number): number {
  return Math.ceil(v / 100) * 100;
}

export function calcPointBase(han: number, fu: number): { base: number; limitName?: string } {
  if (han >= 13) return { base: 8000, limitName: "役満" };
  if (han >= 11) return { base: 6000, limitName: "三倍満" };
  if (han >= 8) return { base: 4000, limitName: "倍満" };
  if (han >= 6) return { base: 3000, limitName: "跳満" };
  if (han === 5 || (han === 4 && fu >= 40) || (han === 3 && fu >= 70)) {
    return { base: 2000, limitName: "満貫" };
  }
  const raw = fu * 2 ** (2 + han);
  const capped = Math.min(raw, 2000);
  return { base: capped, limitName: capped === 2000 ? "満貫相当" : undefined };
}

export function calcPoints(han: number, fu: number): PointResult {
  const { base, limitName } = calcPointBase(han, fu);
  const dealerRon = roundPoint(base * 6);
  const childRon = roundPoint(base * 4);
  const dealerTsumoEach = roundPoint(base * 2);
  const childTsumoDealer = roundPoint(base * 2);
  const childTsumoNonDealer = roundPoint(base);
  return {
    base,
    limitName,
    dealerRon,
    childRon,
    dealerTsumoEach,
    childTsumoDealer,
    childTsumoNonDealer,
  };
}

export function requiredCombosForGap(
  gap: number,
  opts: { dealer: boolean; tsumo: boolean },
): { han: number; fu: number; points: number; label: string }[] {
  const fuList = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  const combos: { han: number; fu: number; points: number; label: string }[] = [];
  for (let han = 1; han <= 13; han += 1) {
    for (const fu of fuList) {
      const pt = calcPoints(han, fu);
      let score = 0;
      let label = "";
      if (opts.tsumo) {
        if (opts.dealer) {
          score = pt.dealerTsumoEach * 3;
          label = `子x3 ${pt.dealerTsumoEach}`;
        } else {
          score = pt.childTsumoDealer + pt.childTsumoNonDealer * 2;
          label = `親 ${pt.childTsumoDealer} / 子 ${pt.childTsumoNonDealer}`;
        }
      } else if (opts.dealer) {
        score = pt.dealerRon;
        label = `${pt.dealerRon}（親ロン）`;
      } else {
        score = pt.childRon;
        label = `${pt.childRon}（子ロン）`;
      }
      if (score >= gap) {
        combos.push({ han, fu, points: score, label });
      }
    }
  }
  return combos
    .sort((a, b) => a.han - b.han || a.fu - b.fu)
    .slice(0, 4);
}
