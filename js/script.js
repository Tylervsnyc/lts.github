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
        "Wow, a typing baby! Next you'll tell me you can do calculus...",
        "Still claiming to be a baby? Let's try picking your real age this time..."
    ],
    ship: [
        "Last time I checked, wooden ships don't have fingers to click buttons...",
        "Okay Captain, time to drop anchor and pick your actual age..."
    ]
};

function handleGoofAnswer(type) {
    const sassyElement = document.getElementById('sassy-response');
    sassyElement.textContent = sassyResponses[type][Math.min(goofCount, 1)];
    sassyElement.classList.remove('hidden');
    
    goofCount++;
    
    if (goofCount >= 2) {
        // Disable the goof answer buttons
        document.querySelectorAll('.age-button').forEach(btn => {
            if (btn.onclick.toString().includes('handleGoofAnswer')) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
            }
        });
    }
}

function selectAge(ageGroup) {
    if (goofCount < 2) {
        const sassyElement = document.getElementById('sassy-response');
        sassyElement.textContent = "Nice try, but maybe try being silly first? Mr. Fluffbutt insists!";
        sassyElement.classList.remove('hidden');
        return;
    }
    // Handle the actual age selection
    console.log(`Selected age group: ${ageGroup}`);
    // Add your age selection logic here
} 