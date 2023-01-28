export type Suit = 'SPADES' | 'CLUBS' | 'DIAMONDS' | 'HEARTS';

export const SUIT: Record<Suit, Suit> = {
  SPADES: 'SPADES',
  CLUBS: 'CLUBS',
  DIAMONDS: 'DIAMONDS',
  HEARTS: 'HEARTS',
};

export const suitList: Suit[] = Object.values(SUIT);

export const suitDisplayLabels = {
  SPADES: 'Spades',
  CLUBS: 'Clubs',
  DIAMONDS: 'Diamonds',
  HEARTS: 'Hearts',
};
