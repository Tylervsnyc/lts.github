document.addEventListener('DOMContentLoaded', function() {
    const border = document.querySelector('.lightbulb-border');
    if (border) {
        const title = document.querySelector('.quiz-title');
        const rect = title.getBoundingClientRect();
        
        // Configuration
        const bulbSpacing = 20; // Space between bulbs
        const padding = 10;     // Space from title edge
        
        // Calculate number of bulbs needed
        const horizontalBulbs = Math.floor(rect.width / bulbSpacing);
        const verticalBulbs = Math.floor(rect.height / bulbSpacing);
        
        // Create top and bottom rows
        for (let i = 0; i <= horizontalBulbs; i++) {
            // Top bulb
            createBulb(border, {
                left: `${(i * bulbSpacing) + padding}px`,
                top: `${padding}px`
            });
            
            // Bottom bulb
            createBulb(border, {
                left: `${(i * bulbSpacing) + padding}px`,
                top: `${rect.height - padding}px`
            });
        }
        
        // Create left and right columns
        for (let i = 1; i < verticalBulbs; i++) {
            // Left bulb
            createBulb(border, {
                left: `${padding}px`,
                top: `${(i * bulbSpacing) + padding}px`
            });
            
            // Right bulb
            createBulb(border, {
                left: `${rect.width - padding}px`,
                top: `${(i * bulbSpacing) + padding}px`
            });
        }
    }

    // Navigation to age selection
    const startButton = document.querySelector('.big-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            window.location.href = 'age-select.html';
        });
    }
});

function createBulb(container, position) {
    const bulb = document.createElement('div');
    bulb.className = 'lightbulb';
    Object.assign(bulb.style, position);
    bulb.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(bulb);
    return bulb;
}

// Age selection page logic
let goofCount = 0;
const sassyResponses = {
    baby: [
        "Really? You can type? That's impressive for someone who just said WAH-WAH!",
        "Okay tiny human, let's try picking your real age this time..."
    ],
    ship: [
        "Last time I checked, wooden ships don't have fingers to click buttons...",
        "Alright Captain, time to drop anchor and pick your actual age..."
    ]
};

function handleGoofAnswer(type) {
    const sassyElement = document.getElementById('sassy-response');
    sassyElement.textContent = sassyResponses[type][Math.min(goofCount, 1)];
    sassyElement.classList.remove('hidden');
    
    goofCount++;
    
    if (goofCount >= 2) {
        // Remove both goof answers from the screen
        document.querySelectorAll('.goof-answer').forEach(btn => {
            btn.style.display = 'none';
        });
    }
} 