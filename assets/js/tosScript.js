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

// Typing Effect
const titleElement = document.querySelector('h1');
const textToType = titleElement.innerText;
titleElement.innerText = '';
titleElement.classList.add('typing-cursor');

let charIndex = 0;
function type() {
    if (charIndex < textToType.length) {
        titleElement.innerText += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(() => titleElement.classList.remove('typing-cursor'), 1000);
    }
}
setTimeout(type, 300);

// Staggered Fade Up Animation
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.classList.add('fade-up');
    section.style.animationDelay = `${(index * 0.1) + 0.2}s`;
});