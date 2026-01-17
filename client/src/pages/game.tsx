import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayingCard } from '@/components/playing-card';
import {
  GameState,
  Player,
  Card as PlayingCardType,
  SUIT_SYMBOLS,
} from '@/lib/callbreak-types';
import {
  resetGame,
  startNewRound,
  placeBid,
  playCard,
  getValidCards,
  getAIBid,
  getAICardToPlay,
  nextRound,
  createInitialGameState,
} from '@/lib/callbreak-game';
import { cn } from '@/lib/utils';
import { RotateCcw, Play, Trophy, Target, Spade } from 'lucide-react';

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [selectedBid, setSelectedBid] = useState(1);
  const [showTrickResult, setShowTrickResult] = useState(false);

  const humanPlayer = gameState.players[0];
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  const handleStartGame = useCallback(() => {
    const newState = startNewRound(createInitialGameState());
    setGameState(newState);
  }, []);

  const handlePlaceBid = useCallback((bid: number) => {
    if (gameState.phase !== 'bidding' || gameState.currentPlayerIndex !== 0) return;
    
    const newState = placeBid(gameState, 0, bid);
    setGameState(newState);
  }, [gameState]);

  useEffect(() => {
    if (gameState.phase === 'bidding' && gameState.currentPlayerIndex !== 0) {
      const timer = setTimeout(() => {
        const currentBot = gameState.players[gameState.currentPlayerIndex];
        const botBid = getAIBid(currentBot);
        const newState = placeBid(gameState, currentBot.id, botBid);
        setGameState(newState);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [gameState.phase, gameState.currentPlayerIndex, gameState.players]);

  const handlePlayCard = useCallback((card: PlayingCardType) => {
    if (gameState.phase !== 'playing' || gameState.currentPlayerIndex !== 0 || showTrickResult) return;
    
    const validCards = getValidCards(humanPlayer, gameState.currentTrick, gameState.trumpSuit);
    const isValid = validCards.some(c => c.suit === card.suit && c.rank === card.rank);
    
    if (!isValid) return;
    
    const newState = playCard(gameState, 0, card);
    setGameState(newState);
    
    if (newState.currentTrick.cards.length === 4) {
      setShowTrickResult(true);
    }
  }, [gameState, humanPlayer, showTrickResult]);

  useEffect(() => {
    if (gameState.phase === 'playing' && gameState.currentPlayerIndex !== 0 && !showTrickResult) {
      const timer = setTimeout(() => {
        const currentBot = gameState.players[gameState.currentPlayerIndex];
        const cardToPlay = getAICardToPlay(currentBot, gameState.currentTrick, gameState.trumpSuit);
        const newState = playCard(gameState, currentBot.id, cardToPlay);
        setGameState(newState);
        
        if (newState.currentTrick.cards.length === 4) {
          setShowTrickResult(true);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gameState.phase, gameState.currentPlayerIndex, gameState.currentTrick, gameState.players, gameState.trumpSuit, showTrickResult]);

  useEffect(() => {
    if (showTrickResult && gameState.currentTrick.winnerId !== null) {
      const timer = setTimeout(() => {
        setShowTrickResult(false);
        
        if (gameState.phase === 'roundEnd') {
          return;
        }
        
        setGameState(prev => ({
          ...prev,
          currentTrick: { cards: [], leadSuit: null, winnerId: null }
        }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showTrickResult, gameState.currentTrick.winnerId, gameState.phase]);

  const handleNextRound = useCallback(() => {
    const newState = nextRound(gameState);
    setGameState(newState);
    setShowTrickResult(false);
  }, [gameState]);

  const handleNewGame = useCallback(() => {
    setGameState(resetGame());
    setShowTrickResult(false);
  }, []);

  const validCards = gameState.phase === 'playing' && gameState.currentPlayerIndex === 0
    ? getValidCards(humanPlayer, gameState.currentTrick, gameState.trumpSuit)
    : [];

  const getPlayerPosition = (playerId: number): string => {
    const positions = ['bottom', 'right', 'top', 'left'];
    return positions[playerId];
  };

  const renderPlayerInfo = (player: Player, position: string) => {
    const isCurrentPlayer = gameState.currentPlayerIndex === player.id;
    const isHuman = player.id === 0;
    
    return (
      <div
        key={player.id}
        className={cn(
          "flex flex-col items-center gap-1",
          position === 'top' && "absolute top-4 left-1/2 -translate-x-1/2",
          position === 'bottom' && "absolute bottom-32 left-1/2 -translate-x-1/2 sm:bottom-40",
          position === 'left' && "absolute left-4 top-1/2 -translate-y-1/2",
          position === 'right' && "absolute right-4 top-1/2 -translate-y-1/2"
        )}
      >
        <Card className={cn(
          "p-2 sm:p-3 min-w-[80px] sm:min-w-[100px]",
          isCurrentPlayer && "ring-2 ring-primary bg-primary/5"
        )}>
          <div className="text-center">
            <p className={cn(
              "font-semibold text-xs sm:text-sm",
              isHuman && "text-primary"
            )}>
              {player.name}
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                <Target className="w-3 h-3 mr-1" />
                {player.bid || '-'}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                {player.tricksWon}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Score: {player.score}
            </p>
          </div>
        </Card>
        
        {!isHuman && gameState.phase === 'playing' && (
          <div className="flex gap-0.5">
            {Array.from({ length: Math.min(player.hand.length, 5) }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-8 sm:w-8 sm:h-10 rounded bg-gradient-to-br from-primary/80 to-primary border border-primary/30"
              />
            ))}
            {player.hand.length > 5 && (
              <span className="text-xs text-muted-foreground ml-1">+{player.hand.length - 5}</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-green-800 to-green-700 dark:from-green-900 dark:to-green-800 rounded-xl mx-4 my-4 md:mx-8 p-4 shadow-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Spade className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Call Break</h1>
            <Badge variant="secondary" className="text-xs">Mini Project</Badge>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Round {gameState.currentRound}/{gameState.totalRounds}
            </Badge>
            <Badge className="bg-primary text-xs sm:text-sm">
              Trump: {SUIT_SYMBOLS[gameState.trumpSuit]} Spades
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={handleNewGame}
              data-testid="button-new-game"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">New Game</span>
            </Button>
          </div>
        </div>

        {gameState.phase === 'dealing' && (
          <Card className="p-8 text-center max-w-md mx-auto mt-20">
            <Spade className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Call Break</h2>
            <p className="text-muted-foreground mb-6">
              A trick-taking card game for 4 players. Spades are always trump.
              Bid how many tricks you'll win, then try to meet your target!
            </p>
            <Button 
              size="lg" 
              onClick={handleStartGame}
              data-testid="button-start-game"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>
          </Card>
        )}

        {gameState.phase === 'bidding' && (
          <div className="relative h-[500px] sm:h-[600px]">
            {gameState.players.map(player => 
              renderPlayerInfo(player, getPlayerPosition(player.id))
            )}
            
            {gameState.currentPlayerIndex === 0 && (
              <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6 z-10">
                <h3 className="text-lg font-semibold mb-3 text-center">Place Your Bid</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  How many tricks will you win? (1-8)
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(bid => (
                    <Button
                      key={bid}
                      variant={selectedBid === bid ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedBid(bid)}
                      data-testid={`button-bid-${bid}`}
                    >
                      {bid}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handlePlaceBid(selectedBid)}
                  data-testid="button-confirm-bid"
                >
                  Confirm Bid: {selectedBid}
                </Button>
              </Card>
            )}
            
            {gameState.currentPlayerIndex !== 0 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Card className="p-4 animate-pulse">
                  <p className="text-center">{currentPlayer.name} is bidding...</p>
                </Card>
              </div>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 overflow-x-auto max-w-full px-4">
              {humanPlayer.hand.map((card, i) => (
                <PlayingCard
                  key={`${card.suit}-${card.rank}`}
                  card={card}
                  disabled
                  small
                  className="flex-shrink-0"
                />
              ))}
            </div>
          </div>
        )}

        {(gameState.phase === 'playing' || (showTrickResult && gameState.phase !== 'roundEnd')) && (
          <div className="relative h-[500px] sm:h-[600px]">
            {gameState.players.map(player => 
              renderPlayerInfo(player, getPlayerPosition(player.id))
            )}
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48">
              <div className="relative w-full h-full rounded-full bg-green-700/50 dark:bg-green-800/50 border-2 border-green-600/50">
                {gameState.currentTrick.cards.map((tc, i) => {
                  const positions = [
                    { left: '50%', bottom: '10%', transform: 'translateX(-50%)' },
                    { right: '10%', top: '50%', transform: 'translateY(-50%)' },
                    { left: '50%', top: '10%', transform: 'translateX(-50%)' },
                    { left: '10%', top: '50%', transform: 'translateY(-50%)' }
                  ];
                  const pos = positions[tc.playerId];
                  const isWinner = showTrickResult && tc.playerId === gameState.currentTrick.winnerId;
                  
                  return (
                    <div
                      key={`${tc.card.suit}-${tc.card.rank}`}
                      className={cn(
                        "absolute transition-all duration-300",
                        isWinner && "ring-4 ring-yellow-400 rounded-lg z-10"
                      )}
                      style={pos as React.CSSProperties}
                    >
                      <PlayingCard card={tc.card} small disabled />
                    </div>
                  );
                })}
                
                {showTrickResult && gameState.currentTrick.winnerId !== null && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge className="bg-yellow-500 text-black animate-bounce">
                      {gameState.players[gameState.currentTrick.winnerId].name} wins!
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 overflow-x-auto max-w-full px-4">
              {humanPlayer.hand.map((card) => {
                const isValid = validCards.some(c => c.suit === card.suit && c.rank === card.rank);
                return (
                  <PlayingCard
                    key={`${card.suit}-${card.rank}`}
                    card={card}
                    onClick={() => handlePlayCard(card)}
                    disabled={gameState.currentPlayerIndex !== 0 || !isValid || showTrickResult}
                    className={cn(
                      "flex-shrink-0",
                      !isValid && gameState.currentPlayerIndex === 0 && "opacity-40"
                    )}
                  />
                );
              })}
            </div>
            
            {gameState.currentPlayerIndex !== 0 && !showTrickResult && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-28">
                <Badge variant="secondary" className="animate-pulse">
                  {currentPlayer.name} is thinking...
                </Badge>
              </div>
            )}
          </div>
        )}

        {gameState.phase === 'roundEnd' && (
          <Card className="p-6 max-w-lg mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">Round {gameState.currentRound} Complete!</h2>
            
            <div className="space-y-3 mb-6">
              {gameState.players.map(player => {
                const madeIt = player.tricksWon >= player.bid;
                return (
                  <div 
                    key={player.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      madeIt ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                    )}
                  >
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Bid: {player.bid} | Won: {player.tricksWon}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={madeIt ? "default" : "destructive"}>
                        {madeIt ? '+' : ''}{madeIt ? Math.round((player.bid + (player.tricksWon - player.bid) * 0.1) * 10) / 10 : -player.bid}
                      </Badge>
                      <p className="text-sm font-medium mt-1">Total: {player.score}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleNextRound}
              data-testid="button-next-round"
            >
              {gameState.currentRound >= gameState.totalRounds ? 'See Final Results' : 'Next Round'}
            </Button>
          </Card>
        )}

        {gameState.phase === 'gameEnd' && (
          <Card className="p-6 max-w-lg mx-auto mt-8">
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
            </div>
            
            <div className="space-y-3 mb-6">
              {[...gameState.players]
                .sort((a, b) => b.score - a.score)
                .map((player, rank) => (
                  <div 
                    key={player.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      rank === 0 && "bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground">
                        #{rank + 1}
                      </span>
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        {rank === 0 && <Badge>Winner!</Badge>}
                      </div>
                    </div>
                    <p className="text-xl font-bold">{player.score}</p>
                  </div>
                ))}
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleNewGame}
              data-testid="button-play-again"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </Card>
        )}

      </div>
    </div>
  );
}
