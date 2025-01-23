document.addEventListener('DOMContentLoaded', function() {
    // Lightbulb generation for main page
    const container = document.querySelector('.lightbulb-container');
    if (container) {  // Only run this code on pages with lightbulb container
        const title = document.querySelector('.watercolor-text');
        const titleRect = title.getBoundingClientRect();
        const padding = 5; // Tight padding around the sign
        
        // Calculate positions relative to the title element
        const top = titleRect.top;
        const left = titleRect.left;
        const width = titleRect.width;
        const height = titleRect.height;
        
        // Number of bulbs for each side
        const horizontalBulbs = 30;
        const verticalBulbs = 15;
        
        // Create bulbs for top and bottom edges
        for (let i = 0; i < horizontalBulbs; i++) {
            // Top edge bulb
            const topBulb = createBulb();
            topBulb.style.left = `${left + (width * i / horizontalBulbs)}px`;
            topBulb.style.top = `${top + padding}px`;
            container.appendChild(topBulb);
            
            // Bottom edge bulb
            const bottomBulb = createBulb();
            bottomBulb.style.left = `${left + (width * i / horizontalBulbs)}px`;
            bottomBulb.style.top = `${top + height - padding}px`;
            container.appendChild(bottomBulb);
        }
        
        // Create bulbs for left and right edges
        for (let i = 0; i < verticalBulbs; i++) {
            // Left edge bulb
            const leftBulb = createBulb();
            leftBulb.style.left = `${left + padding}px`;
            leftBulb.style.top = `${top + (height * i / verticalBulbs)}px`;
            container.appendChild(leftBulb);
            
            // Right edge bulb
            const rightBulb = createBulb();
            rightBulb.style.left = `${left + width - padding}px`;
            rightBulb.style.top = `${top + (height * i / verticalBulbs)}px`;
            container.appendChild(rightBulb);
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

function createBulb() {
    const bulb = document.createElement('div');
    bulb.className = 'lightbulb';
    bulb.style.animationDelay = `${Math.random() * 0.5}s`;
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