import React from 'react';
import {BookOpen, Settings, Target, Eye, Zap, Network, Database, Shield, Users, Cog, FileText, Calendar} from 'lucide-react';

export interface Question {
    id: number;
    category: string;
    type: 'text' | 'checkboxes' | 'fill_blanks' | 'multiple_choice' | 'true_false' | 'select_order';
    question: string;
    options?: string[];
    correctAnswer: string | string[] | boolean;
    blanks?: string[];
    explanation?: string;
    icon: React.ReactNode;
    rusExplanation?: string;
}

export const informationsmanagement_questions: Question[] = [
    {
        id: 1,
        category: 'informationsmanagement',
        type: 'text',
        question: 'Was ist Informationsmanagement? (Geben Sie eine Definition)',
        correctAnswer: 'Aktivitäten zur betrieblichen Informationsverarbeitung',
        explanation: 'Informationsmanagement umfasst alle Aktivitäten zur betrieblichen Informationsverarbeitung.',
        icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
        rusExplanation: "Информационное управление (Informationsmanagement) — это комплекс процессов и мероприятий, направленных на организацию, обработку и использование информации в компании. Оно включает управление данными, информацией и знаниями, а также связанными с ними технологиями, системами и процессами для достижения целей организации. Это не только технические аспекты, но и стратегическое планирование, координация персонала и оптимизация информационных потоков."
    },
    {
        id: 2,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche Bestandteile werden im Informationsmanagement bearbeitet? (Wählen Sie alle zutreffenden)',
        options: ['Personal', 'Daten, Informationen, Wissen', 'Anwendungssysteme', 'Technik', 'Innere Organisation', 'Papiere', 'Marketing', 'Verkauf'],
        correctAnswer: ['Personal', 'Daten, Informationen, Wissen', 'Anwendungssysteme', 'Technik', 'Innere Organisation', 'Papiere'],
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "В информационном управлении обрабатываются различные компоненты, необходимые для эффективной работы организации. Это включает персонал (людей, работающих с информацией), данные, информацию и знания (основные объекты управления), прикладные системы (программное обеспечение), технику (аппаратное обеспечение), внутреннюю организацию (структуры и процессы) и бумажные документы (традиционные носители информации). Эти элементы взаимодействуют для обеспечения информационных потребностей компании."
    },
    {
        id: 3,
        category: 'informationsmanagement',
        type: 'fill_blanks',
        question: 'Die Informationslogistik stellt Daten zur ___ Zeit, am ___ Ort, in der ___ Menge, im ___ Format, den ___ Personen zur Verfügung.',
        correctAnswer: ['richtigen', 'richtigen', 'korrekten', 'richtigen', 'berechtigten'],
        blanks: ['richtigen', 'richtigen', 'korrekten', 'richtigen', 'berechtigten'],
        explanation: 'Die Informationslogistik sorgt für die richtige Information zur richtigen Zeit am richtigen Ort.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Информационная логистика — это процесс обеспечения правильной информации в нужное время, в нужном месте, в правильном объеме, формате и для уполномоченных лиц. Это означает, что данные должны быть доступны вовремя, в подходящем виде и только тем, кто имеет право их использовать, чтобы поддерживать эффективные бизнес-процессы."
    },
    {
        id: 4,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche strategischen Aufgaben hat das Informationsmanagement? (Mehrfachauswahl)',
        options: [
            'Architektur-/Rahmenkonzeptplanung',
            'Planung der Informationsarchitektur',
            'Situationsanalyse',
            'Zielplanung',
            'Strategie-Entwicklung',
            'Strategische Maßnahmenplanung',
            'Qualitätsmanagement, Controlling, Revision',
            'Täglicher Betrieb'
        ],
        correctAnswer: [
            'Architektur-/Rahmenkonzeptplanung',
            'Planung der Informationsarchitektur',
            'Situationsanalyse',
            'Zielplanung',
            'Strategie-Entwicklung',
            'Strategische Maßnahmenplanung',
            'Qualitätsmanagement, Controlling, Revision'
        ],
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Стратегические задачи информационного управления охватывают долгосрочное планирование и управление информационными системами. Это включает разработку концепции архитектуры, анализ текущей ситуации, определение целей, разработку стратегий, планирование стратегических мер и контроль качества. Эти задачи направлены на создание устойчивой и эффективной информационной инфраструктуры, исключая повседневные операционные функции."
    },
    {
        id: 5,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Was ist der Hauptgegenstand der taktischen Aufgaben im Informationsmanagement?',
        options: ['Täglicher Betrieb', 'Projektmanagement', 'Strategieplanung', 'Wartung'],
        correctAnswer: 'Projektmanagement',
        explanation: 'Taktische Aufgaben haben als Hauptgegenstand das Projektmanagement.',
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Тактические задачи в информационном управлении сосредоточены на реализации стратегических целей через конкретные проекты. Главной задачей является управление проектами, что включает планирование, выполнение и контроль проектов, связанных с внедрением или улучшением информационных систем, а не повседневные операции или обслуживание."
    },
    {
        id: 6,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche Bereiche gehören zu den taktischen Aufgaben? (Mehrfachauswahl)',
        options: [
            'Projektmanagement',
            'Lebenszyklusmanagement',
            'Datenmanagement',
            'Personalmanagement',
            'Sicherheitsmanagement',
            'Katastrophenmanagement',
            'Vertragsmanagement',
            'Strategieentwicklung'
        ],
        correctAnswer: [
            'Projektmanagement',
            'Lebenszyklusmanagement',
            'Datenmanagement',
            'Personalmanagement',
            'Sicherheitsmanagement',
            'Katastrophenmanagement',
            'Vertragsmanagement'
        ],
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "К тактическим задачам относятся процессы, которые обеспечивают выполнение стратегических планов через конкретные действия. Это включает управление проектами, жизненным циклом систем, данными, персоналом, безопасностью, катастрофами и контрактами. Эти области помогают организовать и поддерживать работу информационных систем на практическом уровне."
    },
    {
        id: 7,
        category: 'informationsmanagement',
        type: 'true_false',
        question: 'Operative Aufgaben umfassen nur den täglichen Betrieb und Nutzung von Systemen.',
        correctAnswer: false,
        explanation: 'Operative Aufgaben umfassen neben dem täglichen Betrieb auch Wartung und Ressourcenmanagement.',
        icon: React.createElement(Zap, {className: "w-8 h-8"}),
        rusExplanation: "Оперативные задачи в информационном управлении включают не только ежедневное использование и функционирование систем, но и их обслуживание (например, обновления и ремонт) и управление ресурсами (например, распределение серверов или лицензий). Это более широкий спектр задач, чем просто ежедневная эксплуатация."
    },
    {
        id: 8,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Was gehört zu den operativen Aufgaben? (Wählen Sie alle zutreffenden)',
        options: [
            'Täglicher Betrieb und Nutzung',
            'Wartung',
            'Ressourcenmanagement',
            'Strategieplanung',
            'Projektplanung'
        ],
        correctAnswer: ['Täglicher Betrieb und Nutzung', 'Wartung', 'Ressourcenmanagement'],
        icon: React.createElement(Zap, {className: "w-8 h-8"}),
        rusExplanation: "Оперативные задачи охватывают повседневные процессы, необходимые для поддержания работы информационных систем. Это включает ежедневное использование систем, их техническое обслуживание и управление ресурсами, такими как серверы или программное обеспечение, но не включает стратегическое или проектное планирование."
    },
    {
        id: 9,
        category: 'informationsmanagement',
        type: 'text',
        question: 'Was beinhaltet die Planung im Informationsmanagement?',
        correctAnswer: 'Umsetzung der strategischen Vorgaben der Planung durch Realisierung von Teilen des Informationssystems',
        explanation: 'Planung setzt strategische Vorgaben um und erzeugt ein aufgebautes Informationssystem.',
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Планирование в информационном управлении — это процесс реализации стратегических целей путем создания или улучшения частей информационной системы. Это включает разработку планов, которые определяют, как информационные технологии и процессы будут поддерживать цели организации в среднесрочной и долгосрочной перспективе."
    },
    {
        id: 10,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Was ist das Hauptziel der Überwachung im Informationsmanagement?',
        options: [
            'Neue Systeme entwickeln',
            'Kontinuierliche Kontrolle und Optimierung',
            'Strategien planen',
            'Personal schulen'
        ],
        correctAnswer: 'Kontinuierliche Kontrolle und Optimierung',
        explanation: 'Überwachung sorgt für kontinuierliche Kontrolle und Optimierung der Informationssysteme.',
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Основная цель мониторинга в информационном управлении — это постоянный контроль и оптимизация работы информационных систем. Это включает отслеживание производительности, выявление проблем и внесение улучшений для обеспечения стабильной и эффективной работы систем."
    },
    {
        id: 11,
        category: 'informationsmanagement',
        type: 'text',
        question: 'Was ist ein Informationssystem? (Definition)',
        correctAnswer: 'Ein sozio-technisches Subsystem einer Organisation, das alle informationsverarbeitenden Prozesse umfasst',
        explanation: 'Ein Informationssystem ist ein sozio-technisches Subsystem, das alle informationsverarbeitenden Prozesse einer Organisation umfasst.',
        icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
        rusExplanation: "Информационная система — это подсистема организации, которая объединяет все процессы обработки информации. Она включает в себя не только технические компоненты (например, компьютеры и программное обеспечение), но и социальные аспекты (людей, работающих с информацией), образуя сложную систему для управления информационными потоками."
    },
    {
        id: 12,
        category: 'informationsmanagement',
        type: 'select_order',
        question: 'Ordnen Sie die Komponenten eines Informationssystems in der richtigen Reihenfolge:',
        options: [
            'Alle informationsverarbeitenden Prozesse',
            'Alle konventionellen und elektronischen Datenträger',
            'Alle menschlichen und maschinellen Handlungsträger'
        ],
        correctAnswer: [
            'Alle informationsverarbeitenden Prozesse',
            'Alle konventionellen und elektronischen Datenträger',
            'Alle menschlichen und maschinellen Handlungsträger'
        ],
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Компоненты информационной системы включают процессы обработки информации (например, сбор и анализ данных), носители информации (бумажные и электронные) и участников (людей и машины, выполняющих действия). Их правильная последовательность важна для понимания структуры системы."
    },
    {
        id: 13,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Wie wird ein Informationssystem eingeteilt?',
        options: [
            'Hardware und Software',
            'Rechnergestützter und nicht-rechnergestützter Teil',
            'Interne und externe Systeme',
            'Zentrale und dezentrale Systeme'
        ],
        correctAnswer: 'Rechnergestützter und nicht-rechnergestützter Teil',
        explanation: 'Ein Informationssystem wird in rechnergestützte (z.B. ERP-System) und nicht-rechnergestützte Teile (z.B. Formulare) eingeteilt.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Информационные системы делятся на две основные части: компьютерные (например, системы управления предприятием, такие как ERP) и некомпьютерные (например, бумажные формы или ручные процессы). Это деление отражает разнообразие методов обработки информации в организации."
    },
    {
        id: 14,
        category: 'informationsmanagement',
        type: 'fill_blanks',
        question: 'Management umfasst ___, ___ und ___ sowie moderne Verwirklichung notwendiger Aufgaben eines Unternehmens, die nicht ___ Art sind.',
        correctAnswer: ['Ziele', 'Struktur', 'Handlungswesen', 'ausführender'],
        blanks: ['Ziele', 'Struktur', 'Handlungswesen', 'ausführender'],
        explanation: 'Management umfasst Ziele, Struktur und Handlungswesen - alle nicht-ausführenden Aufgaben.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Управление (менеджмент) включает определение целей (что нужно достичь), структуры (как организовать процессы) и действий (как выполнять задачи). Оно фокусируется на стратегических и тактических задачах, а не на исполнительских функциях, таких как непосредственное выполнение операций."
    },
    {
        id: 15,
        category: 'informationsmanagement',
        type: 'true_false',
        question: 'Informationsmanagement beinhaltet nur die Verarbeitung elektronischer Daten.',
        correctAnswer: false,
        explanation: 'Informationsmanagement umfasst sowohl elektronische als auch konventionelle Datenträger.',
        icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
        rusExplanation: "Информационное управление (Informationsmanagement) охватывает не только обработку электронных данных, таких как базы данных или цифровые документы, но и работу с традиционными носителями информации, например бумажными документами, архивами или другими нецифровыми форматами. Это делает его комплексным процессом, включающим как цифровые, так и аналоговые методы управления информацией, обеспечивая их интеграцию для достижения целей организации."
    },
    {
        id: 16,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Welche der folgenden ist eine Hauptaufgabe des Informationsmanagements?',
        options: ['Täglicher Betrieb', 'Zielbestimmung', 'Wartung von Hardware', 'Personalrekrutierung'],
        correctAnswer: 'Zielbestimmung',
        explanation: 'Zielbestimmung ist eine zentrale Aufgabe des Informationsmanagements.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Основная задача информационного управления — это определение целей (Zielbestimmung), которые задают направление для всех процессов и систем, связанных с информацией. Это стратегический процесс, который включает постановку целей для информационных систем, чтобы они поддерживали общие бизнес-цели компании, в отличие от таких задач, как техническое обслуживание, обучение персонала или повседневные операции."
    },
    {
        id: 17,
        category: 'informationsmanagement',
        type: 'fill_blanks',
        question: 'Das Informationssystem umfasst alle ___ und ___ Datenträger sowie ___ und ___ Handlungsträger.',
        correctAnswer: ['konventionellen', 'elektronischen', 'menschlichen', 'maschinellen'],
        blanks: ['konventionellen', 'elektronischen', 'menschlichen', 'maschinellen'],
        explanation: 'Ein Informationssystem beinhaltet alle Datenträger und Handlungsträger dieser Art.',
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Информационная система включает все виды носителей данных — как традиционные (например, бумажные документы), так и электронные (например, цифровые базы данных), а также всех участников, обрабатывающих информацию, включая людей (menschliche Handlungsträger) и машины (maschinelle Handlungsträger). Это определение подчеркивает, что система объединяет разнообразные элементы для эффективной обработки информации."
    },
    {
        id: 18,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche Elemente sind Teil der Informationslogistik? (Mehrfachauswahl)',
        options: ['Richtige Zeit', 'Falscher Ort', 'Korrekte Menge', 'Unberechtigte Personen', 'Richtiges Format'],
        correctAnswer: ['Richtige Zeit', 'Korrekte Menge', 'Richtiges Format'],
        explanation: 'Informationslogistik stellt Daten zur richtigen Zeit, in der korrekten Menge und im richtigen Format bereit.',
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Информационная логистика отвечает за предоставление данных в нужное время (richtige Zeit), в правильном количестве (korrekte Menge) и в подходящем формате (richtiges Format). Это исключает такие аспекты, как предоставление данных в неподходящем месте или неуполномоченным лицам, так как это противоречит целям логистики, направленным на точность и эффективность информационных потоков."
    },
    {
        id: 19,
        category: 'informationsmanagement',
        type: 'select_order',
        question: 'Ordnen Sie die Schritte der Zielbestimmung im Management in der richtigen Reihenfolge:',
        options: ['Ziele festlegen', 'Struktur planen', 'Handlungswesen definieren', 'Ergebnisse überprüfen'],
        correctAnswer: ['Ziele festlegen', 'Struktur planen', 'Handlungswesen definieren', 'Ergebnisse überprüfen'],
        explanation: 'Die Zielbestimmung folgt dieser logischen Abfolge.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Определение целей в управлении (Zielbestimmung) следует строгой последовательности: сначала устанавливаются цели (Ziele festlegen), затем планируется структура (Struktur planen), определяются действия (Handlungswesen definieren), и, наконец, проверяются результаты (Ergebnisse überprüfen). Этот порядок обеспечивает логический и системный подход к управлению информационными процессами."
    },
    {
        id: 20,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Welche inhaltlichen Ziele verfolgt das Informationsmanagement?',
        options: [
            'Nur Aufbau globaler Netzwerke',
            'Aufbau globaler Netzwerke, Sicherheit der IT, schnelle Änderung der IT',
            'Nur IT-Sicherheit',
            'Nur schnelle Systemänderungen'
        ],
        correctAnswer: 'Aufbau globaler Netzwerke, Sicherheit der IT, schnelle Änderung der IT',
        explanation: 'Die inhaltlichen Ziele umfassen Aufbau globaler Netzwerke, Sicherheit der IT und schnelle Änderung der IT.',
        icon: React.createElement(Network, {className: "w-8 h-8"}),
        rusExplanation: "Содержательные цели информационного управления включают создание глобальных сетей для обмена данными (Aufbau globaler Netzwerke), обеспечение безопасности информационных технологий (Sicherheit der IT) и возможность быстрого изменения ИТ-систем (schnelle Änderung der IT) для адаптации к новым требованиям. Эти цели направлены на повышение конкурентоспособности и устойчивости организации в условиях цифровой трансформации."
    },
    {
        id: 21,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche Methoden werden im Informationsmanagement eingesetzt? (Mehrfachauswahl)',
        options: [
            'Systemdenken',
            'Leistungsdenken',
            'Kostendenken',
            'Zeitdenken',
            'Qualitätsdenken'
        ],
        correctAnswer: [
            'Systemdenken',
            'Leistungsdenken',
            'Kostendenken'
        ],
        explanation: 'Systemdenken, Leistungsdenken und Kostendenken sind die Hauptmethoden im Informationsmanagement.',
        icon: React.createElement(Cog, {className: "w-8 h-8"}),
        rusExplanation: "В информационном управлении применяются такие методы, как системное мышление (Systemdenken), которое рассматривает систему в целом, мышление производительности (Leistungsdenken), направленное на оптимизацию эффективности процессов, и мышление затрат (Kostendenken), ориентированное на минимизацию расходов. Эти подходы помогают эффективно управлять информационными ресурсами и достигать стратегических целей."
    },
    {
        id: 22,
        category: 'informationsmanagement',
        type: 'text',
        question: 'Was bedeutet "Systemdenken" im Kontext des Informationsmanagements?',
        correctAnswer: 'Alle Elemente und ihr Zusammenwirken betrachten',
        explanation: 'Systemdenken bedeutet, alle Elemente eines Systems und deren Zusammenwirken ganzheitlich zu betrachten.',
        icon: React.createElement(Network, {className: "w-8 h-8"}),
        rusExplanation: "Системное мышление (Systemdenken) в контексте информационного управления означает целостный подход к анализу всех элементов системы — людей, технологий, процессов — и их взаимодействий. Это позволяет понять, как изменения в одной части системы влияют на другие, обеспечивая комплексное управление информационными потоками."
    },
    {
        id: 23,
        category: 'informationsmanagement',
        type: 'fill_blanks',
        question: 'Strategische Formalziele im Informationsmanagement sind ___, ___, ___ und ___.',
        correctAnswer: ['Wirksamkeit', 'Produktivität', 'Wirtschaftlichkeit', 'Durchringung'],
        blanks: ['Wirksamkeit', 'Produktivität', 'Wirtschaftlichkeit', 'Durchringung'],
        explanation: 'Die vier strategischen Formalziele sind Wirksamkeit, Produktivität, Wirtschaftlichkeit und Durchringung.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Стратегические формальные цели информационного управления включают эффективность (Wirksamkeit) — достижение желаемых результатов, производительность (Produktivität) — оптимизацию процессов, экономичность (Wirtschaftlichkeit) — снижение затрат и проникание (Durchringung) — обеспечение безопасности и надежности системы. Эти цели формируют основу успешного управления информацией."
    },
    {
        id: 24,
        category: 'informationsmanagement',
        type: 'true_false',
        question: 'Das Informationssystem besteht nur aus rechnergestützten Teilen wie ERP-Systemen.',
        correctAnswer: false,
        explanation: 'Das Informationssystem besteht sowohl aus rechnergestützten Teilen (z.B. ERP-System) als auch aus nicht-rechnergestützten Teilen (z.B. Formulare).',
        icon: React.createElement(Database, {className: "w-8 h-8"}),
        rusExplanation: "Информационная система состоит не только из компьютерных компонентов, таких как системы управления предприятием (ERP-Systeme), но и из некомпьютерных элементов, таких как бумажные формы или ручные процессы. Это делает её комплексной, охватывающей как цифровые, так и аналоговые методы обработки информации."
    },
    {
        id: 25,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Was ist ein Beispiel für einen nicht-rechnergestützten Teil des Informationssystems?',
        options: ['ERP-System', 'Formulare', 'Datenbank', 'Software'],
        correctAnswer: 'Formulare',
        explanation: 'Formulare sind ein typisches Beispiel für nicht-rechnergestützte Teile des Informationssystems.',
        icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
        rusExplanation: "Некомпьютерные части информационной системы — это элементы, которые не зависят от компьютерных технологий, например бумажные формы (Formulare), используемые для записи данных или документооборота. Они отличаются от цифровых компонентов, таких как базы данных или программное обеспечение, и играют важную роль в традиционных процессах."
    },
    {
        id: 26,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche Aspekte umfasst das Einsatz von IT zur Steigerung des Unternehmenserfolgs? (Mehrfachauswahl)',
        options: [
            'Unterstützung von Schwerpunktprozessen',
            'Erleichterung wiederkehrender Tätigkeiten',
            'Personalabbau',
            'Kostenreduzierung',
            'Qualitätssteigerung'
        ],
        correctAnswer: [
            'Unterstützung von Schwerpunktprozessen',
            'Erleichterung wiederkehrender Tätigkeiten'
        ],
        explanation: 'IT wird eingesetzt zur Unterstützung von Schwerpunktprozessen und Erleichterung wiederkehrender Tätigkeiten.',
        icon: React.createElement(Zap, {className: "w-8 h-8"}),
        rusExplanation: "Использование информационных технологий (ИТ) для повышения успеха компании включает поддержку ключевых процессов (Schwerpunktprozesse), таких как производство или логистика, и упрощение повторяющихся задач (wiederkehrende Tätigkeiten), например автоматизацию отчетности. Эти аспекты направлены на повышение эффективности, а не на сокращение персонала или другие несвязанные цели."
    },
    {
        id: 27,
        category: 'informationsmanagement',
        type: 'text',
        question: 'Welche Zeitspanne wird für die Entwicklung des Informationssystems in der strategischen Planung betrachtet?',
        correctAnswer: 'Die nächsten 3-5 Jahre',
        explanation: 'Der Plan zeigt, wie sich das Informationssystem in den nächsten 3-5 Jahren entwickelt.',
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Стратегическое планирование информационной системы рассматривает её развитие на среднесрочную перспективу, обычно на 3–5 лет. Это включает прогнозирование потребностей в технологиях, ресурсах и процессах, чтобы обеспечить соответствие системы долгосрочным целям организации."
    },
    {
        id: 28,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Was sorgt die Steuerung im Informationsmanagement?',
        options: [
            'Entwicklung neuer Strategien',
            'Ein laufendes Informationssystem',
            'Personalschulung',
            'Kostensenkung'
        ],
        correctAnswer: 'Ein laufendes Informationssystem',
        explanation: 'Die Steuerung sorgt für ein laufendes Informationssystem durch kontinuierliche Überwachung und Anpassung.',
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Управление (Steuerung) в информационном менеджменте обеспечивает непрерывную работу информационной системы (laufendes Informationssystem) через постоянный мониторинг, контроль и корректировку процессов. Это не связано с разработкой новых стратегий или обучением персонала, а фокусируется на поддержании стабильности и эффективности системы."
    },
    {
        id: 29,
        category: 'informationsmanagement',
        type: 'fill_blanks',
        question: 'Das generelle Sachziel des Informationsmanagements ist die ___ der strategischen Ziele der Organisation durch ___ der kritischen Wettbewerbsfaktoren.',
        correctAnswer: ['Unterstützung', 'Fokus'],
        blanks: ['Unterstützung', 'Fokus'],
        explanation: 'Das Sachziel ist die Unterstützung strategischer Ziele durch Fokus auf kritische Wettbewerbsfaktoren.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Общая содержательная цель информационного управления заключается в поддержке стратегических целей организации (Unterstützung der strategischen Ziele) через акцент на критически важные факторы конкуренции (Fokus der kritischen Wettbewerbsfaktoren). Это означает, что информационные системы должны способствовать достижению конкурентных преимуществ, таких как скорость, качество или инновации."
    },
    {
        id: 30,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Was umfasst die informationsverarbeitende Rolle der Handlungsträger? (Mehrfachauswahl)',
        options: [
            'Menschliche Handlungsträger',
            'Maschinelle Handlungsträger',
            'Externe Berater',
            'Kunden',
            'Lieferanten'
        ],
        correctAnswer: [
            'Menschliche Handlungsträger',
            'Maschinelle Handlungsträger'
        ],
        explanation: 'Handlungsträger umfassen sowohl menschliche als auch maschinelle Akteure in ihrer informationsverarbeitenden Rolle.',
        icon: React.createElement(Users, {className: "w-8 h-8"}),
        rusExplanation: "Информационная роль участников (Handlungsträger) включает как людей (menschliche Handlungsträger), например сотрудников, работающих с данными, так и машины (maschinelle Handlungsträger), такие как серверы или автоматизированные системы. Эти участники совместно обрабатывают информацию, исключая внешних акторов, таких как консультанты или клиенты, которые не являются частью системы."
    },
    {
        id: 31,
        category: 'informationsmanagement',
        type: 'true_false',
        question: 'Leistungsdenken bezieht sich nur auf die Informationsfunktion in Bezug auf Leistung und Arbeit/Zeit.',
        correctAnswer: true,
        explanation: 'Leistungsdenken ist spezifisch auf die Informationsfunktion in Bezug auf Leistung = Arbeit/Zeit ausgerichtet.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Мышление производительности (Leistungsdenken) в информационном управлении сосредоточено на эффективности информационных процессов, где эффективность измеряется как отношение выполненной работы к затраченному времени (Leistung = Arbeit/Zeit). Этот подход оценивает, насколько быстро и качественно выполняются задачи, связанные с обработкой информации, например, насколько оперативно система обрабатывает запросы или генерирует отчеты."
    },
    {
        id: 32,
        category: 'informationsmanagement',
        type: 'multiple_choice',
        question: 'Was ist der Fokus des Kostendenken-Ansatzes im Informationsmanagement?',
        options: [
            'Nur Personalkosten',
            'Nur Hardwarekosten',
            'Erreichen der strategischen Ziele zu den geringstmöglichen Kosten',
            'Nur Softwarekosten'
        ],
        correctAnswer: 'Erreichen der strategischen Ziele zu den geringstmöglichen Kosten',
        explanation: 'Kostendenken zielt darauf ab, strategische Ziele mit minimalen Kosten zu erreichen.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Мышление затрат (Kostendenken) в информационном управлении направлено на достижение стратегических целей организации с минимальными финансовыми затратами (geringstmögliche Kosten). Это не ограничивается только затратами на персонал, оборудование или программное обеспечение, а включает комплексный подход к оптимизации всех ресурсов, чтобы обеспечить экономичность при сохранении качества и эффективности."
    },
    {
        id: 33,
        category: 'informationsmanagement',
        type: 'select_order',
        question: 'Ordnen Sie die Managementaufgaben in der richtigen hierarchischen Reihenfolge:',
        options: [
            'Ziele',
            'Struktur',
            'Handlungswesen'
        ],
        correctAnswer: [
            'Ziele',
            'Struktur',
            'Handlungswesen'
        ],
        explanation: 'Management folgt der Hierarchie: Ziele bestimmen die Struktur, Struktur bestimmt das Handlungswesen.',
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Задачи управления (Managementaufgaben) в информационном менеджменте следуют строгой иерархической последовательности: сначала определяются цели (Ziele), которые задают направление деятельности, затем планируется структура (Struktur), поддерживающая эти цели, и, наконец, определяются действия (Handlungswesen), которые реализуют планы. Этот порядок обеспечивает логическую связь между уровнями управления и их последовательное выполнение."
    },
    {
        id: 34,
        category: 'informationsmanagement',
        type: 'checkboxes',
        question: 'Welche Elemente sind für die Sicherheit der IT relevant? (Mehrfachauswahl)',
        options: [
            'Datenschutz',
            'Systemverfügbarkeit',
            'Zugriffskontrolle',
            'Marketing',
            'Vertrieb',
            'Backup-Strategien'
        ],
        correctAnswer: [
            'Datenschutz',
            'Systemverfügbarkeit',
            'Zugriffskontrolle',
            'Backup-Strategien'
        ],
        explanation: 'IT-Sicherheit umfasst Datenschutz, Systemverfügbarkeit, Zugriffskontrolle und Backup-Strategien.',
        icon: React.createElement(Shield, {className: "w-8 h-8"}),
        rusExplanation: "Безопасность информационных технологий (IT-Sicherheit) включает ключевые элементы, такие как защита данных (Datenschutz) от несанкционированного доступа, обеспечение доступности системы (Systemverfügbarkeit) для бесперебойной работы, контроль доступа (Zugriffskontrolle) для ограничения прав пользователей и стратегии резервного копирования (Backup-Strategien) для восстановления данных в случае сбоев. Эти аспекты исключают несвязанные области, такие как маркетинг или продажи, и фокусируются на защите и надежности системы."
    },
    {
        id: 35,
        category: 'informationsmanagement',
        type: 'text',
        question: 'Was bedeutet "Durchringung" als strategisches Formalziel?',
        correctAnswer: 'Sicherheit',
        explanation: 'Durchringung als strategisches Formalziel bezieht sich auf die Sicherheit der Informationssysteme.',
        icon: React.createElement(Shield, {className: "w-8 h-8"}),
        rusExplanation: "Проникание (Durchringung) как стратегическая формальная цель в информационном управлении относится к обеспечению безопасности информационных систем (Sicherheit). Это означает защиту данных от угроз, предотвращение утечек информации, обеспечение надежности и устойчивости системы к внешним и внутренним рискам, что является критически важным для стабильной работы организации."
    }
];

export const projektmanagement_questions: Question[] = [
    {
        id: 1,
        category: 'projektmanagement',
        type: 'text',
        question: 'Was ist ein Projekt? (Geben Sie eine Definition)',
        correctAnswer: 'Eine Aufgabe mit definiertem Anfang und Ende sowie Einmaligkeit der Bedingungen in ihrer Gesamtheit',
        explanation: 'Ein Projekt ist durch zeitliche Begrenzung, Zielvorgabe, Begrenzungen und projektspezifische Organisation charakterisiert.',
        icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
        rusExplanation: "Проект — это задача с определенным началом и концом, а также уникальностью условий в их совокупности. Проект характеризуется временными рамками, конкретными целями, ограничениями (временными, финансовыми, персональными) и специфической организацией."
    },
    {
        id: 2,
        category: 'projektmanagement',
        type: 'checkboxes',
        question: 'Welche Merkmale charakterisieren ein Projekt? (Mehrfachauswahl)',
        options: [
            'Zielvorgabe',
            'Zeitliche, finanzielle, personelle Begrenzungen',
            'Abgrenzung gegenüber anderen Vorhaben',
            'Projektspezifische Organisation',
            'Unbegrenzte Ressourcen',
            'Routine-Aufgaben',
            'Wiederholbarkeit'
        ],
        correctAnswer: [
            'Zielvorgabe',
            'Zeitliche, finanzielle, personelle Begrenzungen',
            'Abgrenzung gegenüber anderen Vorhaben',
            'Projektspezifische Organisation'
        ],
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Проект характеризуется конкретными целями, ограничениями (временными, финансовыми, кадровыми), отделением от других проектов и специфической организацией. Проекты не имеют неограниченных ресурсов, не являются рутинными задачами и не повторяются в точно таком же виде."
    },
    {
        id: 3,
        category: 'projektmanagement',
        type: 'text',
        question: 'Was ist Projektmanagement? (Definition)',
        correctAnswer: 'Aufgabenbezogene Koordination aller Aktivitäten, um das Projekt zu einer bestimmten Zeit mit bestimmten Ressourcen an ein bestimmtes Ergebnis zu bringen',
        explanation: 'Projektmanagement koordiniert alle Projektaktivitäten im Rahmen des Dreiecks: Zeit, Ressourcen, Ergebnis.',
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Управление проектами — это координация всех видов деятельности, связанных с задачами, для достижения определенного результата в определенное время с определенными ресурсами. Это включает управление тремя основными параметрами: время, ресурсы и результат (треугольник проекта)."
    },
    {
        id: 4,
        category: 'projektmanagement',
        type: 'multiple_choice',
        question: 'Was beeinflusst sich im Projektmanagement-Dreieck gegenseitig?',
        options: [
            'Kosten, Qualität, Umfang',
            'Zeit, Ressourcen, Ergebnis',
            'Planung, Durchführung, Kontrolle',
            'Team, Kunde, Management'
        ],
        correctAnswer: 'Zeit, Ressourcen, Ergebnis',
        explanation: 'Das Projektmanagement-Dreieck zeigt die gegenseitige Beeinflussung von Zeit, Ressourcen und Ergebnis.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "В треугольнике управления проектами взаимно влияют друг на друга время, ресурсы и результат. Изменение одного параметра неизбежно влияет на другие: например, сокращение времени может потребовать больше ресурсов или привести к снижению качества результата."
    },
    {
        id: 5,
        category: 'projektmanagement',
        type: 'select_order',
        question: 'Ordnen Sie die Phasen des Projektmanagements in der richtigen Reihenfolge:',
        options: [
            'Planung',
            'Durchführung',
            'Abschluss'
        ],
        correctAnswer: [
            'Planung',
            'Durchführung',
            'Abschluss'
        ],
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Фазы управления проектами следуют в логической последовательности: сначала планирование (определение целей, ресурсов, времени), затем выполнение (реализация плана) и завершение (оценка результатов, документация)."
    },
    {
        id: 6,
        category: 'projektmanagement',
        type: 'checkboxes',
        question: 'Was gehört zur Planungsphase? (Mehrfachauswahl)',
        options: [
            'Projektinitiierung',
            'Projektplanung',
            'Systemanalyse und -bewertung',
            'Projektdurchführung',
            'Projektabschluss'
        ],
        correctAnswer: [
            'Projektinitiierung',
            'Projektplanung'
        ],
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "К фазе планирования относятся инициация проекта (определение целей и рамок) и планирование проекта (разработка детального плана). Системный анализ относится к фазе выполнения, а завершение проекта — к заключительной фазе."
    },
    {
        id: 7,
        category: 'projektmanagement',
        type: 'checkboxes',
        question: 'Welche Aktivitäten gehören zur Projektdurchführung? (Mehrfachauswahl)',
        options: [
            'Systemanalyse und -bewertung',
            'Systemspezifikation',
            'Systemauswahl',
            'Systemeinführung',
            'Systemevaluation',
            'Projektinitiierung',
            'Projektabschluss'
        ],
        correctAnswer: [
            'Systemanalyse und -bewertung',
            'Systemspezifikation',
            'Systemauswahl',
            'Systemeinführung',
            'Systemevaluation'
        ],
        icon: React.createElement(Zap, {className: "w-8 h-8"}),
        rusExplanation: "Фаза выполнения проекта включает все системные активности: анализ и оценку системы, спецификацию требований, выбор подходящего решения, внедрение системы и её оценку. Инициация и завершение проекта относятся к другим фазам."
    },
    {
        id: 8,
        category: 'projektmanagement',
        type: 'checkboxes',
        question: 'Welche Projektrollen gibt es? (Wählen Sie alle zutreffenden)',
        options: [
            'Auftraggeber - Product Owner',
            'Projektleiter - Scrum Master',
            'Projektgruppen - Mitarbeiter - Team',
            'Lenkungsausschuss (Nutzer/Kunden)',
            'Systemadministrator',
            'Marketing Manager',
            'Vertriebsleiter'
        ],
        correctAnswer: [
            'Auftraggeber - Product Owner',
            'Projektleiter - Scrum Master',
            'Projektgruppen - Mitarbeiter - Team',
            'Lenkungsausschuss (Nutzer/Kunden)'
        ],
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Основные роли в проекте включают заказчика (Product Owner), руководителя проекта (Scrum Master), проектные группы/команды и руководящий комитет (пользователи/клиенты). Системный администратор, менеджер по маркетингу и руководитель продаж не являются стандартными проектными ролями."
    },
    {
        id: 9,
        category: 'projektmanagement',
        type: 'checkboxes',
        question: 'Welche Dokumente gehören zur Planungsdokumentation? (Mehrfachauswahl)',
        options: [
            'Projektauftrag',
            'Vorgehensplan',
            'Protokolle',
            'Berichte',
            'Tickets',
            'Abschlussbericht'
        ],
        correctAnswer: [
            'Projektauftrag',
            'Vorgehensplan'
        ],
        icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
        rusExplanation: "К документации планирования относятся проектное задание (определяет цели и рамки проекта) и план действий (описывает методы и этапы выполнения). Протоколы, отчеты и тикеты относятся к документации выполнения, а итоговый отчет — к заключительной документации."
    },
    {
        id: 10,
        category: 'projektmanagement',
        type: 'checkboxes',
        question: 'Was gehört zur Durchführungsdokumentation? (Mehrfachauswahl)',
        options: [
            'Protokolle',
            'Berichte',
            'Tickets',
            'Projektauftrag',
            'Abschlussbericht',
            'Vorgehensplan'
        ],
        correctAnswer: [
            'Protokolle',
            'Berichte',
            'Tickets'
        ],
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Документация выполнения включает протоколы (записи встреч и решений), отчеты (о ходе работ) и тикеты (задачи и проблемы). Проектное задание и план действий относятся к планированию, а итоговый отчет — к завершению проекта."
    },
    {
        id: 11,
        category: 'projektmanagement',
        type: 'multiple_choice',
        question: 'Was ist die Hauptaufgabe des Auftraggebers (Product Owner)?',
        options: [
            'Technische Umsetzung',
            'Projektkoordination',
            'Definition der Anforderungen und Akzeptanz',
            'Teamführung'
        ],
        correctAnswer: 'Definition der Anforderungen und Akzeptanz',
        explanation: 'Der Auftraggeber definiert die Projektanforderungen und entscheidet über die Akzeptanz der Ergebnisse.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Основная задача заказчика (Product Owner) — определение требований к проекту и принятие решения о приемке результатов. Он отвечает за то, что проект соответствует бизнес-потребностям и целям организации."
    },
    {
        id: 12,
        category: 'projektmanagement',
        type: 'multiple_choice',
        question: 'Was ist die Hauptaufgabe des Projektleiters (Scrum Master)?',
        options: [
            'Anforderungen definieren',
            'Koordination und Führung des Projektteams',
            'Technische Entwicklung',
            'Qualitätskontrolle'
        ],
        correctAnswer: 'Koordination und Führung des Projektteams',
        explanation: 'Der Projektleiter koordiniert alle Projektaktivitäten und führt das Team.',
        icon: React.createElement(Settings, {className: "w-8 h-8"}),
        rusExplanation: "Основная задача руководителя проекта (Scrum Master) — координация всех проектных активностей и руководство командой. Он обеспечивает эффективное взаимодействие между участниками проекта и следит за соблюдением процессов."
    },
    {
        id: 13,
        category: 'projektmanagement',
        type: 'true_false',
        question: 'Die Systemevaluation ist der letzte Schritt der Projektdurchführung.',
        correctAnswer: true,
        explanation: 'Systemevaluation ist tatsächlich der letzte Schritt der Durchführungsphase vor dem Projektabschluss.',
        icon: React.createElement(Eye, {className: "w-8 h-8"}),
        rusExplanation: "Оценка системы действительно является последним этапом фазы выполнения проекта. После неё следует только завершение проекта с подготовкой итогового отчета и передачей результатов."
    },
    {
        id: 14,
        category: 'projektmanagement',
        type: 'fill_blanks',
        question: 'Projektmanagement ist eine ___ Koordination aller Aktivitäten, um das Projekt zu einer bestimmten ___, mit bestimmten ___ an ein bestimmtes ___ zu bringen.',
        correctAnswer: ['aufgabenbezogene', 'Zeit', 'Ressourcen', 'Ergebnis'],
        blanks: ['aufgabenbezogene', 'Zeit', 'Ressourcen', 'Ergebnis'],
        explanation: 'Projektmanagement koordiniert aufgabenbezogen alle Aktivitäten bezüglich Zeit, Ressourcen und Ergebnis.',
        icon: React.createElement(Target, {className: "w-8 h-8"}),
        rusExplanation: "Управление проектами — это координация всех видов деятельности, связанных с задачами, для достижения определенного результата в определенное время с определенными ресурсами. Это определение подчеркивает три ключевых параметра проекта."
    }
];

export const projektinitiierung_questions: Question[] = [
    {
      id: 1,
      category: 'projektinitiierung',
      type: 'multiple_choice',
      question: 'Was ist das Hauptziel der Projektinitiierung?',
      options: [
        'Projektauftrag mit Zieldefinition erstellen',
        'Das gesamte Projekt abschließen',
        'Nur das Budget festlegen',
        'Personal einstellen'
      ],
      correctAnswer: 'Projektauftrag mit Zieldefinition erstellen',
      explanation: 'Die Projektinitiierung zielt darauf ab, eine vage Projektidee in einen konkreten Projektauftrag mit klarer Zieldefinition zu überführen.',
      icon: React.createElement(Target, {className: "w-8 h-8"}),
      rusExplanation: "Основная цель инициации проекта — превратить расплывчатую идею проекта в конкретное поручение с четким определением целей. Это включает определение проблем, возможностей решения и создание основы для проекта."
    },
    {
      id: 2,
      category: 'projektinitiierung',
      type: 'checkboxes',
      question: 'Welche Aspekte werden bei der Projektidee-Formulierung berücksichtigt? (Mehrfachauswahl)',
      options: [
        'Anlass und Rahmenkonzept',
        'Nutzen, Kosten und Risiken',
        'Zeitliche Vorstellungen',
        'Ressourcen und Mitarbeiter',
        'Interessengruppen',
        'Auftraggeber',
        'Marketingstrategie',
        'Vertriebsplanung'
      ],
      correctAnswer: [
        'Anlass und Rahmenkonzept',
        'Nutzen, Kosten und Risiken',
        'Zeitliche Vorstellungen',
        'Ressourcen und Mitarbeiter',
        'Interessengruppen',
        'Auftraggeber'
      ],
      icon: React.createElement(BookOpen, {className: "w-8 h-8"}),
      rusExplanation: "При формулировании идеи проекта учитываются различные аспекты: повод и концептуальные рамки, польза, затраты и риски, временные представления, ресурсы и сотрудники, заинтересованные группы и заказчик. Эти элементы помогают создать полное представление о проекте."
    },
    {
      id: 3,
      category: 'projektinitiierung',
      type: 'fill_blanks',
      question: 'Projektziele sollen _____ definiert werden: Überprüfbar, Lösungsneutral, mit _____, Abgestimmt mit _____ und Abgrenzung.',
      correctAnswer: ['SMART', 'Teilzielen', 'Interessensgruppen'],
      blanks: ['SMART', 'Teilzielen', 'Interessensgruppen'],
      explanation: 'Projektziele sollen SMART (spezifisch, messbar, abgestimmt, realistisch, terminiert) definiert werden.',
      icon: React.createElement(Target, {className: "w-8 h-8"}),
      rusExplanation: "Цели проекта должны быть определены по принципу SMART: конкретные, измеримые, согласованные, реалистичные и ограниченные по времени. Они также должны включать подцели и быть согласованы с заинтересованными группами."
    },
    {
      id: 4,
      category: 'projektinitiierung',
      type: 'checkboxes',
      question: 'Was gehört zum Inhalt eines Projektauftrags? (Mehrfachauswahl)',
      options: [
        'Name und Adresse des Auftraggebers',
        'Bezeichnung des Projektes',
        'Zielbeschreibung und Abgrenzung',
        'Terminvorstellungen (Anfang und Ende)',
        'Budget und Mittelfreigabe',
        'Rahmenbedingungen',
        'Detaillierte Beschreibung des Projektes',
        'Organigramm der Firma'
      ],
      correctAnswer: [
        'Name und Adresse des Auftraggebers',
        'Bezeichnung des Projektes',
        'Zielbeschreibung und Abgrenzung',
        'Terminvorstellungen (Anfang und Ende)',
        'Budget und Mittelfreigabe',
        'Rahmenbedingungen',
        'Detaillierte Beschreibung des Projektes'
      ],
      icon: React.createElement(FileText, {className: "w-8 h-8"}),
      rusExplanation: "Содержание проектного поручения включает основную информацию о проекте: данные заказчика, название проекта, описание целей и границ, временные рамки, бюджет, условия и детальное описание проекта. Это документ, который формализует начало проекта."
    },
    {
      id: 5,
      category: 'projektinitiierung',
      type: 'multiple_choice',
      question: 'Welche Phase kommt in der Teambildung NACH der Konfliktphase?',
      options: [
        'Formierungsphase',
        'Normierungsphase',
        'Produktivphase',
        'Auflösungsphase'
      ],
      correctAnswer: 'Normierungsphase',
      explanation: 'Nach der Konfliktphase folgt die Normierungsphase, in der Gruppengefühl und Rollenwahrnehmung entwickelt werden.',
      icon: React.createElement(Users, {className: "w-8 h-8"}),
      rusExplanation: "После фазы конфликтов следует фаза нормирования, в которой развивается чувство группы и восприятие ролей. Это естественный процесс формирования команды, когда участники учатся работать вместе."
    },
    {
      id: 6,
      category: 'projektinitiierung',
      type: 'select_order',
      question: 'Ordnen Sie die Teambildungsphasen in der richtigen Reihenfolge:',
      options: [
        'Formierungsphase',
        'Konfliktphase',
        'Normierungsphase',
        'Produktivphase',
        'Auflösungsphase'
      ],
      correctAnswer: [
        'Formierungsphase',
        'Konfliktphase',
        'Normierungsphase',
        'Produktivphase',
        'Auflösungsphase'
      ],
      icon: React.createElement(Users, {className: "w-8 h-8"}),
      rusExplanation: "Фазы формирования команды проходят в определенной последовательности: формирование (знакомство), конфликты (выяснение интересов), нормирование (развитие группового чувства), продуктивность (эффективная работа) и роспуск (возврат к обычной деятельности)."
    },
    {
      id: 7,
      category: 'projektinitiierung',
      type: 'true_false',
      question: 'Ein Kick-Off-Meeting dient nur der Motivation des Teams.',
      correctAnswer: false,
      explanation: 'Ein Kick-Off-Meeting dient der Motivation, Information, dem Kennenlernen, der Aufgabenverteilung und dem Festlegen von Regeln.',
      icon: React.createElement(Calendar, {className: "w-8 h-8"}),
      rusExplanation: "Стартовое собрание служит не только мотивации команды, но также информированию, знакомству участников, распределению задач и установлению правил для документации и коммуникации. Это комплексное мероприятие для запуска проекта."
    },
    {
      id: 8,
      category: 'projektinitiierung',
      type: 'checkboxes',
      question: 'Welche Rollen gehören zur Projektorganisation? (Mehrfachauswahl)',
      options: [
        'Auftraggeber',
        'Projektlenkungsausschuss',
        'Projektleiter',
        'Projektmitarbeiter',
        'Geschäftsführer',
        'Personalleiter',
        'Marketing-Manager'
      ],
      correctAnswer: [
        'Auftraggeber',
        'Projektlenkungsausschuss',
        'Projektleiter',
        'Projektmitarbeiter'
      ],
      icon: React.createElement(Users, {className: "w-8 h-8"}),
      rusExplanation: "К организации проекта относятся специфические роли: заказчик (инициатор проекта), руководящий комитет проекта (принятие решений), руководитель проекта (управление) и сотрудники проекта (выполнение задач). Это основные роли проектной структуры."
    },
    {
      id: 9,
      category: 'projektinitiierung',
      type: 'multiple_choice',
      question: 'Welche Art der Projektorganisation gibt es NICHT?',
      options: [
        'Reine Projektorganisation',
        'Matrixorganisation',
        'Einfluss-Projektorganisation',
        'Hierarchische Projektorganisation'
      ],
      correctAnswer: 'Hierarchische Projektorganisation',
      explanation: 'Es gibt reine Projektorganisation, Matrixorganisation und Einfluss-Projektorganisation, aber keine hierarchische Projektorganisation.',
      icon: React.createElement(Target, {className: "w-8 h-8"}),
      rusExplanation: "Существует три основных типа проектной организации: чистая проектная организация (полная автономия), матричная организация (смешанная структура) и влиятельная проектная организация (координация без полномочий). Иерархической проектной организации как отдельного типа не существует."
    },
    {
      id: 10,
      category: 'projektinitiierung',
      type: 'text',
      question: 'Welche drei Kompetenzen sollte ein Projektmitarbeiter haben?',
      correctAnswer: 'methodisch, fachlich, sozial',
      explanation: 'Projektmitarbeiter sollten über methodische, fachliche und soziale Kompetenzen verfügen.',
      icon: React.createElement(Users, {className: "w-8 h-8"}),
      rusExplanation: "Сотрудник проекта должен обладать тремя видами компетенций: методической (знание методов управления проектами), профессиональной (экспертные знания в предметной области) и социальной (умение работать в команде и коммуникативные навыки)."
    }
  ];