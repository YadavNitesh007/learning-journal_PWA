import { 
  Card, Suit, Rank, Player, GameState, Trick, GamePhase,
  RANK_VALUES 
} from './callbreak-types';

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, value: RANK_VALUES[rank] });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(players: Player[], deck: Card[]): Player[] {
  const cardsPerPlayer = 13;
  return players.map((player, index) => ({
    ...player,
    hand: sortHand(deck.slice(index * cardsPerPlayer, (index + 1) * cardsPerPlayer)),
    bid: 0,
    tricksWon: 0
  }));
}

export function sortHand(hand: Card[]): Card[] {
  const suitOrder: Record<Suit, number> = { spades: 0, hearts: 1, diamonds: 2, clubs: 3 };
  return [...hand].sort((a, b) => {
    if (suitOrder[a.suit] !== suitOrder[b.suit]) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return b.value - a.value;
  });
}

export function createInitialGameState(): GameState {
  const players: Player[] = [
    { id: 0, name: 'You', isHuman: true, hand: [], bid: 0, tricksWon: 0, score: 0 },
    { id: 1, name: 'Bot East', isHuman: false, hand: [], bid: 0, tricksWon: 0, score: 0 },
    { id: 2, name: 'Bot North', isHuman: false, hand: [], bid: 0, tricksWon: 0, score: 0 },
    { id: 3, name: 'Bot West', isHuman: false, hand: [], bid: 0, tricksWon: 0, score: 0 }
  ];

  return {
    players,
    currentPlayerIndex: 0,
    phase: 'dealing',
    currentRound: 1,
    totalRounds: 5,
    currentTrick: { cards: [], leadSuit: null, winnerId: null },
    tricksPlayedInRound: 0,
    deck: [],
    trumpSuit: 'spades',
    lastTrickWinner: null
  };
}

export function startNewRound(state: GameState): GameState {
  const deck = shuffleDeck(createDeck());
  const players = dealCards(state.players.map(p => ({ ...p, tricksWon: 0, bid: 0 })), deck);
  
  return {
    ...state,
    players,
    deck,
    phase: 'bidding',
    currentPlayerIndex: 0,
    currentTrick: { cards: [], leadSuit: null, winnerId: null },
    tricksPlayedInRound: 0,
    lastTrickWinner: null
  };
}

export function getAIBid(player: Player): number {
  let expectedTricks = 0;
  const hand = player.hand;
  
  for (const card of hand) {
    if (card.suit === 'spades') {
      if (card.value >= 12) expectedTricks += 1;
      else if (card.value >= 10) expectedTricks += 0.5;
    } else {
      if (card.value === 14) expectedTricks += 0.8;
      else if (card.value === 13) expectedTricks += 0.5;
      else if (card.value === 12) expectedTricks += 0.3;
    }
  }
  
  const bid = Math.max(1, Math.min(8, Math.round(expectedTricks)));
  return bid;
}

export function placeBid(state: GameState, playerId: number, bid: number): GameState {
  const players = state.players.map(p => 
    p.id === playerId ? { ...p, bid } : p
  );
  
  const nextPlayerIndex = (state.currentPlayerIndex + 1) % 4;
  const allBidsPlaced = nextPlayerIndex === 0 && players.every(p => p.bid > 0);
  
  return {
    ...state,
    players,
    currentPlayerIndex: nextPlayerIndex,
    phase: allBidsPlaced ? 'playing' : 'bidding'
  };
}

export function getValidCards(player: Player, trick: Trick, _trumpSuit: Suit): Card[] {
  if (trick.cards.length === 0) {
    return player.hand;
  }
  
  const leadSuit = trick.leadSuit!;
  const cardsOfLeadSuit = player.hand.filter(c => c.suit === leadSuit);
  
  if (cardsOfLeadSuit.length > 0) {
    return cardsOfLeadSuit;
  }
  
  return player.hand;
}

export function playCard(state: GameState, playerId: number, card: Card): GameState {
  const player = state.players.find(p => p.id === playerId)!;
  const newHand = player.hand.filter(c => !(c.suit === card.suit && c.rank === card.rank));
  
  const newTrickCards = [...state.currentTrick.cards, { playerId, card }];
  const leadSuit = state.currentTrick.leadSuit || card.suit;
  
  let newState: GameState = {
    ...state,
    players: state.players.map(p => 
      p.id === playerId ? { ...p, hand: newHand } : p
    ),
    currentTrick: {
      cards: newTrickCards,
      leadSuit,
      winnerId: null
    },
    currentPlayerIndex: (state.currentPlayerIndex + 1) % 4
  };
  
  if (newTrickCards.length === 4) {
    const winnerId = determineTrickWinner(newTrickCards, leadSuit, state.trumpSuit);
    const players = newState.players.map(p =>
      p.id === winnerId ? { ...p, tricksWon: p.tricksWon + 1 } : p
    );
    
    const tricksPlayedInRound = state.tricksPlayedInRound + 1;
    const isRoundEnd = tricksPlayedInRound === 13;
    const finalPlayers = isRoundEnd ? calculateRoundScores(players) : players;
    
    newState = {
      ...newState,
      players: finalPlayers,
      currentTrick: { cards: newTrickCards, leadSuit, winnerId },
      tricksPlayedInRound,
      lastTrickWinner: winnerId,
      currentPlayerIndex: winnerId,
      phase: isRoundEnd ? 'roundEnd' : 'playing'
    };
  }
  
  return newState;
}

export function determineTrickWinner(
  cards: { playerId: number; card: Card }[],
  leadSuit: Suit,
  trumpSuit: Suit
): number {
  const trumpCards = cards.filter(c => c.card.suit === trumpSuit);
  
  if (trumpCards.length > 0) {
    return trumpCards.reduce((winner, current) =>
      current.card.value > winner.card.value ? current : winner
    ).playerId;
  }
  
  const leadCards = cards.filter(c => c.card.suit === leadSuit);
  return leadCards.reduce((winner, current) =>
    current.card.value > winner.card.value ? current : winner
  ).playerId;
}

export function calculateRoundScores(players: Player[]): Player[] {
  return players.map(player => {
    let roundScore = 0;
    
    if (player.tricksWon >= player.bid) {
      roundScore = player.bid + (player.tricksWon - player.bid) * 0.1;
    } else {
      roundScore = -player.bid;
    }
    
    return {
      ...player,
      score: Math.round((player.score + roundScore) * 10) / 10
    };
  });
}

export function getAICardToPlay(player: Player, trick: Trick, trumpSuit: Suit): Card {
  const validCards = getValidCards(player, trick, trumpSuit);
  
  if (trick.cards.length === 0) {
    const nonTrumps = validCards.filter(c => c.suit !== trumpSuit);
    if (nonTrumps.length > 0) {
      const highCard = nonTrumps.find(c => c.value >= 12);
      if (highCard) return highCard;
      return nonTrumps[nonTrumps.length - 1];
    }
    return validCards[validCards.length - 1];
  }
  
  const leadSuit = trick.leadSuit!;
  const currentWinning = getCurrentWinningCard(trick, trumpSuit);
  
  const winningCards = validCards.filter(c => {
    if (c.suit === trumpSuit && currentWinning.suit !== trumpSuit) return true;
    if (c.suit === currentWinning.suit && c.value > currentWinning.value) return true;
    return false;
  });
  
  if (winningCards.length > 0) {
    return winningCards[winningCards.length - 1];
  }
  
  return validCards[validCards.length - 1];
}

function getCurrentWinningCard(trick: Trick, trumpSuit: Suit): Card {
  const trumpCards = trick.cards.filter(c => c.card.suit === trumpSuit);
  
  if (trumpCards.length > 0) {
    return trumpCards.reduce((best, curr) => 
      curr.card.value > best.card.value ? curr : best
    ).card;
  }
  
  const leadCards = trick.cards.filter(c => c.card.suit === trick.leadSuit);
  return leadCards.reduce((best, curr) => 
    curr.card.value > best.card.value ? curr : best
  ).card;
}

export function nextRound(state: GameState): GameState {
  if (state.currentRound >= state.totalRounds) {
    return {
      ...state,
      phase: 'gameEnd'
    };
  }
  
  const newState = startNewRound({
    ...state,
    currentRound: state.currentRound + 1
  });
  
  return newState;
}

export function resetGame(): GameState {
  const initial = createInitialGameState();
  return startNewRound(initial);
}
