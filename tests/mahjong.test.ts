import { describe, expect, it } from "vitest";
import {
  calcPoints,
  isWinningHand,
  parseHand,
  shapeSummary,
  winningTilesForTenpai,
} from "../src/lib/mahjong";

describe("mahjong logic", () => {
  it("calculates points with limit handling", () => {
    // 3翻70符 → 満貫
    const m1 = calcPoints(3, 70);
    expect(m1.limitName).toBe("満貫");
    expect(m1.childRon).toBe(12000);

    // 5翻30符 → 満貫
    const m2 = calcPoints(5, 30);
    expect(m2.childRon).toBe(12000);

    // 8翻40符 → 倍満
    const m3 = calcPoints(8, 40);
    expect(m3.limitName).toBe("倍満");
    expect(m3.childRon).toBe(24000);
  });

  it("detects winning hand and waits", () => {
    const hand = parseHand("123m123p123s東東東55p");
    expect(isWinningHand(hand)).toBe(true);

    const tenpai = parseHand("123m123p123s東東東5p");
    const waits = winningTilesForTenpai(tenpai);
    expect(waits.some((w) => w.tile === parseHand("5p")[5 + 8])).toBeTruthy();
    expect(waits.length).toBeGreaterThan(0);
  });

  it("summarizes hand shapes", () => {
    const hand = parseHand("123m456p789s東東南南");
    const summary = shapeSummary(hand);
    expect(summary.sequences.length).toBeGreaterThan(0);
    expect(summary.pairs).toContain("東");
  });
});
