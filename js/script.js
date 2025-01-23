document.addEventListener('DOMContentLoaded', function() {
    // Lightbulb generation for main page
    const container = document.querySelector('.lightbulb-container');
    if (container) {  // Only run this code on pages with lightbulb container
        const title = document.querySelector('.watercolor-text');
        const titleBox = title.getBoundingClientRect();
        const padding = 10; // Smaller padding for tighter border
        
        // Get the title's golden frame for positioning
        const frame = title.querySelector('::before') || title;
        const frameRect = frame.getBoundingClientRect();
        
        // Number of bulbs for each side (adjusted for rectangle shape)
        const horizontalBulbs = 30; // More bulbs for longer sides
        const verticalBulbs = 15;   // Fewer bulbs for shorter sides
        
        // Create top and bottom rows
        for (let i = 0; i < horizontalBulbs * 2; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'lightbulb';
            
            const progress = i / horizontalBulbs;
            const x = progress * titleBox.width - padding;
            const y = i < horizontalBulbs ? -padding : titleBox.height + padding;
            
            bulb.style.left = `${x}px`;
            bulb.style.top = `${y}px`;
            bulb.style.animationDelay = `${Math.random() * 0.5}s`;
            
            container.appendChild(bulb);
        }
        
        // Create left and right columns
        for (let i = 0; i < verticalBulbs * 2; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'lightbulb';
            
            const progress = i / verticalBulbs;
            const y = progress * titleBox.height;
            const x = i < verticalBulbs ? -padding : titleBox.width + padding;
            
            bulb.style.left = `${x}px`;
            bulb.style.top = `${y}px`;
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