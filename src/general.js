const generateBtn = document.getElementById('generate-btn');
const generateContainer = document.getElementById('generate-container');
const scanBtn = document.getElementById('scan-btn');
const scannerContainer = document.getElementById('scanner-container');

scanBtn.addEventListener('click', ()=>{
    scannerContainer.classList.remove("hidden");
    scannerContainer.classList.add('flex', 'flex-col', 'md:flex-row');
    generateContainer.classList.add("hidden");
    generateContainer.classList.remove('flex', 'flex-col', 'md:flex-row');
    scanBtn.classList.add('bg-white');
    scanBtn.classList.replace('text-white', 'text-black');
    scanBtn.classList.remove('hover:bg-white/10');
    generateBtn.classList.remove('bg-white');
    generateBtn.classList.add('hover:bg-white/10');
    generateBtn.classList.replace('text-black', 'text-white');
});
generateBtn.addEventListener('click', ()=>{
    generateContainer.classList.remove("hidden");
    generateContainer.classList.add('flex', 'flex-col', 'md:flex-row');
    scannerContainer.classList.add("hidden");
    scannerContainer.classList.remove('flex', 'flex-col', 'md:flex-row');
    generateBtn.classList.add('bg-white');
    generateBtn.classList.remove('hover:bg-white/10');
    generateBtn.classList.replace('text-white', 'text-black');
    scanBtn.classList.remove('bg-white');
    scanBtn.classList.add('hover:bg-white/10');
    scanBtn.classList.replace('text-black', 'text-white');
});