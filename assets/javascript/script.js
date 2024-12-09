document.addEventListener('DOMContentLoaded', function () {
    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The only thing we have to fear is fear itself."
    ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const timeDisplay = document.getElementById('time');
    const userInput = document.getElementById('user-input');
    const levelDisplay = document.getElementById('level');
    const wpmDisplay = document.getElementById('wpm');
    const retryButton = document.getElementById('retry-btn');
    const instructionsBtn = document.getElementById('instructions-btn');
    const instructionsModal = new bootstrap.Modal(document.getElementById('instructionsModal'));

    let startTime;
    let endTime;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function startTimer() {
        startTime = new Date();
    }

    function stopTimer() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        timeDisplay.textContent = `Time: ${timeTaken.toFixed(2)} seconds`;
        calculateWPM(timeTaken);
    }

    function calculateWPM(timeTaken) {
        const textLength = sampleTextDiv.textContent.split(' ').length;
        const wpm = (textLength / timeTaken) * 60;
        wpmDisplay.textContent = `WPM: ${wpm.toFixed(2)}`;
    }

    function updateSampleText() {
        const difficulty = difficultySelect.value;
        let textArray;
        if (difficulty === 'easy') {
            textArray = easyTexts;
        } else if (difficulty === 'medium') {
            textArray = mediumTexts;
        } else if (difficulty === 'hard') {
            textArray = hardTexts;
        }
        const randomText = getRandomText(textArray);
        sampleTextDiv.textContent = randomText;
        userInput.value = '';
        startTime = null;
        endTime = null;
        timeDisplay.textContent = 'Time: 0.00 seconds';
        wpmDisplay.textContent = 'WPM: 0.00';
    }

    function updateTypingFeedback() {
        const sampleWords = sampleTextDiv.textContent.split(' ');
        const userWords = userInput.value.split(' ');
        let feedbackHTML = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                feedbackHTML += `<span class="correct">${sampleWords[i]}</span> `;
            } else if (userWords[i]) {
                feedbackHTML += `<span class="incorrect">${sampleWords[i]}</span> `;
            } else {
                feedbackHTML += `<span>${sampleWords[i]}</span> `;
            }
        }

        sampleTextDiv.innerHTML = feedbackHTML.trim();
    }

    userInput.addEventListener('input', function () {
        if (!startTime) {
            startTimer();
        }
        updateTypingFeedback();
    });

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            stopTimer();
        }
    });

    difficultySelect.addEventListener('change', updateSampleText);

    retryButton.addEventListener('click', function () {
        updateSampleText();
        userInput.value = '';
        startTime = null;
        endTime = null;
        timeDisplay.textContent = 'Time: 0.00 seconds';
        wpmDisplay.textContent = 'WPM: 0.00';
    });

    instructionsBtn.addEventListener('click', function () {
        instructionsModal.show();
    });

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});