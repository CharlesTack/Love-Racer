const texts = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs.",
        "How razorback-jumping frogs can level six piqued gymnasts!"
    ],
    medium: [
        "The five boxing wizards jump quickly.",
        "Bright vixens jump; dozy fowl quack.",
        "Jinxed wizards pluck ivy from the big quilt."
    ],
    hard: [
        "Crazy Fredrick bought many very exquisite opal jewels.",
        "We promptly judged antique ivory buckles for the next prize.",
        "Sixty zippers were quickly picked from the woven jute bag."
    ]
};

function updateSampleText() {
    const difficulty = this.value;
    const sampleText = texts[difficulty][Math.floor(Math.random() * texts[difficulty].length)];
    document.getElementById('sampleText').textContent = sampleText;
}

document.getElementById('difficultySelect').addEventListener('change', updateSampleText);