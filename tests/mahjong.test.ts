import { describe, expect, it } from "vitest";
import {
  calcPoints,
  countsToString,
  isWinningHand,
  parseHand,
  shapeSummary,
  winningTilesForTenpai,
  bestDiscardByUkeire,
  requiredCombosForGap,
} from "../src/lib/mahjong";

describe("mahjong logic", () => {
  it("calculates points with limit handling", () => {
    // 4翻40符 → 満貫
    const m1 = calcPoints(4, 40);
    expect(m1.limitName).toBe("満貫");
    expect(m1.childRon).toBe(8000);

    // 5翻30符 → 満貫
    const m2 = calcPoints(5, 30);
    expect(m2.childRon).toBe(8000);

    // 8翻40符 → 倍満
    const m3 = calcPoints(8, 40);
    expect(m3.limitName).toBe("倍満");
    expect(m3.childRon).toBe(16000);
  });

  it("detects winning hand and waits", () => {
    const hand = parseHand("123m123p123s東東東55p");
    expect(isWinningHand(hand)).toBe(true);

    const tenpai = parseHand("123m123p123s東東東5p");
    const waits = winningTilesForTenpai(tenpai);
    expect(waits.length).toBeGreaterThan(0);
  });

  it("summarizes hand shapes", () => {
    const hand = parseHand("123m456p789s東東南南");
    const summary = shapeSummary(hand);
    expect(summary.sequences.length).toBeGreaterThan(0);
    expect(summary.pairs).toContain("東");
  });

  it("roundtrips parseHand and countsToString", () => {
    const input = "123m456p789s東東南南";
    const counts = parseHand(input);
    const out = countsToString(counts);
    expect(out.replace(/\s+/g, "")).toContain("123m");
    expect(out.replace(/\s+/g, "")).toContain("456p");
    expect(out.replace(/\s+/g, "")).toContain("789s");
  });

  it("suggests best discard by ukeire", () => {
    const hand = parseHand("233m456p678s55m白白白");
    const suggestion = bestDiscardByUkeire(hand);
    expect(suggestion).not.toBeNull();
    if (suggestion) {
      expect(suggestion.ukeire).toBeGreaterThan(0);
    }
  });

  it("returns required combos for gap", () => {
    const combos = requiredCombosForGap(8000, { dealer: false, tsumo: false });
    expect(combos.length).toBeGreaterThan(0);
    expect(combos[0].han).toBeGreaterThan(0);
  });
});
