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

const updateCounter = debounce((text) => {
  textCount.innerText = `${text.length}/2000`;
  }, 100);


const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "canvas", // or "svg"
      data: "https://example.com",
      image: "", //logo
      margin: 10, 
      dotsOptions: {
        color: "#000",
        type: "square" // "rounded", "dots", "classy", "square", etc.
      },
      backgroundOptions: {
        color: "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
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
  console.log(e.target.value);
 qrCode.update({backgroundOptions: { color : `${e.target.value}`}});
});

dotsColor.addEventListener('input', (e)=>{
  console.log(e.target.value);
 qrCode.update({dotsOptions: { color : `${e.target.value}`}});
});

dotsStyleSelector.addEventListener('change', (e)=>{
  console.log(e.target.value);
 qrCode.update({dotsOptions: { type : `${e.target.value}`}});
});

logoInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      clearBtn.classList.remove("hidden");
      const imgURL = URL.createObjectURL(file);
      console.log('Image URL:', imgURL);
      qrCode.update({image: imgURL})
    }
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

clearBtn.addEventListener('click', (e)=>{
  logoInput.value = "";
 qrCode.update({image: ""})
 clearBtn.classList.add("hidden");
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
    debouncedQr(e.target.value);
    updateCounter(e.target.value);
  });



downloadBtn.addEventListener('click', ()=>{
  const ext = extensionSelector.value
      qrCode.download({ name: "my-qr-code", extension: `${ext}`});
});

    
    