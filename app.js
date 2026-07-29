let deferredPrompt;

const installBtn = document.getElementById("installButton");
const status = document.getElementById("pwaStatus");

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("Service Worker Registered");
            })
            .catch(err => {
                console.log(err);
            });
    });
}

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    document.getElementById("pwaBar").hidden = false;

});

installBtn.addEventListener("click", async () => {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {

        status.innerHTML = "অ্যাপ ইনস্টল হয়েছে";

    } else {

        status.innerHTML = "ইনস্টল বাতিল হয়েছে";

    }

    deferredPrompt = null;

});

window.addEventListener("appinstalled", () => {

    document.getElementById("pwaBar").hidden = true;

    status.innerHTML = "ইনস্টল সম্পন্ন";

});

window.addEventListener("online", () => {

    status.innerHTML = "অনলাইন";

});

window.addEventListener("offline", () => {

    status.innerHTML = "অফলাইন মোড";

});
