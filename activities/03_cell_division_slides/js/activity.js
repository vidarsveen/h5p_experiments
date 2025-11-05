/**
 * Cell Division Interactive Slides
 * Standalone Interactive Presentation
 */

// ===== STATE MANAGEMENT =====
const state = {
    currentSlide: 0,
    totalSlides: 12,
    quizScore: 0,
    quizAttempts: 0,
    answeredQuestions: new Set()
};

// ===== DOM ELEMENTS =====
const elements = {
    slidesContainer: document.getElementById('slidesContainer'),
    slides: document.querySelectorAll('.slide'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    slideIndicators: document.getElementById('slideIndicators'),
    completionMessage: document.getElementById('completionMessage'),
    finalScore: document.getElementById('finalScore')
};

// ===== INITIALIZATION =====
function init() {
    createSlideIndicators();
    updateSlideDisplay();
    attachEventListeners();
    setupQuizzes();
    setupInteractiveDiagrams();
    loadProgress();
}

// ===== SLIDE NAVIGATION =====
function goToSlide(slideIndex) {
    // Validate slide index
    if (slideIndex < 0 || slideIndex >= state.totalSlides) {
        return;
    }

    // Remove active class from current slide
    elements.slides[state.currentSlide].classList.remove('active');

    // Update state
    state.currentSlide = slideIndex;

    // Add active class to new slide
    elements.slides[state.currentSlide].classList.add('active');

    // Update all UI elements
    updateSlideDisplay();
    saveProgress();
}

function nextSlide() {
    if (state.currentSlide < state.totalSlides - 1) {
        goToSlide(state.currentSlide + 1);
    }
}

function prevSlide() {
    if (state.currentSlide > 0) {
        goToSlide(state.currentSlide - 1);
    }
}

function updateSlideDisplay() {
    // Update progress bar
    const progressPercentage = ((state.currentSlide + 1) / state.totalSlides) * 100;
    elements.progressBar.style.setProperty('--progress-width', `${progressPercentage}%`);
    elements.progressBar.style.width = `${progressPercentage}%`;

    // Update progress bar width via CSS custom property
    const style = document.createElement('style');
    style.textContent = `.progress-bar::after { width: ${progressPercentage}% !important; }`;
    document.head.appendChild(style);

    // Update progress text
    elements.progressText.textContent = `Slide ${state.currentSlide + 1} of ${state.totalSlides}`;

    // Update navigation buttons
    elements.prevBtn.disabled = state.currentSlide === 0;
    elements.nextBtn.disabled = state.currentSlide === state.totalSlides - 1;

    // Update slide indicators
    updateIndicators();

    // Scroll to top of slide
    elements.slidesContainer.scrollTop = 0;

    // Show completion message on last slide if all quizzes answered
    if (state.currentSlide === state.totalSlides - 1 && state.answeredQuestions.size === 4) {
        showCompletionMessage();
    }
}

// ===== SLIDE INDICATORS =====
function createSlideIndicators() {
    elements.slideIndicators.innerHTML = '';

    for (let i = 0; i < state.totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        dot.setAttribute('data-slide', i);
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.setAttribute('tabindex', '0');

        dot.addEventListener('click', () => goToSlide(i));
        dot.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(i);
            }
        });

        elements.slideIndicators.appendChild(dot);
    }
}

function updateIndicators() {
    const dots = elements.slideIndicators.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        if (index === state.currentSlide) {
            dot.classList.add('active');
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.classList.remove('active');
            dot.removeAttribute('aria-current');
        }
    });
}

// ===== QUIZ FUNCTIONALITY =====
function setupQuizzes() {
    // Get all quiz containers
    const quizSlides = document.querySelectorAll('.quiz-slide');

    quizSlides.forEach((slide, quizIndex) => {
        const options = slide.querySelectorAll('.option-btn');
        const feedbackDiv = slide.querySelector('.feedback');
        const quizId = `quiz${quizIndex + 1}`;

        options.forEach(option => {
            option.addEventListener('click', function() {
                handleQuizAnswer(this, options, feedbackDiv, quizId);
            });
        });
    });
}

function handleQuizAnswer(selectedOption, allOptions, feedbackDiv, quizId) {
    // Prevent answering twice
    if (state.answeredQuestions.has(quizId)) {
        return;
    }

    const isCorrect = selectedOption.getAttribute('data-answer') === 'correct';
    const feedback = selectedOption.getAttribute('data-feedback');

    // Mark this question as answered
    state.answeredQuestions.add(quizId);

    // Update score
    if (isCorrect) {
        state.quizScore++;
    }

    // Disable all options
    allOptions.forEach(option => {
        option.disabled = true;

        // Highlight correct and wrong answers
        if (option.getAttribute('data-answer') === 'correct') {
            option.classList.add('correct');
        } else if (option === selectedOption && !isCorrect) {
            option.classList.add('wrong');
        }
    });

    // Show feedback
    feedbackDiv.textContent = feedback;
    feedbackDiv.classList.add('show');
    feedbackDiv.classList.add(isCorrect ? 'correct' : 'wrong');

    // Save progress
    saveProgress();

    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('visually-hidden');
    announcement.textContent = isCorrect ? 'Correct answer!' : 'Incorrect answer. ' + feedback;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ===== INTERACTIVE DIAGRAMS =====
function setupInteractiveDiagrams() {
    const revealButtons = document.querySelectorAll('.reveal-btn');

    revealButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const diagram = this.closest('.clickable-diagram');
            const answer = diagram.querySelector('.phase-answer');

            // Toggle visibility
            answer.classList.remove('hidden');
            this.style.display = 'none';

            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.classList.add('visually-hidden');
            announcement.textContent = `Revealed: ${answer.querySelector('strong').textContent}`;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });
    });
}

// ===== COMPLETION MESSAGE =====
function showCompletionMessage() {
    if (elements.completionMessage) {
        elements.completionMessage.classList.remove('hidden');
        elements.finalScore.textContent = `${state.quizScore}/4`;
    }
}

// ===== EVENT LISTENERS =====
function attachEventListeners() {
    // Navigation buttons
    elements.prevBtn.addEventListener('click', prevSlide);
    elements.nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
    // Ignore if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(state.totalSlides - 1);
            break;
        case 'Escape':
            e.preventDefault();
            showKeyboardShortcuts();
            break;
    }
}

function showKeyboardShortcuts() {
    alert(`Keyboard Shortcuts:

← / ↑   Previous slide
→ / ↓   Next slide
Home    First slide
End     Last slide
Esc     Show this help

You can also click the dots at the bottom to jump to any slide!`);
}

// ===== PROGRESS PERSISTENCE =====
function saveProgress() {
    const progressData = {
        currentSlide: state.currentSlide,
        quizScore: state.quizScore,
        answeredQuestions: Array.from(state.answeredQuestions),
        timestamp: new Date().toISOString()
    };

    try {
        localStorage.setItem('cellDivisionProgress', JSON.stringify(progressData));
    } catch (e) {
        console.warn('Could not save progress to localStorage:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('cellDivisionProgress');
        if (saved) {
            const data = JSON.parse(saved);

            // Ask user if they want to continue
            const resume = confirm('Would you like to resume from where you left off?');

            if (resume) {
                state.currentSlide = data.currentSlide || 0;
                state.quizScore = data.quizScore || 0;
                state.answeredQuestions = new Set(data.answeredQuestions || []);

                // Restore quiz states
                restoreQuizStates();

                // Go to saved slide
                goToSlide(state.currentSlide);
            }
        }
    } catch (e) {
        console.warn('Could not load progress from localStorage:', e);
    }
}

function restoreQuizStates() {
    // Restore the state of answered quizzes
    state.answeredQuestions.forEach(quizId => {
        const quizIndex = parseInt(quizId.replace('quiz', '')) - 1;
        const quizSlide = document.querySelectorAll('.quiz-slide')[quizIndex];

        if (quizSlide) {
            const options = quizSlide.querySelectorAll('.option-btn');
            const feedbackDiv = quizSlide.querySelector('.feedback');

            // Disable all options and show they were answered
            options.forEach(option => {
                option.disabled = true;
                if (option.getAttribute('data-answer') === 'correct') {
                    option.classList.add('correct');
                }
            });

            // Show a general feedback
            if (feedbackDiv) {
                feedbackDiv.textContent = 'Question already answered. Continue to the next slide.';
                feedbackDiv.classList.add('show', 'correct');
            }
        }
    });
}

function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This will clear all quiz answers and return to the first slide.')) {
        localStorage.removeItem('cellDivisionProgress');
        location.reload();
    }
}

// ===== UTILITY FUNCTIONS =====
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('visually-hidden');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ===== ANALYTICS (Optional) =====
function trackSlideView(slideNumber) {
    // Optional: Send analytics data
    // This could be integrated with Google Analytics, xAPI, or custom tracking
    console.log(`Viewed slide ${slideNumber + 1}`);
}

function trackQuizAnswer(quizId, isCorrect) {
    // Optional: Track quiz performance
    console.log(`Quiz ${quizId}: ${isCorrect ? 'Correct' : 'Incorrect'}`);
}

// ===== EXPORT DATA (Optional) =====
function exportResults() {
    const results = {
        studentId: prompt('Enter your student ID (optional):') || 'Anonymous',
        activityName: 'Cell Division: Mitosis & Meiosis',
        completionDate: new Date().toISOString(),
        slidesViewed: state.currentSlide + 1,
        totalSlides: state.totalSlides,
        quizScore: state.quizScore,
        totalQuizzes: 4,
        percentage: ((state.quizScore / 4) * 100).toFixed(1),
        answeredQuestions: Array.from(state.answeredQuestions)
    };

    // Create downloadable JSON file
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cell-division-results-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Results exported! Check your downloads folder.');
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Announce slide changes to screen readers
function announceSlideChange() {
    const slideNumber = state.currentSlide + 1;
    const slideTitle = elements.slides[state.currentSlide].querySelector('h2')?.textContent || 'Slide';
    announceToScreenReader(`Slide ${slideNumber} of ${state.totalSlides}: ${slideTitle}`);
}

// Enhanced navigation for better UX
function enhanceNavigation() {
    // Update on slide change
    const originalGoToSlide = goToSlide;
    goToSlide = function(slideIndex) {
        originalGoToSlide(slideIndex);
        announceSlideChange();
        trackSlideView(slideIndex);
    };
}

// ===== PRINT FUNCTIONALITY =====
function preparePrint() {
    // Show all slides for printing
    elements.slides.forEach(slide => {
        slide.classList.add('active');
    });

    window.print();

    // Restore original state after printing
    setTimeout(() => {
        elements.slides.forEach((slide, index) => {
            if (index !== state.currentSlide) {
                slide.classList.remove('active');
            }
        });
    }, 100);
}

// Add print button listener if exists
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        preparePrint();
    }
});

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', init);

// ===== EXPOSE API FOR DEBUGGING/TESTING =====
window.CellDivisionPresentation = {
    goToSlide,
    nextSlide,
    prevSlide,
    resetProgress,
    exportResults,
    getState: () => ({ ...state }),
    getScore: () => `${state.quizScore}/4`
};

console.log('Cell Division Interactive Presentation loaded!');
console.log('Type CellDivisionPresentation in console to access controls.');
console.log('Available methods: goToSlide(n), nextSlide(), prevSlide(), resetProgress(), exportResults(), getScore()');
