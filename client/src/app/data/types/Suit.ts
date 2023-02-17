export type Suit = 'SPADES' | 'CLUBS' | 'DIAMONDS' | 'HEARTS';

export const SUIT: Record<Suit, Suit> = {
  CLUBS: 'CLUBS',
  DIAMONDS: 'DIAMONDS',
  HEARTS: 'HEARTS',
  SPADES: 'SPADES',
};

export const suitList: Suit[] = Object.values(SUIT);

export const suitDisplayLabels = {
  CLUBS: 'Clubs',
  DIAMONDS: 'Diamonds',
  HEARTS: 'Hearts',
  SPADES: 'Spades',
};
