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
"Service Worker Ready",
reg.scope
);

})

.catch(err=>{

console.error(
"SW Error:",
err
);

});

});

}



/* ===============================
   CHECK INSTALLED STATUS
================================ */

function checkInstallStatus(){

const bar =
document.getElementById("pwaBar");


if(
window.matchMedia(
"(display-mode: standalone)"
).matches
||
window.navigator.standalone
){


if(bar){

bar.hidden=true;

}


}

}



/* ===============================
   INSTALL PROMPT
================================ */


window.addEventListener(
"beforeinstallprompt",
(e)=>{


e.preventDefault();


deferredPrompt=e;


const bar =
document.getElementById("pwaBar");


if(bar){

bar.hidden=false;

}


});




window.addEventListener(
"load",
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

status.innerHTML=
"Install প্রস্তুত নয়";

}


return;

}



deferredPrompt.prompt();



const choice =
await deferredPrompt.userChoice;



if(choice.outcome==="accepted"){


if(status){

status.innerHTML=
"অ্যাপ ইনস্টল হচ্ছে...";

}


setTimeout(()=>{


const bar =
document.getElementById(
"pwaBar"
);


if(bar){

bar.hidden=true;

}


},1500);


}



deferredPrompt=null;


}

);


}


});





window.addEventListener(
"appinstalled",
()=>{


const bar =
document.getElementById(
"pwaBar"
);


if(bar){

bar.hidden=true;

}


console.log(
"PWA Installed"
);



enableAutoRotation();


});





/* ===============================
   AUTO ROTATION
================================ */


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



/* ===============================
   ONLINE OFFLINE
================================ */


window.addEventListener(
"online",
()=>{


const s =
document.getElementById(
"pwaStatus"
);


if(s)
s.innerHTML="Online";


});


window.addEventListener(
"offline",
()=>{


const s =
document.getElementById(
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
