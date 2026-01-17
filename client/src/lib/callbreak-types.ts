export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

export interface Player {
  id: number;
  name: string;
  isHuman: boolean;
  hand: Card[];
  bid: number;
  tricksWon: number;
  score: number;
}

export type GamePhase = 'dealing' | 'bidding' | 'playing' | 'roundEnd' | 'gameEnd';

export interface Trick {
  cards: { playerId: number; card: Card }[];
  leadSuit: Suit | null;
  winnerId: number | null;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;
  currentRound: number;
  totalRounds: number;
  currentTrick: Trick;
  tricksPlayedInRound: number;
  deck: Card[];
  trumpSuit: Suit;
  lastTrickWinner: number | null;
}

export const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '\u2660',
  hearts: '\u2665',
  diamonds: '\u2666',
  clubs: '\u2663'
};

export const SUIT_COLORS: Record<Suit, string> = {
  spades: 'text-foreground',
  hearts: 'text-red-500',
  diamonds: 'text-red-500',
  clubs: 'text-foreground'
};

export const RANK_VALUES: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};
