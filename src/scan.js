const reader = document.getElementById('reader');
const cameraPlaceholder = document.getElementById('camera-placeholder');
const cameraBox = document.getElementById('camera-box');
const startBtn = document.getElementById('start-btn');
const uploadBtn = document.getElementById('upload-input');
const scannedText = document.getElementById('scannedText');
const startSVG = document.getElementById('start-svg');
const stopSVG = document.getElementById('stop-svg');
const btnTextSpan = startBtn.querySelector('span'); // Get the text span
const copyBtn = document.getElementById('copy-btn');
const copybtnText = copyBtn.querySelector('span');
const copySVG = document.getElementById('copy-svg');
const copiedSVG = document.getElementById('copied-svg');
const saveBtn = document.getElementById('save-btn');
const openBtn = document.getElementById('open-btn');
const scannedTime = document.getElementById('date-time');

// function currentTime() {
//     console.log(dayjs);
    
// }

const html5QrCode = new Html5Qrcode("reader");

let isScanning = false;
let currentCameraId = null;

function startCamera() {
    return Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            currentCameraId = devices[0].id;
            reader.classList.remove("hidden");

            return html5QrCode.start(
                currentCameraId,
                {
                    fps: 10,
                    qrbox: { width: 150, height: 150 }
                },
                (decodedText, decodedResult) => {

                    console.log("Decoded:", decodedText);
                    scannedTime.innerText = dayjs().format("DD-MM-YYYY hh:mm:ss A");
                    scannedText.innerText = decodedText;
                },
                (errorMessage) => {
                    console.warn("Scan error:", errorMessage);
                }
            );
        }
        throw new Error("No cameras found.");
    });
}

function stopCamera() {
    return html5QrCode.stop().then(() => {
        reader.classList.add("hidden");
        cameraPlaceholder.classList.remove("hidden");
        cameraBox.classList.add("aspect-square");
    });
}

function updateButtonUI(isScanning) {
    if (isScanning) {
        // Show stop icon and state
        startSVG.classList.add("hidden");
        stopSVG.classList.remove("hidden");
        btnTextSpan.innerText = "Stop Scan";
        startBtn.classList.remove("bg-gradient-to-r", "from-purple-600", "to-pink-600");
        startBtn.classList.add("bg-red-600", "hover:bg-red-700");
    } else {
        // Show start icon and state
        startSVG.classList.remove("hidden");
        stopSVG.classList.add("hidden");
        btnTextSpan.innerText = "Start Scan";
        startBtn.classList.add("bg-gradient-to-r", "from-purple-600", "to-pink-600");
        startBtn.classList.remove("bg-red-600", "hover:bg-red-700");
    }
}

startBtn.addEventListener('click', async () => {
    try {
        if (!isScanning) {
            // Start scanning
            cameraPlaceholder.classList.add("hidden");
            cameraBox.classList.remove("aspect-square");
            
            await startCamera();
            isScanning = true;
            updateButtonUI(true);
        } else {
            // Stop scanning
            await stopCamera();
            isScanning = false;
            updateButtonUI(false);
        }
    } catch (err) {
        console.error(isScanning ? "Error stopping camera:" : "Error starting camera:", err);
        if (!isScanning) {
            alert(`Failed to start camera: ${err.message}`);
        }
    }
});

uploadBtn.addEventListener('change', (e) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const imageFile = e.target.files[0];

  html5QrCode.scanFile(imageFile, true)
    .then(decodedText => {
      console.log("Decoded text:", decodedText);
      scannedTime.innerText = dayjs().format("DD-MM-YYYY hh:mm:ss A");
      scannedText.innerText = decodedText;
    })
    .catch(err => {
      console.error(`Error scanning file. Reason: ${err}`);
      scannedText.innerText = "❌ No QR code found in the image.";
    });

  // ✅ Optional: reset input so same file can be selected again
  uploadBtn.value = "";
});


copyBtn.addEventListener('click', ()=>{
    setTimeout(() => {
        copiedSVG.classList.add("hidden");
        copySVG.classList.remove("hidden");
        copybtnText.innerText = "Copy";
        copyBtn.classList.remove( "bg-green-500/20","border-green-500/30", "text-green-300","hover:bg-green-500/20");
        copyBtn.classList.add( "bg-white/10","border-white/20", "text-white", "hover:bg-white/20");
    }, 1500);


copiedSVG.classList.remove("hidden");
copySVG.classList.add("hidden");
copybtnText.innerText = "Copied!";
copyBtn.classList.add( "bg-green-500/20","border-green-500/30", "text-green-300","hover:bg-green-500/20");
copyBtn.classList.remove( "bg-white/10","border-white/20", "text-white", "hover:bg-white/20");
console.log(scannedText.innerText);

navigator.clipboard.writeText(scannedText.innerText);
});

saveBtn.addEventListener('click', ()=>{
   saveTextAsFile(scannedText.innerText); 
});

function saveTextAsFile(inputText) {
  const textFile = new Blob([inputText], { type: 'text/plain' });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(textFile, 'scanned-text.txt');
  } else { 
    const link = document.createElement("a");
    link.download = 'scanned-text.txt';
    link.href = window.URL.createObjectURL(textFile);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

openBtn.addEventListener('click', () => {
    let rawText = scannedText.innerText.trim();

    if (!/^https?:\/\//i.test(rawText) && /^[\w.-]+\.[a-z]{2,}$/i.test(rawText)) {
        rawText = "https://" + rawText;
    }
    if (isValidUrl(rawText)) {
        window.open(rawText, "_blank");
    } else {
        
        console.log("❌ The scanned result is not a valid URL.\nPlease make sure it starts with 'http://' or 'https://'.");
    }
});

function isValidUrl(input) {
    try {
        const url = new URL(input);
        return ["http:", "https:"].includes(url.protocol);
    } catch (e) {
        return false;
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (isScanning) {
        html5QrCode.stop().catch(err => {
            console.error("Cleanup error:", err);
        });
    }
});