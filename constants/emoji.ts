const traitEmojis: Record<string, string> = {
  BACKGROUND: "ποΈγ€",
  BODY: "π½γ€",
  EYES: "πγ€",
  EYEWEAR: "πγ€",
  MOUTH: "πγ€",
  CLOTHE: "π₯γ€",
  CLOTHES: "π₯γ€",
  HAT: "π©γ€",
  MASK: "πΉγ€",
  EARRING: "β¨γ€",
  FUR: "β¨γ€",
  ASPECT: "β―οΈγ€",
  ELEMENT: "π₯γ€",
  BLOODTYPE: "π©Έγ€",
  NECKLACE: "β¨γ€",
};

export function getTraitEmoji(trainType: string) {
  return traitEmojis[trainType.toUpperCase()] || "π§©γ€";
}
