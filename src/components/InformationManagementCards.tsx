import React, {useState, useEffect, useRef} from 'react';
import {Check, X, ChevronDown, RotateCcw} from 'lucide-react';
import WebApp from "@twa-dev/sdk";

interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    themeParams: {
        bg_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        button_text_color: string;
        secondary_bg_color: string;
        header_bg_color: string;
    };
    colorScheme: 'light' | 'dark';
    MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isActive: boolean;
        isProgressVisible: boolean;
        setText: (text: string) => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
        enable: () => void;
        disable: () => void;
        showProgress: (leaveActive?: boolean) => void;
        hideProgress: () => void;
    };
    BackButton: {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
    };
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        selectionChanged: () => void;
    };
    sendData: (data: string) => void;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}
import {
    informationsmanagement_questions,
    projektmanagement_questions,
    projektinitiierung_questions,
    type Question
} from '../data/questions';

const questions: Question[] = [
    ...informationsmanagement_questions,
    ...projektmanagement_questions,
    ...projektinitiierung_questions
];

// Типы вопросов
type CardState = 'question' | 'answering' | 'result';
type AnswerResult = 'correct' | 'incorrect' | 'partial' | null;


const InformationManagementCards: React.FC = () => {

    const [currentCard, setCurrentCard] = useState<number>(0);
    const [cardState, setCardState] = useState<CardState>('question');
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [orderedItems, setOrderedItems] = useState<string[]>([]);
    const [fillBlanks, setFillBlanks] = useState<string[]>([]);
    const [booleanAnswer, setBooleanAnswer] = useState<boolean | null>(null);
    const [answerResults, setAnswerResults] = useState<Map<number, AnswerResult>>(new Map());
    const [tg, setTg] = useState<TelegramWebApp | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const initialHeight = useRef(window.innerHeight);
    const timeoutRef = useRef<number | null>(null);
    // Инициализация Telegram WebApp
    useEffect(() => {
        const webApp = window.Telegram?.WebApp;
        if (webApp) {
            setTg(webApp);

            // Инициализация WebApp
            webApp.ready();
            webApp.expand();
            WebApp.disableVerticalSwipes();
            if (parseFloat(WebApp.version) >= 8.0) {
                WebApp.requestFullscreen();
            } else {
                console.log('requestFullscreen не поддерживается в этой версии Telegram WebApp');
            }

            // Настройка интерфейса
            webApp.enableClosingConfirmation();

            // Настройка MainButton
            webApp.MainButton.hide();

            // Скрытие BackButton если он есть
            if (webApp.BackButton.isVisible) {
                webApp.BackButton.hide();
            }
        }

        return () => {
            if (webApp) {
                webApp.MainButton.hide();
                webApp.disableClosingConfirmation();
            }
        };
    }, []);


    useEffect(() => {
        if (tg && answerResults.size === questions.length) {
            const correctCount = Array.from(answerResults.values()).filter(result => result === 'correct').length;
            const partialCount = Array.from(answerResults.values()).filter(result => result === 'partial').length;

            tg.MainButton.setText(`🎉 Fertig! ${correctCount}/${questions.length} richtig`);
            tg.MainButton.show();

            const handleComplete = () => {
                if (tg.HapticFeedback) {
                    tg.HapticFeedback.notificationOccurred('success');
                }
                tg.sendData(JSON.stringify({
                    action: 'completed',
                    correct: correctCount,
                    partial: partialCount,
                    incorrect: questions.length - correctCount - partialCount,
                    totalCards: questions.length,
                    timestamp: new Date().toISOString()
                }));
            };

            tg.MainButton.onClick(handleComplete);

            return () => {
                tg.MainButton.offClick(handleComplete);
            };
        } else if (tg) {
            tg.MainButton.hide();
        }
    }, [answerResults, tg]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isDropdownOpen && !(event.target as Element).closest('.relative')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    useEffect(() => {
    // Сохраняем изначальную высоту при загрузке
    initialHeight.current = window.innerHeight;

    // Предотвращаем зум при фокусе на input
    const preventZoom = () => {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content',
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
        }
    };

    // Восстанавливаем зум после потери фокуса
    const allowZoom = () => {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content',
                'width=device-width, initial-scale=1.0'
            );
        }
    };

    const handleFocusIn = (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            preventZoom();
            // Очищаем предыдущий таймаут
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                setIsKeyboardVisible(true);
            }, 150);
        }
    };

    const handleFocusOut = (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            // Очищаем предыдущий таймаут
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                setIsKeyboardVisible(false);
                allowZoom();
            }, 150);
        }
    };

    // Дополнительная проверка через изменение высоты viewport
    const handleViewportChange = () => {
        const currentHeight = window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;

        const heightDifference = initialHeight.current - currentHeight;
        const isKeyboardOpen = heightDifference > 150; // Клавиатура открыта если разница больше 150px

        setIsKeyboardVisible(isKeyboardOpen);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);

        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', handleViewportChange);
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Восстанавливаем viewport при размонтировании
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content',
                'width=device-width, initial-scale=1.0'
            );
        }
    };
}, []);
    // Получить уникальные категории из вопросов
    const getCategories = () => {
        const categories = [...new Set(questions.map(q => q.category))];
        return ['all', ...categories];
    };

// Фильтровать вопросы по выбранной категории
    const getFilteredQuestions = () => {
        if (selectedCategory === 'all') return questions;
        return questions.filter(q => q.category === selectedCategory);
    };

// Обработчик смены категории
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentCard(0);
        setCardState('question');
        resetAnswers();
        setIsDropdownOpen(false);

        // Очистить результаты для новой категории
        const filteredQuestions = category === 'all' ? questions : questions.filter(q => q.category === category);
        const newResults = new Map();
        filteredQuestions.forEach(q => {
            if (answerResults.has(q.id)) {
                newResults.set(q.id, answerResults.get(q.id));
            }
        });
        setAnswerResults(newResults);
    };

    const resetAnswers = () => {
        setUserAnswer('');
        setSelectedOptions([]);
        setOrderedItems([]);
        setFillBlanks([]);
        setBooleanAnswer(null);
    };

    const nextCard = (): void => {
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
        const filteredQuestions = getFilteredQuestions();
        setCurrentCard((prev: number) => (prev + 1) % filteredQuestions.length);
        setCardState('question');
        resetAnswers();
    };

    const prevCard = (): void => {
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
        const filteredQuestions = getFilteredQuestions();
        setCurrentCard((prev: number) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
        setCardState('question');
        resetAnswers();
    };

    const startAnswering = (): void => {
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
        setCardState('answering');

        // Инициализация для select_order
        if (currentQuestionData.type === 'select_order' && currentQuestionData.options) {
            setOrderedItems(currentQuestionData.options);
        }

        // Инициализация для fill_blanks
        if (currentQuestionData.type === 'fill_blanks' && currentQuestionData.blanks) {
            setFillBlanks(new Array(currentQuestionData.blanks.length).fill(''));
        }
    };

    const submitAnswer = (): void => {
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }

        const result = evaluateAnswer();
        setAnswerResults(prev => new Map(prev.set(filteredQuestions[currentCard].id, result)));
        setCardState('result');

        if (tg?.HapticFeedback) {
            if (result === 'correct') {
                tg.HapticFeedback.notificationOccurred('success');
            } else if (result === 'incorrect') {
                tg.HapticFeedback.notificationOccurred('error');
            } else {
                tg.HapticFeedback.notificationOccurred('warning');
            }
        }
    };

    const evaluateAnswer = (): AnswerResult => {
        const question = filteredQuestions[currentCard];

        switch (question.type) {
            case 'text': {
                if (!userAnswer.trim()) return 'incorrect';
                const correctText = question.correctAnswer as string;
                const userText = userAnswer.toLowerCase().trim();
                const correctTextLower = correctText.toLowerCase();

                if (userText === correctTextLower) return 'correct';
                if (userText.includes(correctTextLower) || correctTextLower.includes(userText)) return 'partial';
                return 'incorrect';
            }

            case 'multiple_choice':
                return selectedOptions[0] === question.correctAnswer ? 'correct' : 'incorrect';

            case 'true_false':
                return booleanAnswer === question.correctAnswer ? 'correct' : 'incorrect';

            case 'checkboxes': {
                const correctOptions = question.correctAnswer as string[];
                if (selectedOptions.length === correctOptions.length &&
                    selectedOptions.every(option => correctOptions.includes(option))) {
                    return 'correct';
                }
                if (selectedOptions.some(option => correctOptions.includes(option))) {
                    return 'partial';
                }
                return 'incorrect';
            }

            case 'select_order': {
                const correctOrder = question.correctAnswer as string[];
                if (JSON.stringify(orderedItems) === JSON.stringify(correctOrder)) {
                    return 'correct';
                }
                return 'incorrect';
            }

            case 'fill_blanks': {
                const correctBlanks = question.blanks as string[];
                let correctCount = 0;
                fillBlanks.forEach((blank, index) => {
                    if (blank.toLowerCase().trim() === correctBlanks[index].toLowerCase()) {
                        correctCount++;
                    }
                });

                if (correctCount === correctBlanks.length) return 'correct';
                if (correctCount > 0) return 'partial';
                return 'incorrect';
            }

            default:
                return 'incorrect';
        }
    };

    const resetCard = (): void => {
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
        setCardState('question');
        resetAnswers();
        setAnswerResults(prev => {
            const newMap = new Map(prev);
            newMap.delete(questions[currentCard].id);
            return newMap;
        });
    };

    const toggleOption = (option: string) => {
        if (currentQuestionData.type === 'multiple_choice') {
            setSelectedOptions([option]);
        } else if (currentQuestionData.type === 'checkboxes') {
            setSelectedOptions(prev =>
                prev.includes(option)
                    ? prev.filter(o => o !== option)
                    : [...prev, option]
            );
        }
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...orderedItems];
        if (direction === 'up' && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        } else if (direction === 'down' && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        }
        setOrderedItems(newItems);
    };

    const updateBlank = (index: number, value: string) => {
        const newBlanks = [...fillBlanks];
        newBlanks[index] = value;
        setFillBlanks(newBlanks);
    };

    const isAnswerComplete = () => {
        const question = currentQuestionData;
        switch (question.type) {
            case 'text':
                return userAnswer.trim().length > 0;
            case 'multiple_choice':
                return selectedOptions.length === 1;
            case 'true_false':
                return booleanAnswer !== null;
            case 'checkboxes':
                return selectedOptions.length > 0;
            case 'select_order':
                return true; // Всегда можно отправить
            case 'fill_blanks':
                return fillBlanks.every(blank => blank.trim().length > 0);
            default:
                return false;
        }
    };

    const filteredQuestions = getFilteredQuestions();
    const currentQuestionData: Question = filteredQuestions[currentCard];
    const currentResult = answerResults.get(currentQuestionData.id);

    const themeColors = tg?.themeParams || {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#2481cc',
        button_color: '#2481cc',
        button_text_color: '#ffffff',
        secondary_bg_color: '#f1f1f1',
        header_bg_color: '#ffffff'
    };

    const isDark = tg?.colorScheme === 'dark';

    const getResultColor = (result: AnswerResult | undefined) => {
        switch (result) {
            case 'correct':
                return '#4ade80';
            case 'partial':
                return '#fbbf24';
            case 'incorrect':
                return '#f87171';
            default:
                return themeColors.hint_color; // Handles both null and undefined
        }
    };

    const getResultIcon = (result: AnswerResult) => {
        switch (result) {
            case 'correct':
                return <Check className="w-4 h-4"/>;
            case 'partial':
                return <div className="w-4 h-4 rounded-full bg-current opacity-60"/>;
            case 'incorrect':
                return <X className="w-4 h-4"/>;
            default:
                return null;
        }
    };

    const renderQuestionContent = () => {
        const question = currentQuestionData;

        // Helper function to shuffle array
        const shuffleArray = (array: string[]) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        switch (question.type) {
            case 'text':
                return (
                    <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Ihre Antwort hier eingeben..."
                        className="w-full h-32 p-3 rounded-xl border resize-none text-sm"
                        style={{
                            backgroundColor: themeColors.bg_color,
                            borderColor: isDark ? '#333' : '#e1e5e9',
                            color: themeColors.text_color
                        }}
                    />
                );

            case 'multiple_choice': {
                const shuffledOptions = shuffleArray(question.options || []);
                return (
                    <div className="space-y-2">
                        {shuffledOptions.map((option) => (
                            <button
                                key={option} // Use option as key instead of index for stability
                                onClick={() => toggleOption(option)}
                                className={`w-full p-3 rounded-xl border text-left transition-all ${
                                    selectedOptions.includes(option) ? 'ring-2' : ''
                                }`}
                                style={{
                                    backgroundColor: selectedOptions.includes(option)
                                        ? themeColors.button_color + '20'
                                        : themeColors.bg_color,
                                    borderColor: selectedOptions.includes(option)
                                        ? themeColors.button_color
                                        : (isDark ? '#333' : '#e1e5e9'),
                                    color: themeColors.text_color
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                );
            }

            case 'true_false':
                return (
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => setBooleanAnswer(true)}
                            className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                                booleanAnswer === true ? 'ring-2' : ''
                            }`}
                            style={{
                                backgroundColor: booleanAnswer === true
                                    ? '#4ade80'
                                    : themeColors.bg_color,
                                borderColor: booleanAnswer === true
                                    ? '#4ade80'
                                    : (isDark ? '#333' : '#e1e5e9'),
                                color: booleanAnswer === true ? 'white' : themeColors.text_color
                            }}
                        >
                            Wahr
                        </button>
                        <button
                            onClick={() => setBooleanAnswer(false)}
                            className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                                booleanAnswer === false ? 'ring-2' : ''
                            }`}
                            style={{
                                backgroundColor: booleanAnswer === false
                                    ? '#f87171'
                                    : themeColors.bg_color,
                                borderColor: booleanAnswer === false
                                    ? '#f87171'
                                    : (isDark ? '#333' : '#e1e5e9'),
                                color: booleanAnswer === false ? 'white' : themeColors.text_color
                            }}
                        >
                            Falsch
                        </button>
                    </div>
                );

            case 'checkboxes': {
                const shuffledCheckboxOptions = shuffleArray(question.options || []);
                return (
                    <div className="space-y-2">
                        {shuffledCheckboxOptions.map((option) => (
                            <button
                                key={option} // Use option as key instead of index for stability
                                onClick={() => toggleOption(option)}
                                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                                    selectedOptions.includes(option) ? 'ring-2' : ''
                                }`}
                                style={{
                                    backgroundColor: selectedOptions.includes(option)
                                        ? themeColors.button_color + '20'
                                        : themeColors.bg_color,
                                    borderColor: selectedOptions.includes(option)
                                        ? themeColors.button_color
                                        : (isDark ? '#333' : '#e1e5e9'),
                                    color: themeColors.text_color
                                }}
                            >
                                <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                        selectedOptions.includes(option) ? '' : 'border-gray-300'
                                    }`}
                                    style={{
                                        borderColor: selectedOptions.includes(option)
                                            ? themeColors.button_color
                                            : undefined,
                                        backgroundColor: selectedOptions.includes(option)
                                            ? themeColors.button_color
                                            : 'transparent'
                                    }}
                                >
                                    {selectedOptions.includes(option) &&
                                        <Check className="w-3 h-3 text-white"/>
                                    }
                                </div>
                                {option}
                            </button>
                        ))}
                    </div>
                );
            }

            case 'select_order':
                // For select_order, we need to shuffle the initial items if they haven't been shuffled yet
                // This should be done when the question is first loaded, not on every render
                // Assuming orderedItems is already initialized with shuffled items
            {
                const displayOrderedItems = orderedItems.length > 0 ? orderedItems : shuffleArray(question.options || []);

                return (
                    <div className="space-y-2">
                        {displayOrderedItems.map((item, index) => (
                            <div
                                key={item} // Use item as key instead of index for stability
                                className="flex items-center gap-2 p-3 rounded-xl border"
                                style={{
                                    backgroundColor: themeColors.bg_color,
                                    borderColor: isDark ? '#333' : '#e1e5e9',
                                    color: themeColors.text_color
                                }}
                            >
                                <span className="font-bold text-sm">{index + 1}.</span>
                                <span className="flex-1">{item}</span>
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => moveItem(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1 rounded disabled:opacity-30"
                                        style={{color: themeColors.button_color}}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        onClick={() => moveItem(index, 'down')}
                                        disabled={index === displayOrderedItems.length - 1}
                                        className="p-1 rounded disabled:opacity-30"
                                        style={{color: themeColors.button_color}}
                                    >
                                        ↓
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }

            case 'fill_blanks': {
                const parts = question.question.split('___');
                return (
                    <div className="space-y-4">
                        <div className="text-lg leading-relaxed">
                            {parts.map((part, index) => (
                                <span key={index}>
                                    {part}
                                    {index < parts.length - 1 && (
                                        <input
                                            type="text"
                                            value={fillBlanks[index] || ''}
                                            onChange={(e) => updateBlank(index, e.target.value)}
                                            className="inline-block mx-1 px-2 py-1 border-b-2 border-blue-500 bg-transparent text-center min-w-[80px] focus:outline-none focus:border-blue-600"
                                            style={{
                                                color: themeColors.text_color,
                                                borderBottomColor: themeColors.button_color
                                            }}
                                            placeholder={`Lücke ${index + 1}`}
                                        />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            }

            default:
                return null;
        }
    };

    const renderResult = () => {
        const question = currentQuestionData;
        const result = currentResult;

        const resultTexts = {
            correct: '✅ Richtig!',
            partial: '⚠️ Teilweise richtig',
            incorrect: '❌ Falsch'
        };

        const resultText = result ? resultTexts[result] : '';

        return (
            <div className="space-y-4">
                <div
                    className="text-center p-4 rounded-xl font-medium text-lg"
                    style={{
                        backgroundColor: getResultColor(result) + '20',
                        color: getResultColor(result)
                    }}
                >
                    {resultText}
                </div>

                {question.explanation && (
                    <div
                        className="p-4 rounded-xl border-l-4"
                        style={{
                            backgroundColor: themeColors.secondary_bg_color,
                            borderLeftColor: themeColors.button_color,
                            color: themeColors.text_color
                        }}
                    >
                        <div className="font-medium mb-2">Erklärung:</div>
                        <div>{question.explanation}</div>
                    </div>
                )}

                {question.type === 'text' && (
                    <div
                        className="p-4 rounded-xl"
                        style={{
                            backgroundColor: themeColors.secondary_bg_color,
                            color: themeColors.text_color
                        }}
                    >
                        <div className="font-medium mb-2">Ihre Antwort:</div>
                        <div className="italic">{userAnswer}</div>
                        <div className="font-medium mt-3 mb-2">Richtige Antwort:</div>
                        <div>{question.correctAnswer as string}</div>
                    </div>
                )}

                {(question.type === 'checkboxes' || question.type === 'multiple_choice') && (
                    <div
                        className="p-4 rounded-xl"
                        style={{
                            backgroundColor: themeColors.secondary_bg_color,
                            color: themeColors.text_color
                        }}
                    >
                        <div className="font-medium mb-2">Richtige Antworten:</div>
                        <div className="space-y-1">
                            {(Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]).map((answer, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500"/>
                                    <span>{answer}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {question.type === 'fill_blanks' && (
                    <div
                        className="p-4 rounded-xl"
                        style={{
                            backgroundColor: themeColors.secondary_bg_color,
                            color: themeColors.text_color
                        }}
                    >
                        <div className="font-medium mb-2">Richtige Antworten:</div>
                        <div className="space-y-1">
                            {question.blanks?.map((blank, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="font-medium">Lücke {index + 1}:</span>
                                    <span
                                        className={fillBlanks[index]?.toLowerCase().trim() === blank.toLowerCase() ? 'text-green-500' : 'text-red-500'}
                                    >
                                        {fillBlanks[index] || '(leer)'}
                                    </span>
                                    <span>→</span>
                                    <span className="text-green-500">{blank}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className="min-h-screen p-4"
            style={{
                backgroundColor: themeColors.bg_color,
                color: themeColors.text_color,
            }}
        >
            {/* Header с адаптивным отображением индикаторов */}

            <div className="mt-20">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm" style={{color: themeColors.hint_color}}>
                        {currentCard + 1} / {filteredQuestions.length}
                    </div>
                </div>

                {/* Fortschrittsbalken */}
                <div
                    className="w-full h-2 rounded-full mb-4"
                    style={{backgroundColor: themeColors.secondary_bg_color}}
                >
                    <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${((currentCard + 1) / filteredQuestions.length) * 100}%`,
                            backgroundColor: themeColors.button_color
                        }}
                    />
                </div>

                {/* Индикаторы - адаптивное отображение */}
                <div className="mb-4">
                    {filteredQuestions.length <= 20 ? (
                        // Показываем все индикаторы для малого количества вопросов
                        <div className="flex gap-2 justify-center flex-wrap">
                            {filteredQuestions.map((_, index) => {
                                const questionResult = answerResults.get(questions[index].id);
                                return (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                                            index === currentCard ? `ring-2 ring-offset-1` : ''
                                        }`}
                                        style={{
                                            backgroundColor: questionResult ? getResultColor(questionResult) : 'transparent',
                                            borderColor: index === currentCard ? themeColors.button_color :
                                                questionResult ? getResultColor(questionResult) : themeColors.hint_color,
                                        }}
                                    >
                                        {questionResult && (
                                            <div style={{color: 'white', fontSize: '8px'}}>
                                                {getResultIcon(questionResult)}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // Упрощенный вид для большого количества вопросов
                        <div className="flex items-center justify-center gap-4">
                            {/* Статистика ответов */}
                            <div className="flex gap-3 text-xs">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full"
                                         style={{backgroundColor: getResultColor('correct')}}></div>
                                    <span style={{color: themeColors.hint_color}}>
                        {Array.from(answerResults.values()).filter(r => r === 'correct').length}
                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full"
                                         style={{backgroundColor: getResultColor('incorrect')}}></div>
                                    <span style={{color: themeColors.hint_color}}>
                        {Array.from(answerResults.values()).filter(r => r === 'incorrect').length}
                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full border-2"
                                         style={{borderColor: themeColors.hint_color}}></div>
                                    <span style={{color: themeColors.hint_color}}>
                        {filteredQuestions.length - answerResults.size}
                    </span>
                                </div>
                            </div>

                            {/* Мини-индикатор текущей позиции */}
                            <div className="flex items-center gap-1">
                                {[...Array(Math.min(5, filteredQuestions.length))].map((_, i) => {
                                    const actualIndex = Math.floor(currentCard / filteredQuestions.length * 5);
                                    return (
                                        <div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{
                                                backgroundColor: i === actualIndex ? themeColors.button_color : themeColors.hint_color,
                                                opacity: i === actualIndex ? 1 : 0.3
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Дропбокс категорий */}
            <div className="mb-4 relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border"
                    style={{
                        backgroundColor: themeColors.bg_color,
                        borderColor: isDark ? '#333' : '#e1e5e9',
                        color: themeColors.text_color
                    }}
                >
                    <span>{selectedCategory === 'all' ? 'Alle Kategorien' : selectedCategory}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isDropdownOpen && (
                    <div
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg z-10 max-h-48 overflow-y-auto"
                        style={{
                            backgroundColor: themeColors.bg_color,
                            borderColor: isDark ? '#333' : '#e1e5e9'
                        }}
                    >
                        {getCategories().map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className="w-full text-left p-3 hover:opacity-80 transition-opacity first:rounded-t-xl last:rounded-b-xl"
                                style={{
                                    backgroundColor: selectedCategory === category ? themeColors.button_color + '20' : 'transparent',
                                    color: themeColors.text_color
                                }}
                            >
                                {category === 'all' ? 'Alle Kategorien' : category}
                                {selectedCategory === category && (
                                    <span className="float-right">
                        <Check className="w-4 h-4" style={{color: themeColors.button_color}}/>
                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {/* Hauptkarte */}
            <div
                className="rounded-2xl shadow-lg p-6 mb-6 max-h-130"
                style={{
                    backgroundColor: isFlipped ? '#f8fafc' : themeColors.header_bg_color,
                    border: `1px solid ${isDark ? '#333' : '#e1e5e9'}`,
                    overflow: 'auto',
                    cursor: 'pointer',
                    transform: isFlipped ? 'rotateY(180deg) scaleX(-1)' : 'rotateY(0deg)',
                    transition: 'transform 0.5s',
                    transformStyle: 'preserve-3d'
                }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {!isFlipped ? (
                    <>
                        {/* Kategorie und Icon */}
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="p-2 rounded-xl"
                                style={{
                                    backgroundColor: themeColors.button_color + '20',
                                    color: themeColors.button_color
                                }}
                            >
                                {currentQuestionData.icon}
                            </div>
                            <div>
                                <div
                                    className="text-sm font-medium uppercase tracking-wide"
                                    style={{color: themeColors.hint_color}}
                                >
                                    {currentQuestionData.category}
                                </div>
                                <div className="text-lg font-bold">
                                    Frage {currentCard + 1}
                                </div>
                            </div>
                        </div>

                        {/* Frage */}
                        <div className="mb-6">
                            <h2 className="text-lg font-medium leading-relaxed">
                                {currentQuestionData.question}
                            </h2>
                        </div>

                        {/* Inhalt je nach Status */}
                        {cardState === 'question' && (
                            <div className="text-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startAnswering();
                                    }}
                                    className="px-8 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
                                    style={{backgroundColor: themeColors.button_color}}
                                >
                                    Antworten
                                </button>
                            </div>
                        )}

                        {cardState === 'answering' && (
                            <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                                {renderQuestionContent()}

                                <div className="flex gap-3 justify-center pt-4">
                                    <button
                                        onClick={() => setCardState('question')}
                                        className="px-6 py-2 rounded-xl border font-medium"
                                        style={{
                                            borderColor: themeColors.hint_color,
                                            color: themeColors.hint_color
                                        }}
                                    >
                                        Zurück
                                    </button>
                                    <button
                                        onClick={submitAnswer}
                                        disabled={!isAnswerComplete()}
                                        className="px-6 py-2 rounded-xl font-medium text-white disabled:opacity-50 transition-all"
                                        style={{backgroundColor: themeColors.button_color}}
                                    >
                                        Bestätigen
                                    </button>
                                </div>
                            </div>
                        )}

                        {cardState === 'result' && (
                            <div onClick={(e) => e.stopPropagation()}>
                                {renderResult()}

                                <div className="flex gap-3 justify-center pt-6">
                                    <button
                                        onClick={resetCard}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border"
                                        style={{
                                            borderColor: themeColors.hint_color,
                                            color: themeColors.hint_color
                                        }}
                                    >
                                        <RotateCcw className="w-4 h-4"/>
                                        Wiederholen
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <p className="text-base leading-relaxed">
                            {currentQuestionData.rusExplanation}
                        </p>
                    </div>
                )}
            </div>

            {/* Адаптивная навигация */}
            <div
                className={`fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 rounded-full bottom-4 left-1/2 transition-all duration-300 ${
                    isKeyboardVisible
                        ? 'opacity-0 pointer-events-none transform translate-y-full'
                        : 'opacity-100 pointer-events-auto transform translate-y-0'
                }`}
            >
                <div className="grid h-full max-w-lg grid-cols-2 mx-auto gap-5">
                    {/* Левая кнопка - динамически меняется */}
                    <button
                        type="button"
                        className="flex items-center justify-center text-sm font-medium transition-colors duration-200 rounded-l-full hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[themeColors.link_color]"
                        style={{color: 'inherit'}}
                        onClick={() => {
                            if (cardState === 'answering') {
                                setCardState('question');
                            } else {
                                prevCard();
                            }
                        }}
                        disabled={isKeyboardVisible}
                    >
                    <span
                        className="inline-flex items-center justify-center w-30 h-10 px-4 rounded-full"
                        style={{
                            backgroundColor: themeColors.button_color,
                            color: themeColors.button_text_color,
                        }}
                    >
                        Zurück
                    </span>
                    </button>

                    {/* Правая кнопка - динамически меняется */}
                    <button
                        type="button"
                        className="flex items-center justify-center text-sm font-medium transition-colors duration-200 rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[themeColors.link_color]"
                        style={{color: 'inherit'}}
                        onClick={() => {
                            if (cardState === 'answering') {
                                if (isAnswerComplete()) {
                                    submitAnswer();
                                }
                            } else {
                                nextCard();
                            }
                        }}
                        disabled={isKeyboardVisible || (cardState === 'answering' && !isAnswerComplete())}
                    >
                    <span
                        className="inline-flex items-center justify-center w-30 h-10 px-4 rounded-full"
                        style={{
                            backgroundColor: (cardState === 'answering' && !isAnswerComplete())
                                ? themeColors.hint_color
                                : themeColors.button_color,
                            color: themeColors.button_text_color,
                        }}
                    >
                        {cardState === 'answering' ? 'Bestätigen' : 'Weiter'}
                    </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InformationManagementCards;