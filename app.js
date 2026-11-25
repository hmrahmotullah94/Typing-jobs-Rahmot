/* =========================================
   Typing Jobs PWA Controller
   Made by Rahmotullah
========================================= */


let deferredPrompt = null;



/* =========================================
   HIDE INSTALL BUTTON
========================================= */

function hideInstallButton(){

    const bar = document.getElementById("pwaBar");

    if(bar){

        bar.hidden = true;

    }

}



/* =========================================
   SHOW INSTALL BUTTON
========================================= */

function showInstallButton(){

    const bar = document.getElementById("pwaBar");

    if(bar){

        bar.hidden = false;

    }

}



/* =========================================
   CHECK APP INSTALLED
========================================= */

function checkInstallStatus(){


    const installed =
    window.matchMedia(
        "(display-mode: standalone)"
    ).matches
    ||
    window.navigator.standalone;



    if(installed){

        hideInstallButton();

    }


}




/* =========================================
   SERVICE WORKER REGISTER
========================================= */



if ("serviceWorker" in navigator) {

  window.addEventListener("load", async () => {

    try {

      const swURL = new URL(
        "./service-worker.js",
        document.baseURI
      );

      const reg = await navigator.serviceWorker.register(swURL);

      console.log("Service Worker Running:", reg.scope);

    } catch (err) {

      console.error("Service Worker Error:", err);

    }

  });

}


// শুরুতে বাটন লুকিয়ে রাখুন (যতক্ষণ না ব্রাউজার নিশ্চিত করে যে অ্যাপটি ইনস্টল করা সম্ভব)
if (pwaBar) {
    pwaBar.hidden = true;
}
   
  // Show the installation option when the browser allows installation.
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallBar();

    console.log('PWA installation is available.');
  });




/* =========================================
   INSTALL PROMPT
========================================= */


window.addEventListener(
"beforeinstallprompt",
(e)=>{


    e.preventDefault();


    deferredPrompt = e;



    const installed =
    window.matchMedia(
    "(display-mode: standalone)"
    ).matches;



    if(!installed){

        showInstallButton();

    }


});






/* =========================================
   INSTALL BUTTON CLICK
========================================= */


window.addEventListener(
"DOMContentLoaded",
()=>{


    checkInstallStatus();



    const installBtn =
    document.getElementById(
    "installButton"
    );


    const status =
    document.getElementById(
    "pwaStatus"
    );



    if(installBtn){


    installBtn.addEventListener(
    "click",
    async()=>{


        if(!deferredPrompt){


            if(status){

            status.innerHTML =
            "Install প্রস্তুত নয়। Chrome Menu থেকে Install করুন।";

            }


            return;

        }




        deferredPrompt.prompt();



        const result =
        await deferredPrompt.userChoice;



        if(result.outcome==="accepted"){


            if(status){

            status.innerHTML =
            "অ্যাপ ইনস্টল হয়েছে";

            }


            hideInstallButton();


        }
        else{


            if(status){

            status.innerHTML =
            "ইনস্টল বাতিল হয়েছে";

            }


        }



        deferredPrompt = null;



    });


    }


});







/* =========================================
   AFTER INSTALL
========================================= */


window.addEventListener(
"appinstalled",
()=>{


console.log(
"Typing Jobs Installed"
);


hideInstallButton();


});







/* =========================================
   ONLINE OFFLINE STATUS
========================================= */


window.addEventListener(
"online",
()=>{


const status =
document.getElementById(
"pwaStatus"
);



if(status){

status.innerHTML =
"Online Mode";

}


});




window.addEventListener(
"offline",
()=>{


const status =
document.getElementById(
"pwaStatus"
);



if(status){

status.innerHTML =
"Offline Mode";

}


});







/* =========================================
   SCREEN ROTATION SUPPORT
========================================= */


async function enableAutoRotation(){


try{


if(
screen.orientation &&
screen.orientation.lock
){


await screen.orientation.lock(
"any"
);


console.log(
"Rotation enabled"
);


}


}

catch(error){


console.log(
"Rotation controlled by device"
);


}


}




/* Installed app start হলে rotation চেষ্টা */

window.addEventListener(
"load",
()=>{


const installed =
window.matchMedia(
"(display-mode: standalone)"
).matches;



if(installed){

enableAutoRotation();

}


});






/* =========================================
   SERVICE WORKER UPDATE CHECK
========================================= */


if(
"serviceWorker" in navigator
){


navigator.serviceWorker.addEventListener(
"controllerchange",
()=>{


console.log(
"New update available"
);


});


}
