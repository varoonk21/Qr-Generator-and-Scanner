const video = document.getElementById('video');
const cameraSelect = document.getElementById('camera-select');
const cameraPlaceholder = document.getElementById('camera-placeholder');
const cameraBox = document.getElementById('camera-box');
const startBtn = document.getElementById('start-btn');
const uploadBtn = document.getElementById('upload-input');
const scannedText = document.getElementById('scannedText');
const scannedTime = document.getElementById('date-time');

const startSVG = document.getElementById('start-svg');
const stopSVG = document.getElementById('stop-svg');
const btnTextSpan = startBtn.querySelector('span'); // Get the text span


const fileTag = document.getElementById('file-tag');
const cameraTag = document.getElementById('camera-tag');
const copyBtn = document.getElementById('copy-btn');
const copybtnText = copyBtn.querySelector('span');
const copySVG = document.getElementById('copy-svg');
const copiedSVG = document.getElementById('copied-svg');
const saveBtn = document.getElementById('save-btn');
const openBtn = document.getElementById('open-btn');

const githubIcon = document.getElementById('github-icon');


scannedTime.innerText = dayjs().format("DD-MM-YYYY hh:mm:ss A");

let qrScanner = null;
let scanning = false;
let scannerInitialized = false;

async function initScanner() {
  if (scannerInitialized) return;

  qrScanner = new QrScanner(video, result => {
    cameraTag.classList.remove('hidden');
    fileTag.classList.add('hidden');
    scannedTime.innerText = dayjs().format("DD-MM-YYYY hh:mm:ss A");
    if (isValidUrl(result.data)) {
            openBtn.classList.replace('hidden', 'flex');
        }
    
    scannedText.textContent = result.data || result;

    const svg = qrScanner.$overlay?.querySelector('svg.scan-region-highlight-svg');
    
            if (svg) {
              svg.classList.add('success');
              setTimeout(() => svg.classList.remove('success'), 1000);
            }
  }, {
    returnDetailedScanResult: true,
    highlightScanRegion: true
  });

  await loadCameras(); // Load available cameras
  scannerInitialized = true;
}

// 👂 Listen for custom event from general.js
window.addEventListener('init-scanner', async () => {
  await initScanner(); // Delay camera setup until scanner tab is clicked
});


  // Load and list cameras
    async function loadCameras() {
      const cameras = await QrScanner.listCameras(true);
      cameraSelect.innerHTML = '';
      cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label || `Camera ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
      });
    }

    // Handle camera change
    cameraSelect.addEventListener('change', async () => {
      const selectedCamera = cameraSelect.value;
      if (scanning) {
        await qrScanner.setCamera(selectedCamera);
      }
    });

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

// Toggle scanning
    startBtn.addEventListener('click', async () => {
  if (scanning) {
    await qrScanner.stop();
    cameraPlaceholder.style.display = 'flex';
    video.classList.add('hidden');
    scanning = false;
    updateButtonUI(scanning);
  } else {
    await qrScanner.start();
    await qrScanner.setCamera(cameraSelect.value);
    cameraPlaceholder.style.display = 'none';
    video.classList.remove('hidden');
    scanning = true;
    updateButtonUI(scanning);
  }
});

// Image file upload handler
    
      uploadBtn.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;

      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .catch(err => {
          scannedText.textContent = "❌ Failed to scan image. (Try Again)";
          console.error(err);
        });

      if (result?.data) {
        cameraTag.classList.add('hidden');
        fileTag.classList.remove('hidden');
        scannedTime.innerText = dayjs().format("DD-MM-YYYY hh:mm:ss A");
        scannedText.textContent = result.data;
        if (isValidUrl(result.data)) {
            openBtn.classList.replace('hidden', 'flex');
        }
      }
      uploadBtn.value = "";
    });

    

//copy button
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

//Save Button
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


    githubIcon.addEventListener('click', ()=>{
         window.open("https://github.com/varoonk21",  "_blank");
    });