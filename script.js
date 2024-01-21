function analyzeFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        // Create an audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        file.arrayBuffer().then(arrayBuffer => {
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                // Calculate bitrate
                const bitrate = calculateBitrate(file.size, audioBuffer.duration);
                const quality = determineQuality(bitrate);
                displayResult(quality, bitrate);
            });
        });
    }
}

function calculateBitrate(fileSize, duration) {
    // Calculate bitrate in kbps
    return ((fileSize * 8) / duration) / 1000;
}

function determineQuality(bitrate) {
    // Determine audio quality based on bitrate
    if (bitrate < 128) {
        return 'Low quality';
    } else if (bitrate >= 128 && bitrate < 320) {
        return 'High quality';
    } else {
        return 'CDQ';
    }
}

function displayResult(quality, bitrate) {
    let outputDiv = document.getElementById('output');
    outputDiv.innerText = `${quality}, ${bitrate.toFixed(2)} kbps`;

    // Remove previous quality class
    outputDiv.classList.remove('low-quality', 'high-quality', 'cd-quality');

    // Add new quality class
    if (quality === 'Low quality') {
        outputDiv.classList.add('low-quality');
    } else if (quality === 'High quality') {
        outputDiv.classList.add('high-quality');
    } else if (quality === 'CDQ') {
        outputDiv.classList.add('cd-quality');
    }
}
