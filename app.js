if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

let deferredPrompt = null;
const pwaBar = document.getElementById('pwaBar');
const installButton = document.getElementById('installButton');
const pwaStatus = document.getElementById('pwaStatus');

function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

if (isStandalone() && pwaBar) {
    pwaBar.hidden = true;
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaBar && !isStandalone()) {
        pwaBar.hidden = false;
    }
});

if (installButton) {
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        installButton.disabled = true;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (outcome === 'accepted' && pwaBar) {
            pwaBar.hidden = true;
        }
        installButton.disabled = false;
    });
}

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    if (pwaBar) pwaBar.hidden = true;
});

if (pwaStatus && /iPhone|iPad|iPod/.test(navigator.userAgent) && !isStandalone()) {
    pwaStatus.textContent = 'আইফোনে ইনস্টল করতে শেয়ার বাটন থেকে "Add to Home Screen" বেছে নিন';
}
