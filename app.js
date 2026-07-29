let deferredPrompt;
const installBtn = document.getElementById('installButton');
const pwaBar = document.getElementById('pwaBar');

// ১. সার্ভিস ওয়ার্কার রেজিস্টার করা
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker Registered!', reg))
      .catch(err => console.error('Service Worker Registration Failed!', err));
  });
}

// ২. PWA ইনস্টল প্রম্পট হ্যান্ডেল করা
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (pwaBar) pwaBar.removeAttribute('hidden');
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
      pwaBar.setAttribute('hidden', '');
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  if (pwaBar) pwaBar.setAttribute('hidden', '');
});
