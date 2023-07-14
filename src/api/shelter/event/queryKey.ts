export const volteerEventKey = {
  all: ['volteerEventKey'] as const,
  volEventList: () =>
    [...volteerEventKey.all, 'volteer-eventKey-list'] as const,
  volEvent: (shelterId: number, volunteerEventId: number) =>
    [...volteerEventKey.volEventList(), shelterId, volunteerEventId] as const
};
