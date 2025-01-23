document.addEventListener('DOMContentLoaded', function() {
    // Lightbulb generation for main page
    const container = document.querySelector('.lightbulb-container');
    if (container) {  // Only run this code on pages with lightbulb container
        const numBulbs = 50;
        
        for (let i = 0; i < numBulbs; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'lightbulb';
            
            const angle = (i / numBulbs) * 2 * Math.PI;
            const x = 50 + 50 * Math.cos(angle);
            const y = 50 + 50 * Math.sin(angle);
            
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
    console.log(`Selected age group: ${ageGroup}`);
    // Add your age selection logic here
} 