import { Exclusion } from 'gift-exchange';

export const exclusionKey = (exclusion: Exclusion) =>
  exclusion.type +
  exclusion.subject +
  exclusion.excludedType +
  exclusion.excludedSubject;
