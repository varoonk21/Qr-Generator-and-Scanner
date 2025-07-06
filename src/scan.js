let reader = document.getElementById('reader');
let cameraPlaceholder = document.getElementById('camera-placeholder');
let cameraBox = document.getElementById('camera-box');
let cameraId;

// This method will trigger user permissions
Html5Qrcode.getCameras().then(devices => {
  /**
   * devices would be an array of objects of type:
   * { id: "id", label: "label" }
   */
  if (devices && devices.length) {
    
    
    cameraId = devices[0].id;
    cameraPlaceholder.classList.add("hidden");
    //cameraBox.classList.remove("aspect-square");
    //startCamera(cameraId);
    // .. use this to start scanning.
  }
}).catch(err => {
  // handle err
});

function startCamera(cameraId) {
    const html5QrCode = new Html5Qrcode( "reader");
html5QrCode.start(
  cameraId, 
  {
    fps: 10,    // Optional, frame per seconds for qr code scanning
    qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
  },
  (decodedText, decodedResult) => {
    console.log(decodedText);
    // do something when code is read
  },
  (errorMessage) => {
    // parse error, ignore it.
  })
.catch((err) => {
  // Start failed, handle it.
});
}
