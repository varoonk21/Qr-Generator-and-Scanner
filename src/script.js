   const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "canvas", // or "svg"
      data: "https://example.com",
      image: "", // can embed a logo
      dotsOptions: {
        color: "#000",
        type: "rounded" // "rounded", "dots", "classy", "square", etc.
      },
      backgroundOptions: {
        color: "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
      }
    });

    qrCode.append(document.getElementById("canvas"));

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
  const debouncedUpdate = debounce((text) => {
    qrCode.update({ data: text });
  }, 500); // 500ms delay

  // ✅ Add event listener once
  document.getElementById("textInput").addEventListener("input", function (e) {
    debouncedUpdate(e.target.value);
  });

    function downloadQR() {
      qrCode.download({ name: "my-qr-code", extension: "png" }); // jpg, svg also supported
    }