lucide.createIcons();
document.addEventListener('contextmenu', event => event.preventDefault());

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Custom Cursor Logic
const cursor = document.getElementById('cursor');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

const speed = 0.15; 
let lastAngle = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * speed;
    cursorY += distY * speed;

    let angle = lastAngle;
    
    if (Math.abs(distX) > 0.5 || Math.abs(distY) > 0.5) {
        angle = Math.atan2(distY, distX) * (180 / Math.PI) + 90;
        lastAngle = angle;
    }

    cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0) rotate(${angle}deg)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();