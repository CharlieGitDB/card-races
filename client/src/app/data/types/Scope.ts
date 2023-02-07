export type Scope = 'ALL' | 'GROUP' | 'USER';

export const SCOPE: Record<Scope, Scope> = {
  ALL: 'ALL',
  GROUP: 'GROUP',
  USER: 'USER',
};
