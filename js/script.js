document.addEventListener('DOMContentLoaded', function() {
    // Lightbulb generation
    const container = document.querySelector('.lightbulb-container');
    const numBulbs = 50; // More bulbs for the Price is Right effect
    
    for (let i = 0; i < numBulbs; i++) {
        const bulb = document.createElement('div');
        bulb.className = 'lightbulb';
        
        // Calculate position around the border
        const angle = (i / numBulbs) * 2 * Math.PI;
        
        // Position the bulb on the golden border
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);
        
        bulb.style.left = `${x}%`;
        bulb.style.top = `${y}%`;
        
        // Add random delay to animation
        bulb.style.animationDelay = `${Math.random() * 0.5}s`;
        
        container.appendChild(bulb);
    }

    // Navigation to age selection
    const startButton = document.querySelector('.big-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            window.location.href = 'age-select.html';
        });
    }
});

// Add flashing animation
@keyframes bulbFlash {
    0%, 100% {
        opacity: 1;
        box-shadow: 
            0 0 10px #fff,
            0 0 20px #fff,
            0 0 30px #f7d547,
            0 0 40px #f7d547;
    }
    50% {
        opacity: 0.5;
        box-shadow: 
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #f7d547,
            0 0 20px #f7d547;
    }
}

let goofCount = 0;
const sassyResponses = {
    baby: [
        "Really? You can type? That's impressive for someone who just said 'WAH WAH'",
        "Okay tiny human, let's try this one more time..."
    ],
    ship: [
        "I'm pretty sure ships can't use computers. Nice try though!",
        "Alright, you've had your fun. Time to pick your real age..."
    ]
};

function handleGoofAnswer(type) {
    const sassyElement = document.getElementById('sassy-response');
    sassyElement.textContent = sassyResponses[type][Math.min(goofCount, 1)];
    sassyElement.classList.remove('hidden');
    
    goofCount++;
    
    if (goofCount >= 2) {
        // Hide goof answers and show real age options
        document.querySelectorAll('.goof-answer').forEach(btn => btn.style.display = 'none');
        document.querySelectorAll('.real-answer').forEach(btn => btn.classList.remove('hidden'));
    }
}

function selectAge(ageGroup) {
    // Handle the actual age selection
    // You can add logic here to redirect to the appropriate game version
    console.log(`Selected age group: ${ageGroup}`);
    // Add your age selection logic here
} 