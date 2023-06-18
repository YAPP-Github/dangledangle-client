export const shelterKey = {
  all: ['shelter'] as const,
  animalList: () => [...shelterKey.all, 'observation-animal-list'] as const,
  animal: (id: number) => [...shelterKey.animalList(), id] as const,
  image: () => [...shelterKey.all, 'image'] as const,
  essentialInfo: () => [...shelterKey.all, 'essential-info'] as const,
  additionalInfo: () => [...shelterKey.all, 'additional-info'] as const
};
