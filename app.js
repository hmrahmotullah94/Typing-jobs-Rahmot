/* =========================================
   Typing Jobs PWA v1.0
   Made by Rahmotullah
========================================= */


/* ===============================
   PWA INSTALL SYSTEM
================================ */

let deferredPrompt = null;


const PWA = {

    init(){

        this.registerServiceWorker();

        this.installHandler();

        this.orientationSupport();

        this.networkStatus();

    },


    registerServiceWorker(){

        if("serviceWorker" in navigator){

            window.addEventListener("load",()=>{

                navigator.serviceWorker.register(
                    "/Typing-jobs-Rahmot/service-worker.js"
                )

                .then(reg=>{

                    console.log(
                        "Service Worker Active:",
                        reg.scope
                    );

                })

                .catch(err=>{

                    console.error(
                        "Service Worker Error:",
                        err
                    );

                });


            });

        }

    },



    installHandler(){


        window.addEventListener(
            "beforeinstallprompt",
            (e)=>{


                e.preventDefault();


                deferredPrompt=e;


                const bar=
                document.getElementById("pwaBar");


                if(bar){

                    bar.hidden=false;

                }


            }
        );



        document.addEventListener(
            "DOMContentLoaded",
            ()=>{


                const btn=
                document.getElementById(
                    "installButton"
                );


                const status=
                document.getElementById(
                    "pwaStatus"
                );



                if(btn){


                    btn.addEventListener(
                        "click",
                        async()=>{


                            if(!deferredPrompt){


                                if(status){

                                    status.innerHTML=
                                    "Install অপশন প্রস্তুত হয়নি। Chrome Menu থেকে Install করুন।";

                                }

                                return;

                            }



                            deferredPrompt.prompt();



                            const choice =
                            await deferredPrompt.userChoice;



                            if(choice.outcome==="accepted"){


                                if(status){

                                    status.innerHTML=
                                    "অ্যাপ ইনস্টল হয়েছে";

                                }


                            }

                            else{


                                if(status){

                                    status.innerHTML=
                                    "ইনস্টল বাতিল হয়েছে";

                                }


                            }



                            deferredPrompt=null;


                        }
                    );

                }


            }
        );



        window.addEventListener(
            "appinstalled",
            ()=>{


                const bar=
                document.getElementById(
                    "pwaBar"
                );


                if(bar){

                    bar.hidden=true;

                }


                console.log(
                    "Typing Jobs Installed"
                );


            }
        );


    },



/* ===============================
   AUTO SCREEN ROTATION
================================ */


orientationSupport(){


    window.addEventListener(
        "load",
        ()=>{


            if(
                screen.orientation &&
                screen.orientation.lock
            ){


                screen.orientation.lock(
                    "any"
                )

                .then(()=>{

                    console.log(
                        "Auto rotation enabled"
                    );

                })

                .catch(()=>{

                    console.log(
                        "Rotation controlled by device"
                    );

                });


            }


        }
    );

},



/* ===============================
   ONLINE OFFLINE STATUS
================================ */


networkStatus(){


    const status=
    document.getElementById(
        "pwaStatus"
    );


    window.addEventListener(
        "online",
        ()=>{


            if(status){

                status.innerHTML=
                "ইন্টারনেট সংযোগ চালু";

            }


        }
    );



    window.addEventListener(
        "offline",
        ()=>{


            if(status){

                status.innerHTML=
                "অফলাইন মোড চালু";

            }


        }
    );


}



};





/* START PWA */

PWA.init();




/* =================================
   APP ORIENTATION BUTTON SUPPORT
================================= */


function enableRotation(){


    if(
        screen.orientation &&
        screen.orientation.lock
    ){


        screen.orientation.lock(
            "any"
        );


    }

}



/* =================================
   UPDATE AVAILABLE DETECTION
================================= */


if(
"serviceWorker" in navigator
){


navigator.serviceWorker.addEventListener(
"controllerchange",
()=>{

console.log(
"New version available"
);

});


}
