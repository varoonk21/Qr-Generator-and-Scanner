let textInput = document.getElementById("textInput");
let textCount = document.getElementById('textCount');
let widthInput = document.getElementById('widthInput');
let heightInput = document.getElementById('heightInput');
let errorSelector = document.getElementById('errorSelector');
let bgColor = document.getElementById('bg-color-input');
let dotsColor = document.getElementById('dots-color-input');
let dotsStyleSelector = document.getElementById('dots-style-selector');
let extensionSelector = document.getElementById('extension-selector');
let downloadBtn = document.getElementById('download-btn');
let logoInput = document.getElementById('file_input');
let clearBtn = document.getElementById('clear-btn');
let logoMarginInput = document.getElementById('logo-margin-input');
let marginInput = document.getElementById('margin-input');
let typeNumberSelector = document.getElementById('type-number-selector');
let modeSelector = document.getElementById('mode-selector');
let advanceOptionsOpener = document.getElementById('advanceOptions-opener');
let advanceOptionsCloser = document.getElementById('advanceOptions-closer');
let advanceOptionsContainer = document.getElementById('AdvanceOptions-container');
let ImageOptionsOpener = document.getElementById('ImageOptions-opener');
let ImageOptionsCloser = document.getElementById('ImageOptions-closer');
let ImageOptionsContainer = document.getElementById('ImageOptions-container');
let dotsOptionsOpener = document.getElementById('dotsOptions-opener');
let dotsOptionsCloser = document.getElementById('dotsOptions-closer');
let dotsOptionsContainer = document.getElementById('dotsOptions-container');



const updateCounter = debounce((text) => {
  textCount.innerText = `${text.length}/2000`;
  }, 100);


const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "canvas", // or "svg"
      data: "https://github.com/varoonk21",
      image: "", //logo
      margin: 10, 
      dotsOptions: {
        color: "#000000",
        type: "square" // "rounded", "dots", "classy", "square", etc.
      },
      backgroundOptions: {
        color: "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
      qrOptions: {
        typeNumber: '',
        mode: 'Byte', //'Numeric' 'Alphanumeric' 'Byte' 'Kanji'
        errorCorrectionLevel: 'M'
      },
    });

    qrCode.append(document.getElementById("canvas"));




widthInput.addEventListener("input", (e)=>{
  let  width = e.target.value;
  if (!width) {
    width = 300;
  }
qrCode.update({width: width})
});

 heightInput.addEventListener("input", (e)=>{
let  height = e.target.value;
  if (!height) {
    height = 300;
  }
qrCode.update({height: height})
});

bgColor.addEventListener("input", (e)=>{
 qrCode.update({backgroundOptions: { color : `${e.target.value}`}});
});






//Dots options:
dotsOptionsOpener.addEventListener('click', (e)=>{
  dotsOptionsOpener.classList.add("hidden");
  dotsOptionsContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2');
  dotsOptionsCloser.classList.remove("hidden");
  dotsOptionsContainer.classList.remove("hidden");
});

dotsOptionsCloser.addEventListener('click', (e)=>{
  dotsOptionsCloser.classList.add("hidden");
  dotsOptionsContainer.classList.remove('grid', 'grid-cols-1', 'sm:grid-cols-2');
  dotsOptionsOpener.classList.remove("hidden");
  dotsOptionsContainer.classList.add("hidden");
});
dotsColor.addEventListener('input', (e)=>{
 qrCode.update({dotsOptions: { color : `${e.target.value}`}});
});

dotsStyleSelector.addEventListener('change', (e)=>{
 qrCode.update({dotsOptions: { type : `${e.target.value}`}});
});


//Advance options
advanceOptionsOpener.addEventListener('click', (e)=>{
  advanceOptionsOpener.classList.add("hidden");
  advanceOptionsContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2');
  advanceOptionsCloser.classList.remove("hidden");
  advanceOptionsContainer.classList.remove("hidden");
});

advanceOptionsCloser.addEventListener('click', (e)=>{
  advanceOptionsCloser.classList.add("hidden");
  advanceOptionsContainer.classList.remove('grid', 'grid-cols-1', 'sm:grid-cols-2');
  advanceOptionsOpener.classList.remove("hidden");
  advanceOptionsContainer.classList.add("hidden");
});

errorSelector.addEventListener('change', (e)=>{
 qrCode.update({qrOptions: { errorCorrectionLevel : `${e.target.value}`}});
});

typeNumberSelector.addEventListener('change', (e)=>{
 qrCode.update({qrOptions: { typeNumber : `${e.target.value}`}});
});

modeSelector.addEventListener('change', (e)=>{
 qrCode.update({qrOptions: { mode : `${e.target.value}`}});
});



//image options
ImageOptionsOpener.addEventListener('click', (e)=>{
  ImageOptionsOpener.classList.add("hidden");
  ImageOptionsContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2');
  ImageOptionsCloser.classList.remove("hidden");
  ImageOptionsContainer.classList.remove("hidden");
});

ImageOptionsCloser.addEventListener('click', (e)=>{
  ImageOptionsCloser.classList.add("hidden");
  ImageOptionsContainer.classList.remove('grid', 'grid-cols-1', 'sm:grid-cols-2');
  ImageOptionsOpener.classList.remove("hidden");
  ImageOptionsContainer.classList.add("hidden");
});

logoInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      clearBtn.classList.remove("hidden");
      logoMarginInput.removeAttribute('disabled');
      const imgURL = URL.createObjectURL(file);
      qrCode.update({image: imgURL})
    }
  });

clearBtn.addEventListener('click', (e)=>{
  logoInput.value = "";
 qrCode.update({image: ""})
 clearBtn.classList.add("hidden");
 logoMarginInput.setAttribute('disabled', true);
});

logoMarginInput.addEventListener("input", (e)=>{
 qrCode.update({imageOptions: { margin : `${e.target.value}`}});
});
marginInput.addEventListener("input", (e)=>{
  let  margin = e.target.value;
  if (!margin) {
    margin = 10;
  }
 qrCode.update({margin : `${margin}`});
});




     // ✅ Debounce utility function
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // ✅ Update QR code debounced
  const debouncedQr = debounce((text) => {
    qrCode.update({ data: text });
  }, 300); // 500ms delay


  // ✅ Add event listener once
  textInput.addEventListener("input", function (e) {
    let  text = e.target.value;
    if (!text) {
    text = "https://github.com/varoonk21";
    }
    debouncedQr(text);
    updateCounter(e.target.value);
  });



downloadBtn.addEventListener('click', ()=>{
  const ext = extensionSelector.value
      qrCode.download({ name: "my-qr-code", extension: `${ext}`});
});

    
    