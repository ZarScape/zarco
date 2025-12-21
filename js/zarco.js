// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['"Open Sans"', 'sans-serif'] },
            colors: {
                discord: {
                    darkest: '#1e1f22', dark: '#2b2d31', chat: '#313338',
                    light: '#383a40', hover: '#3f4147', divider: '#3f4147',
                    text: '#dbdee1', header: '#f2f3f5', muted: '#949ba4',
                    blurple: '#5865F2', green: '#23a559', yellow: '#f0b232', red: '#f23f43',
                    purple: '#a020f0', streaming: '#593695'
                }
            }
        }
    }
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }, 2500);
});

// UI Interactions
document.addEventListener('DOMContentLoaded', () => {
    const svgMic = `<div style="width: 20px; height: 20px; background-color: currentColor; -webkit-mask-image: url(assets/icons/mic.svg); mask-image: url(assets/icons/mic.svg); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;"></div>`;
    const svgMute = `<img src="assets/icons/mute.svg" style="width: 20px; height: 20px;">`;
    const svgHeadphone = `<div style="width: 20px; height: 20px; background-color: currentColor; -webkit-mask-image: url(assets/icons/headphone.svg); mask-image: url(assets/icons/headphone.svg); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;"></div>`;
    const svgDeafen = `<img src="assets/icons/deafen.svg" style="width: 20px; height: 20px;">`;

    const btnMute = document.getElementById('btn-mute');
    const btnDeafen = document.getElementById('btn-deafen');
    
    if (btnMute && btnDeafen) {
        // Set initial content
        btnMute.innerHTML = svgMic;
        btnDeafen.innerHTML = svgHeadphone;

        let isMuted = false;
        let isDeafened = false;

        btnMute.addEventListener('click', () => {
            isMuted = !isMuted;
            btnMute.innerHTML = isMuted ? svgMute : svgMic;
        });

        btnDeafen.addEventListener('click', () => {
            isDeafened = !isDeafened;
            btnDeafen.innerHTML = isDeafened ? svgDeafen : svgHeadphone;
        });
    }

    // Category Toggle
    const categoryHeader = document.getElementById('category-header');
    const categoryArrow = document.getElementById('category-arrow');
    const categoryChannels = document.getElementById('category-channels');

    if (categoryHeader && categoryArrow && categoryChannels) {
        let isCategoryOpen = true;

        const updateCategoryView = () => {
            if (isCategoryOpen) {
                categoryArrow.style.maskImage = 'url(assets/icons/down-dropdownarrow.svg)';
                categoryChannels.style.display = 'block';
            } else {
                categoryArrow.style.maskImage = 'url(assets/icons/right-dropdownarrow.svg)';
                categoryChannels.style.display = 'none';
            }
        };

        // Initial state for category arrow
        categoryArrow.style.backgroundColor = 'currentColor';
        categoryArrow.style.maskSize = 'contain';
        updateCategoryView();

        categoryHeader.addEventListener('click', (e) => {
            isCategoryOpen = !isCategoryOpen;
            updateCategoryView();
        });
    }

    // Channel Switching
    const channels = document.querySelectorAll('.channel-item');
    const contents = document.querySelectorAll('.channel-content');
    const channelNameDisplay = document.querySelector('#current-channel-name');

    const switchChannel = (targetId) => {
        // Update Sidebar UI
        channels.forEach(c => {
            const isTarget = c.getAttribute('data-channel') === targetId;
            if (isTarget) {
                c.classList.remove('text-discord-muted', 'hover:bg-discord-hover', 'hover:text-discord-text');
                c.classList.add('bg-discord-hover', 'text-white');
            } else {
                c.classList.remove('bg-discord-hover', 'text-white');
                c.classList.add('text-discord-muted', 'hover:bg-discord-hover', 'hover:text-discord-text');
            }
        });

        // Update Content
        contents.forEach(content => {
            if (content.id === `content-${targetId}`) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });

        // Update Header
        if (channelNameDisplay) {
            channelNameDisplay.textContent = targetId;
        }
    };

    channels.forEach(channel => {
        channel.addEventListener('click', () => {
            const targetId = channel.getAttribute('data-channel');
            switchChannel(targetId);
            window.location.hash = targetId;
        });
    });

    // Handle Hash on Load
    const hash = window.location.hash.substring(1);
    if (hash === 'tos' || hash === 'privacy') {
        switchChannel(hash);
    }
});