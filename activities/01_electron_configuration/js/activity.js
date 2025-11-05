/**
 * Electron Configuration Activity
 * Interactive drag-and-drop for building electron configurations
 * Element: Oxygen (O) - Atomic Number 8
 */

// Correct configuration for Oxygen
const CORRECT_CONFIG = {
    '1s-up': 'up',
    '1s-down': 'down',
    '2s-up': 'up',
    '2s-down': 'down',
    '2p-px-up': 'up',
    '2p-py-up': 'up',
    '2p-pz-up': 'up',
    '2p-px-down': 'down'
};

// State management
let state = {
    placedElectrons: {},
    attempts: 0,
    score: 0,
    totalElectrons: 8
};

// Initialize the activity
function init() {
    createElectrons();
    setupDragAndDrop();
    setupButtons();
    loadProgress();
}

// Create electron elements
function createElectrons() {
    const electronBank = document.getElementById('electronBank');
    electronBank.innerHTML = '';

    // Create 8 electrons: 4 spin-up, 4 spin-down
    const electrons = [
        { spin: 'up', symbol: '↑' },
        { spin: 'up', symbol: '↑' },
        { spin: 'up', symbol: '↑' },
        { spin: 'up', symbol: '↑' },
        { spin: 'down', symbol: '↓' },
        { spin: 'down', symbol: '↓' },
        { spin: 'down', symbol: '↓' },
        { spin: 'down', symbol: '↓' }
    ];

    electrons.forEach((electron, index) => {
        const electronEl = document.createElement('div');
        electronEl.className = 'electron';
        electronEl.draggable = true;
        electronEl.dataset.spin = electron.spin;
        electronEl.dataset.electronId = `electron-${index}`;
        electronEl.textContent = electron.symbol;
        electronEl.setAttribute('role', 'button');
        electronEl.setAttribute('aria-label', `Electron with spin ${electron.spin}`);
        electronEl.setAttribute('tabindex', '0');
        electronBank.appendChild(electronEl);
    });
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const electrons = document.querySelectorAll('.electron');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Drag events for electrons
    electrons.forEach(electron => {
        electron.addEventListener('dragstart', handleDragStart);
        electron.addEventListener('dragend', handleDragEnd);

        // Keyboard accessibility
        electron.addEventListener('keydown', handleKeyboardDrag);
    });

    // Drop events for zones
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

// Drag start
function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    e.dataTransfer.setData('electronId', this.dataset.electronId);
    e.dataTransfer.setData('spin', this.dataset.spin);
    this.classList.add('dragging');
}

// Drag end
function handleDragEnd(e) {
    this.classList.remove('dragging');
}

// Drag over drop zone
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

// Drag leave drop zone
function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

// Drop electron
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();

    this.classList.remove('drag-over');

    // Check if zone is already filled
    if (this.querySelector('.electron')) {
        showTemporaryMessage('This orbital position is already filled!');
        return false;
    }

    // Get electron data
    const electronHtml = e.dataTransfer.getData('text/html');
    const electronId = e.dataTransfer.getData('electronId');
    const spin = e.dataTransfer.getData('spin');

    // Create new electron element in drop zone
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = electronHtml;
    const electronEl = tempDiv.firstChild;

    // Remove from electron bank if it's there
    const originalElectron = document.querySelector(`[data-electron-id="${electronId}"]`);
    if (originalElectron && originalElectron.parentElement.id === 'electronBank') {
        originalElectron.remove();
    } else if (originalElectron) {
        // Remove from previous drop zone
        originalElectron.parentElement.classList.remove('filled', 'correct', 'incorrect');
        originalElectron.remove();
    }

    // Add electron to this zone
    this.appendChild(electronEl);
    this.classList.add('filled');

    // Store placement
    const orbital = this.dataset.orbital;
    const position = this.dataset.position;
    const key = `${orbital}-${position}`;
    state.placedElectrons[key] = spin;

    // Clear any feedback styling
    clearFeedback();

    // Re-setup drag for the placed electron (to allow moving)
    electronEl.addEventListener('dragstart', handleDragStart);
    electronEl.addEventListener('dragend', handleDragEnd);

    saveProgress();
    return false;
}

// Keyboard drag support (basic)
function handleKeyboardDrag(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Simple implementation: cycle through available zones
        showTemporaryMessage('Use mouse to drag, or use "Show Solution" to see correct placement');
    }
}

// Setup button handlers
function setupButtons() {
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);
    document.getElementById('retry').addEventListener('click', retry);
    document.getElementById('showSolution').addEventListener('click', showSolution);
    document.getElementById('showHints').addEventListener('click', toggleHints);
}

// Check answer
function checkAnswer() {
    const feedback = document.getElementById('feedback');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Check if all electrons are placed
    const placedCount = Object.keys(state.placedElectrons).length;
    if (placedCount < state.totalElectrons) {
        showFeedback('error', 'Not Complete',
            `You've only placed ${placedCount} out of ${state.totalElectrons} electrons. Place all electrons before checking.`);
        return;
    }

    // Validate each placement
    let correct = 0;
    let total = 0;

    dropZones.forEach(zone => {
        const orbital = zone.dataset.orbital;
        const position = zone.dataset.position;
        const expectedSpin = zone.dataset.spin;
        const key = `${orbital}-${position}`;

        if (CORRECT_CONFIG[key]) {
            total++;
            const placedSpin = state.placedElectrons[key];

            if (placedSpin === expectedSpin) {
                correct++;
                zone.classList.add('correct');
                zone.classList.remove('incorrect');
            } else {
                zone.classList.add('incorrect');
                zone.classList.remove('correct');
            }
        }
    });

    // Calculate score
    const percentage = Math.round((correct / total) * 100);
    state.score = percentage;
    state.attempts++;

    // Show feedback based on score
    if (percentage === 100) {
        showFeedback('success', 'Perfect! 🎉',
            `You correctly applied the Aufbau principle, Hund's rule, and Pauli exclusion principle! Oxygen's electron configuration is 1s² 2s² 2p⁴.`,
            `Score: ${correct}/${total} (${percentage}%)`);
    } else if (percentage >= 75) {
        showFeedback('partial', 'Very Good! 👍',
            `You've mostly mastered electron configuration. You got ${correct} out of ${total} correct. Double-check the positions marked in red.`,
            `Score: ${correct}/${total} (${percentage}%)`);
    } else if (percentage >= 50) {
        showFeedback('partial', 'Good Effort 📚',
            `You understand some principles, but there are errors. Review the Aufbau principle and Hund's rule. You got ${correct} out of ${total} correct.`,
            `Score: ${correct}/${total} (${percentage}%)`);
    } else {
        showFeedback('error', 'Needs More Practice 📖',
            `Review the three principles carefully. You got ${correct} out of ${total} correct. Try reading the hints, then retry.`,
            `Score: ${correct}/${total} (${percentage}%)`);
    }

    saveProgress();
}

// Show feedback message
function showFeedback(type, title, message, score = '') {
    const feedback = document.getElementById('feedback');
    feedback.className = `feedback ${type}`;

    const icons = {
        success: '✅',
        partial: '⚠️',
        error: '❌'
    };

    feedback.innerHTML = `
        <div class="feedback-content">
            <div class="feedback-icon">${icons[type]}</div>
            <div class="feedback-text">
                <h3>${title}</h3>
                <p>${message}</p>
                ${score ? `<div class="feedback-score">${score}</div>` : ''}
            </div>
        </div>
    `;
}

// Clear feedback styling
function clearFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';
    feedback.innerHTML = '';

    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.classList.remove('correct', 'incorrect');
    });
}

// Retry activity
function retry() {
    // Clear all placements
    state.placedElectrons = {};

    // Remove all electrons from drop zones
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        const electron = zone.querySelector('.electron');
        if (electron) {
            electron.remove();
        }
        zone.classList.remove('filled', 'correct', 'incorrect', 'drag-over');
    });

    // Recreate electrons in bank
    createElectrons();
    setupDragAndDrop();

    // Clear feedback
    clearFeedback();

    // Show message
    showTemporaryMessage('Activity reset! Try again.');

    saveProgress();
}

// Show solution
function showSolution() {
    // Clear current state
    retry();

    // Place electrons in correct positions
    const electronBank = document.getElementById('electronBank');
    const electrons = Array.from(electronBank.querySelectorAll('.electron'));

    const correctPlacements = [
        { key: '1s-up', spin: 'up' },
        { key: '1s-down', spin: 'down' },
        { key: '2s-up', spin: 'up' },
        { key: '2s-down', spin: 'down' },
        { key: '2p-px-up', spin: 'up' },
        { key: '2p-py-up', spin: 'up' },
        { key: '2p-pz-up', spin: 'up' },
        { key: '2p-px-down', spin: 'down' }
    ];

    correctPlacements.forEach((placement, index) => {
        // Find appropriate electron
        const electron = electrons.find(e => e.dataset.spin === placement.spin && !e.dataset.placed);
        if (!electron) return;

        electron.dataset.placed = 'true';

        // Find target zone
        const [orbital, position] = placement.key.split('-').slice(0, 2);
        const positionFull = placement.key.split('-').slice(1).join('-');
        const zone = document.querySelector(`.drop-zone[data-orbital="${orbital}"][data-position="${positionFull}"]`);

        if (zone) {
            zone.appendChild(electron.cloneNode(true));
            zone.classList.add('filled', 'correct');
            electron.remove();

            state.placedElectrons[placement.key] = placement.spin;
        }
    });

    // Show solution feedback
    showFeedback('success', 'Solution Shown ✨',
        'This is the correct electron configuration for Oxygen (O). The configuration is 1s² 2s² 2p⁴, following all three principles.',
        'Study this configuration and try again later!');

    saveProgress();
}

// Toggle hints
function toggleHints() {
    const hintsContent = document.getElementById('hintsContent');
    const button = document.getElementById('showHints');

    if (hintsContent.classList.contains('hidden')) {
        hintsContent.classList.remove('hidden');
        button.textContent = 'Hide Hints';
    } else {
        hintsContent.classList.add('hidden');
        button.textContent = 'Show Hints';
    }
}

// Show temporary message
function showTemporaryMessage(message) {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';
    feedback.innerHTML = `<p>${message}</p>`;

    setTimeout(() => {
        if (feedback.textContent === message) {
            feedback.innerHTML = '';
        }
    }, 3000);
}

// Save progress to localStorage
function saveProgress() {
    try {
        localStorage.setItem('electronConfigState', JSON.stringify(state));
    } catch (e) {
        console.log('localStorage not available');
    }
}

// Load progress from localStorage
function loadProgress() {
    try {
        const saved = localStorage.getItem('electronConfigState');
        if (saved) {
            const savedState = JSON.parse(saved);
            // Only load attempts and score, not placements (start fresh)
            state.attempts = savedState.attempts || 0;
            state.score = savedState.score || 0;
        }
    } catch (e) {
        console.log('localStorage not available');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

// Debug helper (remove in production)
window.debugState = () => {
    console.log('Current State:', state);
    console.log('Correct Config:', CORRECT_CONFIG);
};
