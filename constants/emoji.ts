const traitEmojis: Record<string, string> = {
  BACKGROUND: "🏙️ㅤ",
  BODY: "🎽ㅤ",
  EYES: "👁ㅤ",
  EYEWEAR: "👓ㅤ",
  MOUTH: "👅ㅤ",
  CLOTHE: "🥋ㅤ",
  CLOTHES: "🥋ㅤ",
  HAT: "🎩ㅤ",
  MASK: "👹ㅤ",
  EARRING: "✨ㅤ",
  FUR: "✨ㅤ",
  ASPECT: "☯️ㅤ",
  ELEMENT: "🔥ㅤ",
  BLOODTYPE: "🩸ㅤ",
  NECKLACE: "✨ㅤ",
};

export function getTraitEmoji(trainType: string) {
  return traitEmojis[trainType.toUpperCase()] || "🧩ㅤ";
}
