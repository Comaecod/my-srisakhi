export const IMAGE_COUNT = 18;

export const imagePaths: string[] = Array.from(
  { length: IMAGE_COUNT },
  (_, i) => `/game-photos/${i + 1}.jpg`
);
