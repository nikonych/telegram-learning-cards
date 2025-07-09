export interface FlashCard {
    id: number;
    term: string;
    definition: string;
    category: string;
    difficulty: number;
}

export type StudyMode = 'all' | 'difficult' | 'review';

export interface AppState {
    currentCardIndex: number;
    currentMode: StudyMode;
    isFlipped: boolean;
    studiedCount: number;
    correctCount: number;
    currentDeck: FlashCard[];
    reviewDeck: FlashCard[];
    difficultDeck: FlashCard[];
    cards: FlashCard[];
    isCompleted: boolean;
}

export interface StatsProps {
    studied: number;
    correct: number;
    total: number;
}

export interface ProgressBarProps {
    progress: number;
}

export interface ModeSelectorProps {
    currentMode: StudyMode;
    onModeChange: (mode: StudyMode) => void;
}

export interface FlashCardProps {
    card: FlashCard;
    isFlipped: boolean;
    onFlip: () => void;
}

export interface ControlsProps {
    onMarkHard: () => void;
    onMarkEasy: () => void;
    onNext: () => void;
}

export interface CompletionScreenProps {
    onRestart: () => void;
}