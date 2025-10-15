export const CATEGORIES = [
  "Tous",
  "Italien",
  "Japonais",
  "Mexicain",
  "Indien",
  "Américain",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const FAVORITES_STORAGE_KEY = "@favorites";

export const CUISINE_TYPE_MAP: Record<string, string> = {
  All: "Tous",
  Italian: "Italien",
  Japanese: "Japonais",
  Mexican: "Mexicain",
  Indian: "Indien",
  American: "Américain",
};
