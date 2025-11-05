/**
 * Interactive Video Player - Projectile Motion
 * Custom HTML5 video player with interactive question overlays
 */

// Questions data - pause video at specific times and ask questions
const QUESTIONS = [
    {
        time: 5, // seconds
        title: "Question 1",
        question: "What two components make up projectile motion?",
        options: [
            "Horizontal and vertical motion",
            "Speed and direction",
            "Force and acceleration",
            "Mass and velocity"
        ],
        correctIndex: 0,
        feedback: {
            correct: "Correct! Projectile motion has both horizontal (constant velocity) and vertical (constant acceleration due to gravity) components.",
            incorrect: "Not quite. Think about the two dimensions of motion - what happens horizontally vs. vertically?"
        }
    },
    {
        time: 15,
        title: "Question 2",
        question: "What happens to the horizontal velocity of a projectile (ignoring air resistance)?",
        options: [
            "It decreases over time",
            "It remains constant",
            "It increases over time",
            "It changes direction"
        ],
        correctIndex: 1,
        feedback: {
            correct: "Exactly! With no air resistance, there's no horizontal force, so horizontal velocity stays constant.",
            incorrect: "Think about forces. Is there any horizontal force acting on the projectile (assuming no air resistance)?"
        }
    },
    {
        time: 25,
        title: "Question 3",
        question: "At what point in its trajectory does a projectile have the minimum velocity?",
        options: [
            "At launch",
            "At the highest point",
            "At landing",
            "Velocity is constant throughout"
        ],
        correctIndex: 1,
        feedback: {
            correct: "Perfect! At the highest point, the vertical velocity is zero, leaving only the horizontal component. This is the minimum velocity.",
            incorrect: "Consider what happens to the vertical component of velocity. Where does it equal zero?"
        }
    },
    {
        time: 35,
        title: "Question 4",
        question: "For maximum range (distance traveled), at what angle should you launch a projectile?",
        options: [
            "30 degrees",
            "45 degrees",
            "60 degrees",
            "90 degrees"
        ],
        correctIndex: 1,
        feedback: {
            correct: "Correct! 45° gives the maximum range in a vacuum. It's the perfect balance between horizontal and vertical components.",
            incorrect: "The optimal angle balances height and distance. Too high and it doesn't travel far; too flat and it hits the ground quickly."
        }
    }
];

// State management
let state = {
    currentQuestionIndex: null,
    askedQuestions: new Set(),
    correctAnswers: 0,
    totalQuestions: QUESTIONS.length,
    score: 0,
    videoCompleted: false
};

// DOM Elements
let video, overlay, playPauseBtn, seekBar, volumeBar, muteBtn, fullscreenBtn;
let currentTimeDisplay, durationDisplay, progressFilled, checkpointsContainer;
let questionTitle, questionText, questionOptions, questionFeedback, continueBtn;
let progressPercent, questionsAnswered, scoreDisplay;

// Initialize
function init() {
    // Get DOM elements
    video = document.getElementById('mainVideo');
    overlay = document.getElementById('videoOverlay');
    playPauseBtn = document.getElementById('playPauseBtn');
    seekBar = document.getElementById('seekBar');
    volumeBar = document.getElementById('volumeBar');
    muteBtn = document.getElementById('muteBtn');
    fullscreenBtn = document.getElementById('fullscreenBtn');
    currentTimeDisplay = document.getElementById('currentTime');
    durationDisplay = document.getElementById('duration');
    progressFilled = document.getElementById('progressFilled');
    checkpointsContainer = document.getElementById('checkpoints');

    questionTitle = document.getElementById('questionTitle');
    questionText = document.getElementById('questionText');
    questionOptions = document.getElementById('questionOptions');
    questionFeedback = document.getElementById('questionFeedback');
    continueBtn = document.getElementById('continueBtn');

    progressPercent = document.getElementById('progressPercent');
    questionsAnswered = document.getElementById('questionsAnswered');
    scoreDisplay = document.getElementById('scoreDisplay');

    // Set up event listeners
    setupVideoControls();
    setupVideoEvents();
    setupCheckpoints();

    // Load saved progress
    loadProgress();

    // Update initial stats
    updateStats();
}

// Set up video control buttons
function setupVideoControls() {
    // Play/Pause
    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    // Seek bar
    seekBar.addEventListener('input', (e) => {
        const time = (e.target.value / 100) * video.duration;
        video.currentTime = time;
    });

    // Volume
    volumeBar.addEventListener('input', (e) => {
        video.volume = e.target.value;
        updateMuteIcon();
    });

    // Mute/Unmute
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateMuteIcon();
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Continue button (after answering question)
    continueBtn.addEventListener('click', () => {
        hideOverlay();
        video.play();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// Set up video event listeners
function setupVideoEvents() {
    // Time update
    video.addEventListener('timeupdate', () => {
        updateProgress();
        checkForQuestions();
    });

    // Duration loaded
    video.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(video.duration);
        seekBar.max = 100;
    });

    // Video ended
    video.addEventListener('ended', () => {
        state.videoCompleted = true;
        showCompletionMessage();
        saveProgress();
    });

    // Play/Pause state changes
    video.addEventListener('play', () => {
        playPauseBtn.querySelector('.icon').textContent = '⏸';
    });

    video.addEventListener('pause', () => {
        playPauseBtn.querySelector('.icon').textContent = '▶';
    });
}

// Create checkpoint markers on progress bar
function setupCheckpoints() {
    QUESTIONS.forEach((q, index) => {
        const checkpoint = document.createElement('div');
        checkpoint.className = 'checkpoint';
        checkpoint.style.left = `${(q.time / video.duration) * 100}%`;
        checkpoint.title = `Question ${index + 1} at ${formatTime(q.time)}`;
        checkpoint.dataset.questionIndex = index;

        checkpoint.addEventListener('click', (e) => {
            e.stopPropagation();
            video.currentTime = q.time;
        });

        checkpointsContainer.appendChild(checkpoint);
    });
}

// Toggle play/pause
function togglePlayPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update progress bar and time display
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    seekBar.value = percent;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    progressPercent.textContent = `${Math.round(percent)}%`;
}

// Check if we should show a question
function checkForQuestions() {
    QUESTIONS.forEach((q, index) => {
        if (!state.askedQuestions.has(index) &&
            video.currentTime >= q.time &&
            video.currentTime < q.time + 0.5) {

            showQuestion(index);
        }
    });
}

// Show question overlay
function showQuestion(index) {
    state.currentQuestionIndex = index;
    state.askedQuestions.add(index);

    const question = QUESTIONS[index];

    // Pause video
    video.pause();

    // Set question content
    questionTitle.textContent = question.title;
    questionText.textContent = question.question;

    // Create option buttons
    questionOptions.innerHTML = '';
    question.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.index = i;
        btn.addEventListener('click', () => handleAnswer(i, index));
        questionOptions.appendChild(btn);
    });

    // Hide feedback and continue button initially
    questionFeedback.classList.add('hidden');
    continueBtn.classList.add('hidden');

    // Show overlay
    overlay.classList.remove('hidden');
}

// Handle answer selection
function handleAnswer(selectedIndex, questionIndex) {
    const question = QUESTIONS[questionIndex];
    const isCorrect = selectedIndex === question.correctIndex;

    // Update score
    if (isCorrect) {
        state.correctAnswers++;
    }
    state.score = Math.round((state.correctAnswers / state.totalQuestions) * 100);

    // Disable all option buttons
    const optionBtns = questionOptions.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === question.correctIndex) {
            btn.classList.add('correct');
        } else if (i === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Show feedback
    questionFeedback.textContent = isCorrect ?
        question.feedback.correct :
        question.feedback.incorrect;
    questionFeedback.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    questionFeedback.classList.remove('hidden');

    // Show continue button
    continueBtn.classList.remove('hidden');

    // Mark checkpoint as completed
    const checkpoint = checkpointsContainer.querySelector(`[data-question-index="${questionIndex}"]`);
    if (checkpoint) {
        checkpoint.classList.add('completed');
    }

    // Update stats
    updateStats();
    saveProgress();
}

// Hide overlay
function hideOverlay() {
    overlay.classList.add('hidden');
    state.currentQuestionIndex = null;
}

// Update statistics display
function updateStats() {
    questionsAnswered.textContent = `${state.askedQuestions.size} / ${state.totalQuestions}`;
    scoreDisplay.textContent = `${state.score}%`;
}

// Show completion message
function showCompletionMessage() {
    const allAnswered = state.askedQuestions.size === state.totalQuestions;

    if (!allAnswered) {
        alert(`Video complete! You answered ${state.askedQuestions.size} out of ${state.totalQuestions} questions. Rewatch to answer the ones you missed!`);
    } else {
        const scorePercent = state.score;
        let message = `🎉 Congratulations! You've completed the interactive video!\n\n`;
        message += `Questions Answered: ${state.correctAnswers}/${state.totalQuestions}\n`;
        message += `Score: ${scorePercent}%\n\n`;

        if (scorePercent === 100) {
            message += `Perfect score! You've mastered projectile motion concepts! 🌟`;
        } else if (scorePercent >= 75) {
            message += `Great job! You have a strong understanding of projectile motion! 👍`;
        } else if (scorePercent >= 50) {
            message += `Good effort! Review the concepts and try again to improve your score. 📚`;
        } else {
            message += `Keep practicing! Rewatch the video and pay attention to the key concepts. 💪`;
        }

        alert(message);
    }
}

// Update mute icon
function updateMuteIcon() {
    const icon = muteBtn.querySelector('.icon');
    if (video.muted || video.volume === 0) {
        icon.textContent = '🔇';
    } else if (video.volume < 0.5) {
        icon.textContent = '🔉';
    } else {
        icon.textContent = '🔊';
    }
    volumeBar.value = video.muted ? 0 : video.volume;
}

// Toggle fullscreen
function toggleFullscreen() {
    const container = document.querySelector('.container');

    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        fullscreenBtn.querySelector('.icon').textContent = '⛶';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        fullscreenBtn.querySelector('.icon').textContent = '⛶';
    }
}

// Keyboard shortcuts
function handleKeyboard(e) {
    // Don't interfere with text input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
        return;
    }

    switch(e.key) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'm':
            e.preventDefault();
            video.muted = !video.muted;
            updateMuteIcon();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            video.currentTime = Math.max(0, video.currentTime - 5);
            break;
        case 'ArrowRight':
            e.preventDefault();
            video.currentTime = Math.min(video.duration, video.currentTime + 5);
            break;
        case 'ArrowUp':
            e.preventDefault();
            video.volume = Math.min(1, video.volume + 0.1);
            updateMuteIcon();
            break;
        case 'ArrowDown':
            e.preventDefault();
            video.volume = Math.max(0, video.volume - 0.1);
            updateMuteIcon();
            break;
    }
}

// Format time in MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Save progress to localStorage
function saveProgress() {
    try {
        const progress = {
            askedQuestions: Array.from(state.askedQuestions),
            correctAnswers: state.correctAnswers,
            score: state.score,
            videoCompleted: state.videoCompleted,
            timestamp: Date.now()
        };
        localStorage.setItem('projectileMotionProgress', JSON.stringify(progress));
    } catch (e) {
        console.log('localStorage not available');
    }
}

// Load progress from localStorage
function loadProgress() {
    try {
        const saved = localStorage.getItem('projectileMotionProgress');
        if (saved) {
            const progress = JSON.parse(saved);

            // Only load if less than 24 hours old
            const hoursSince = (Date.now() - progress.timestamp) / (1000 * 60 * 60);
            if (hoursSince < 24) {
                state.askedQuestions = new Set(progress.askedQuestions);
                state.correctAnswers = progress.correctAnswers || 0;
                state.score = progress.score || 0;
                state.videoCompleted = progress.videoCompleted || false;

                // Mark completed checkpoints
                progress.askedQuestions.forEach(index => {
                    const checkpoint = checkpointsContainer.querySelector(`[data-question-index="${index}"]`);
                    if (checkpoint) {
                        checkpoint.classList.add('completed');
                    }
                });

                updateStats();
            }
        }
    } catch (e) {
        console.log('localStorage not available');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for video metadata to load
    setTimeout(init, 100);
});

// Debug helper
window.debugVideoState = () => {
    console.log('Video State:', {
        currentTime: video.currentTime,
        duration: video.duration,
        paused: video.paused,
        state: state
    });
};

// Reset progress (for testing)
window.resetProgress = () => {
    localStorage.removeItem('projectileMotionProgress');
    location.reload();
};
