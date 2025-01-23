document.addEventListener('DOMContentLoaded', function() {
    // Lightbulb generation for main page
    const container = document.querySelector('.lightbulb-container');
    if (container) {  // Only run this code on pages with lightbulb container
        const numBulbs = 60; // Increased for better coverage
        const title = document.querySelector('.watercolor-text');
        const rect = title.getBoundingClientRect();
        
        // Create bulbs for top and bottom
        for (let i = 0; i < numBulbs/2; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'lightbulb';
            
            // Position horizontally along top or bottom
            const x = (i / (numBulbs/4)) * 100;
            const y = i < numBulbs/4 ? -10 : 110; // -10 for top, 110 for bottom
            
            bulb.style.left = `${x}%`;
            bulb.style.top = `${y}%`;
            bulb.style.animationDelay = `${Math.random() * 0.5}s`;
            
            container.appendChild(bulb);
        }
        
        // Create bulbs for left and right sides
        for (let i = 0; i < numBulbs/2; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'lightbulb';
            
            // Position vertically along left or right
            const y = (i / (numBulbs/4)) * 100;
            const x = i < numBulbs/4 ? -10 : 110; // -10 for left, 110 for right
            
            bulb.style.left = `${x}%`;
            bulb.style.top = `${y}%`;
            bulb.style.animationDelay = `${Math.random() * 0.5}s`;
            
            container.appendChild(bulb);
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

function selectAge(ageGroup) {
    // Handle the actual age selection
    console.log(`Selected age group: ${ageGroup}`);
    // Add your age selection logic here
} 