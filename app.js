/* =================================
   Typing Jobs PWA Controller
================================= */


let deferredPrompt = null;


/* ===============================
   SERVICE WORKER
================================ */

if ("serviceWorker" in navigator) {

window.addEventListener("load",()=>{


navigator.serviceWorker.register(
"/Typing-jobs-Rahmot/service-worker.js"
)

.then(reg=>{

console.log(
"Service Worker:",
reg.scope
);

})

.catch(err=>{

console.error(err);

});


});

}



/* ===============================
   INSTALL BUTTON
================================ */


window.addEventListener(
"beforeinstallprompt",
(e)=>{


e.preventDefault();


deferredPrompt=e;


let bar=document.getElementById(
"pwaBar"
);


if(bar){

bar.hidden=false;

}


});



window.addEventListener(
"load",
()=>{


const installBtn =
document.getElementById(
"installButton"
);


const status =
document.getElementById(
"pwaStatus"
);



if(installBtn){


installBtn.onclick =
async function(){


if(!deferredPrompt){


status.innerHTML =
"Install প্রস্তুত নয়। Chrome Menu → Install app ব্যবহার করুন।";


return;


}



deferredPrompt.prompt();



let result =
await deferredPrompt.userChoice;



if(result.outcome==="accepted"){


status.innerHTML =
"App Install হয়েছে";


}


else{


status.innerHTML =
"Install বাতিল হয়েছে";


}



deferredPrompt=null;


};



}



});





window.addEventListener(
"appinstalled",
()=>{


let bar =
document.getElementById(
"pwaBar"
);


if(bar){

bar.hidden=true;

}


console.log(
"Installed"
);


});





/* ===============================
   ONLINE OFFLINE
================================ */


window.addEventListener(
"online",
()=>{

let s=document.getElementById(
"pwaStatus"
);

if(s)
s.innerHTML="Online";

});


window.addEventListener(
"offline",
()=>{

let s=document.getElementById(
"pwaStatus"
);

if(s)
s.innerHTML="Offline Mode";

});





/* ===============================
   ROTATION BUTTON
================================ */


window.enableRotation=function(){


if(
screen.orientation &&
screen.orientation.lock
){


screen.orientation.lock(
"landscape"
)

.then(()=>{

console.log(
"Landscape locked"
);

})

.catch(err=>{

console.log(err);

});


}


};
