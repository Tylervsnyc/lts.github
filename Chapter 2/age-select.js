document.addEventListener('DOMContentLoaded', function() {
    const fluffbuttResponses = [
        "Oh, honey... Did your paw slip on the mouse?",
        "Nice try, but I wasn't born yesterday... unlike you, apparently!",
        "*Licks paw disapprovingly* Really? That's what you're going with?",
        "I may cough up hairballs, but at least I know my age!",
        "*Rolls eyes* Let's try this again, shall we?"
    ];

    const ageOptions = document.querySelector('.age-options');
    const response = document.querySelector('.fluffbutt-response');
    const responseText = document.querySelector('.response-text');
    let jokeAttempts = 0;

    ageOptions.addEventListener('click', function(e) {
        if (e.target.classList.contains('age-button')) {
            if (e.target.dataset.joke === 'true') {
                jokeAttempts++;
                // Show random response
                responseText.textContent = fluffbuttResponses[Math.floor(Math.random() * fluffbuttResponses.length)];
                response.classList.remove('hidden');
                
                // Remove joke options if this is the second attempt
                if (jokeAttempts >= 2) {
                    setTimeout(() => {
                        document.querySelectorAll('.joke-option').forEach(button => {
                            button.remove();
                        });
                        response.classList.add('hidden');
                    }, 3000);
                } else {
                    setTimeout(() => {
                        response.classList.add('hidden');
                    }, 3000);
                }
            } else {
                // Handle real age selection
                // Redirect to appropriate quiz page based on age
                const age = e.target.textContent;
                // window.location.href = `quiz-${age}.html`;
                console.log(`Selected age: ${age}`);
            }
        }
    });
}); 