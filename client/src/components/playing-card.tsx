import { Card, SUIT_SYMBOLS, SUIT_COLORS } from '@/lib/callbreak-types';
import { cn } from '@/lib/utils';

interface PlayingCardProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  faceDown?: boolean;
  small?: boolean;
  className?: string;
}

export function PlayingCard({ 
  card, 
  onClick, 
  disabled, 
  selected, 
  faceDown,
  small,
  className 
}: PlayingCardProps) {
  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const colorClass = SUIT_COLORS[card.suit];

  if (faceDown) {
    return (
      <div 
        className={cn(
          "relative rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center",
          small ? "w-12 h-16" : "w-16 h-24 sm:w-20 sm:h-28",
          className
        )}
      >
        <div className="absolute inset-2 rounded border border-primary-foreground/20" />
        <span className="text-primary-foreground/50 text-2xl font-bold">CB</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={`card-${card.suit}-${card.rank}`}
      className={cn(
        "relative rounded-lg border-2 bg-card shadow-lg transition-all duration-200 flex flex-col",
        small ? "w-12 h-16 p-1" : "w-16 h-24 sm:w-20 sm:h-28 p-2",
        disabled 
          ? "opacity-50 cursor-not-allowed border-muted" 
          : "cursor-pointer border-border hover:-translate-y-2 hover:shadow-xl hover:border-primary/50",
        selected && "ring-2 ring-primary -translate-y-3 shadow-xl",
        className
      )}
    >
      <div className={cn("text-left font-bold", colorClass, small ? "text-xs" : "text-sm sm:text-base")}>
        <div>{card.rank}</div>
        <div className={small ? "text-sm" : "text-base sm:text-lg"}>{suitSymbol}</div>
      </div>
      
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        colorClass,
        small ? "text-xl" : "text-3xl sm:text-4xl"
      )}>
        {suitSymbol}
      </div>
      
      <div className={cn(
        "absolute bottom-1 right-1 sm:bottom-2 sm:right-2 font-bold rotate-180", 
        colorClass,
        small ? "text-xs" : "text-sm sm:text-base"
      )}>
        <div>{card.rank}</div>
        <div className={small ? "text-sm" : "text-base sm:text-lg"}>{suitSymbol}</div>
      </div>
    </button>
  );
}

interface CardBackProps {
  count?: number;
  small?: boolean;
  className?: string;
}

export function CardStack({ count = 1, small, className }: CardBackProps) {
  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/80 to-primary",
            small ? "w-10 h-14" : "w-14 h-20",
          )}
          style={{ 
            left: i * 2, 
            top: i * 2,
            zIndex: i 
          }}
        />
      ))}
      {count > 0 && (
        <div className={cn(
          "absolute flex items-center justify-center text-primary-foreground font-bold text-sm",
          small ? "w-10 h-14 left-4 top-4" : "w-14 h-20 left-4 top-4"
        )}>
          {count}
        </div>
      )}
    </div>
  );
}
