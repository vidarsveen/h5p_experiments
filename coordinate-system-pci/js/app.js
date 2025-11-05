/**
 * Main Application Logic
 * Connects UI controls with the Coordinate System
 */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Interactive Coordinate System...');

    // Initialize the coordinate system
    coordinateSystem.init('canvasContainer');

    // Load default example
    loadExample('basic');

    console.log('✅ Application ready!');
});

/**
 * Load a predefined example configuration
 */
function loadExample(exampleName) {
    const example = EXAMPLES[exampleName];

    if (!example) {
        showMessage('Example not found', 'error');
        return;
    }

    // Update textarea with JSON
    const textarea = document.getElementById('jsonConfig');
    textarea.value = JSON.stringify(example.config, null, 2);

    // Apply the configuration
    applyConfig();

    // Show success message
    showMessage(`Loaded: ${example.name}`, 'success');
    updateStatus(`Loaded: ${example.name} - ${example.description}`);
}

/**
 * Apply configuration from JSON textarea
 */
function applyConfig() {
    const textarea = document.getElementById('jsonConfig');
    const jsonText = textarea.value;

    try {
        // Parse JSON
        const config = JSON.parse(jsonText);

        // Load configuration
        coordinateSystem.loadConfig(config);

        // Clear validation result
        clearValidationResult();

        showMessage('Configuration applied successfully!', 'success');
        updateStatus('Configuration loaded');
    } catch (error) {
        showMessage('Invalid JSON: ' + error.message, 'error');
        console.error('Error parsing JSON:', error);
    }
}

/**
 * Validate the current response
 */
function validateResponse() {
    try {
        const result = coordinateSystem.validate();

        displayValidationResult(result);

        if (result.valid) {
            showMessage('All correct! 🎉', 'success');
        } else {
            showMessage(`Score: ${result.score}/${result.maxScore} (${result.percentage}%)`, 'info');
        }
    } catch (error) {
        showMessage('Validation error: ' + error.message, 'error');
        console.error('Validation error:', error);
    }
}

/**
 * Display validation result
 */
function displayValidationResult(result) {
    const container = document.getElementById('validationResult');

    if (!result || !result.results) {
        container.innerHTML = '<p>No validation results</p>';
        container.className = 'validation-output';
        return;
    }

    let html = '';

    // Overall score
    html += `<div class="score">Score: ${result.score}/${result.maxScore} (${result.percentage}%)</div>`;

    // Individual results
    result.results.forEach((r, index) => {
        const isCorrect = r.score === r.maxScore;
        const icon = isCorrect ? '✓' : '✗';
        const className = isCorrect ? 'correct' : 'incorrect';

        html += `<p class="${className}">
            <strong>${icon} Rule ${index + 1}:</strong> ${r.feedback}
        </p>`;
    });

    container.innerHTML = html;

    // Set overall styling
    if (result.valid) {
        container.className = 'validation-output success';
    } else if (result.percentage >= 50) {
        container.className = 'validation-output partial';
    } else {
        container.className = 'validation-output error';
    }
}

/**
 * Clear validation result
 */
function clearValidationResult() {
    const container = document.getElementById('validationResult');
    container.innerHTML = '<p>No validation performed yet.</p>';
    container.className = 'validation-output';
}

/**
 * Reset the system
 */
function resetSystem() {
    coordinateSystem.resetView();
    clearValidationResult();
    showMessage('System reset', 'info');
    updateStatus('Ready');
}

/**
 * Undo wrapper with feedback
 */
function undoAction() {
    const success = coordinateSystem.undo();
    if (success) {
        showMessage('↶ Undo', 'info');
        updateStatus('Undone');
    } else {
        showMessage('↶ Already at oldest state', 'info');
    }
}

/**
 * Redo wrapper with feedback
 */
function redoAction() {
    const success = coordinateSystem.redo();
    if (success) {
        showMessage('↷ Redo', 'info');
        updateStatus('Redone');
    } else {
        showMessage('↷ Already at newest state', 'info');
    }
}

/**
 * Toggle grid wrapper with feedback
 */
function toggleGridAction() {
    const isOn = coordinateSystem.toggleGrid();
    showMessage(`⊞ Grid ${isOn ? 'ON' : 'OFF'}`, 'info');
    updateStatus(isOn ? 'Grid visible' : 'Grid hidden');
}

/**
 * Zoom in wrapper with feedback
 */
function zoomInAction() {
    const success = coordinateSystem.zoomIn();
    if (success) {
        showMessage('🔍+ Zoomed in', 'info');
        updateStatus('Zoomed in');
    } else {
        showMessage('🔍 Maximum zoom reached', 'info');
    }
}

/**
 * Zoom out wrapper with feedback
 */
function zoomOutAction() {
    const success = coordinateSystem.zoomOut();
    if (success) {
        showMessage('🔍− Zoomed out', 'info');
        updateStatus('Zoomed out');
    } else {
        showMessage('🔍 Minimum zoom reached', 'info');
    }
}

/**
 * Export canvas as PNG image
 */
function exportCanvasImage() {
    try {
        // Get the p5.js canvas element
        const canvas = document.querySelector('#canvasContainer canvas');

        if (!canvas) {
            showMessage('❌ Canvas not found', 'error');
            return;
        }

        // Convert canvas to data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create download link
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `coordinate-system-${Date.now()}.png`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showMessage('💾 Image exported!', 'success');
        updateStatus('Image saved');

        console.log('💾 Canvas exported as PNG');
    } catch (error) {
        showMessage('❌ Export failed: ' + error.message, 'error');
        console.error('Export error:', error);
    }
}

/**
 * Enable measurement tool
 */
function enableMeasurementTool(type) {
    const success = coordinateSystem.enableMeasurementMode(type);

    if (success) {
        // Update button states
        document.querySelectorAll('#measureDistanceBtn, #measureAngleBtn').forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });

        const activeBtn = type === 'distance'
            ? document.getElementById('measureDistanceBtn')
            : document.getElementById('measureAngleBtn');

        if (activeBtn) {
            activeBtn.style.backgroundColor = '#4CAF50';
            activeBtn.style.color = 'white';
        }

        const message = type === 'distance'
            ? '📏 Distance mode: Click two points to measure'
            : '📐 Angle mode: Click three points (angle at second point)';

        showMessage(message, 'info');
        updateStatus(`Measurement mode: ${type}`);
    }
}

/**
 * Clear measurement tool
 */
function clearMeasurementTool() {
    coordinateSystem.disableMeasurementMode();
    coordinateSystem.clearMeasurements();

    // Reset button states
    document.querySelectorAll('#measureDistanceBtn, #measureAngleBtn').forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    showMessage('✕ Measurements cleared', 'info');
    updateStatus('Ready');
}

/**
 * Show a temporary message
 */
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;

    // Find control panel
    const controlPanel = document.querySelector('.control-panel');

    // Remove existing messages
    const existing = controlPanel.querySelector('.message');
    if (existing) {
        existing.remove();
    }

    // Insert at top of control panel
    controlPanel.insertBefore(messageEl, controlPanel.firstChild);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

/**
 * Update status text
 */
function updateStatus(status) {
    const statusEl = document.getElementById('canvasStatus');
    if (statusEl) {
        statusEl.textContent = status;
    }
}

/**
 * Export current response data
 */
function exportResponse() {
    const response = coordinateSystem.getResponse();
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `coordinate-system-response-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Response exported!', 'success');
}

/**
 * Import configuration from file
 */
function importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const config = JSON.parse(event.target.result);
                document.getElementById('jsonConfig').value = JSON.stringify(config, null, 2);
                applyConfig();
            } catch (error) {
                showMessage('Error reading file: ' + error.message, 'error');
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

/**
 * Export current configuration
 */
function exportConfig() {
    const textarea = document.getElementById('jsonConfig');
    const config = textarea.value;

    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `coordinate-system-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Configuration exported!', 'success');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Z for undo
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        const success = coordinateSystem.undo();
        if (success) {
            showMessage('↶ Undo', 'info');
            updateStatus('Undone');
        } else {
            showMessage('↶ Already at oldest state', 'info');
        }
    }

    // Ctrl/Cmd + Shift + Z for redo
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        const success = coordinateSystem.redo();
        if (success) {
            showMessage('↷ Redo', 'info');
            updateStatus('Redone');
        } else {
            showMessage('↷ Already at newest state', 'info');
        }
    }

    // Ctrl/Cmd + R for reset
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetSystem();
    }

    // Ctrl/Cmd + Enter to apply config
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const textarea = document.getElementById('jsonConfig');
        if (document.activeElement === textarea) {
            e.preventDefault();
            applyConfig();
        }
    }
});

// Add tooltips for keyboard shortcuts
const canvasInfo = document.querySelector('.canvas-info');
if (canvasInfo) {
    canvasInfo.title = 'Shortcuts: Ctrl+Z (Undo), Ctrl+Shift+Z (Redo), Ctrl+R (Reset)';
}

console.log('📝 Keyboard shortcuts enabled:');
console.log('  - Ctrl/Cmd + Z: Undo');
console.log('  - Ctrl/Cmd + Shift + Z: Redo');
console.log('  - Ctrl/Cmd + R: Reset');
console.log('  - Ctrl/Cmd + Enter: Apply config (when in textarea)');
