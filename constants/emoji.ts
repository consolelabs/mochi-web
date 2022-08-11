import { IAttributeIcon } from "~types/nft";

const traitEmojis: Record<string, string> = {
  BACKGROUND: "🏙️",
  BODY: "🎽",
  EYES: "👁",
  EYEWEAR: "👓",
  MOUTH: "👅",
  CLOTHE: "🥋",
  CLOTHES: "🥋",
  HAT: "🎩",
  MASK: "👹",
  EARRING: "✨",
  FUR: "✨",
  ASPECT: "☯️",
  ELEMENT: "🔥",
  BLOODTYPE: "🩸",
  NECKLACE: "✨",
};

export function getTraitEmoji(
  list: Record<string, IAttributeIcon>,
  trainType: string
) {
  return (
    list[trainType]?.unicode_icon ||
    traitEmojis[trainType.toUpperCase()] ||
    "🧩"
  );
}
