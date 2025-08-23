<template>
    <Teleport to='body'>
      <div class="absolute inset-0 flex items-center justify-center z-[100] bg-black/40">
        <div class="loader"></div>
      </div>
    </Teleport>
  </template>
  
  <style scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 49px;
    height: 49px;
    display: inline-block;
    position: relative;
    border-width: 5px 4px 5px 4px;
    border-style: solid dotted solid dotted;
    border-color: #ffffffc5 rgba(255, 255, 255,0.3) #02da4ae7 rgba(212, 212, 212, 0.493);
    border-radius: 50%;
    box-sizing: border-box;
    animation: 1s rotate linear infinite;
 }
 .loader:before , .loader:after{
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color:#02da4ae7;
    transform: translate(-10px, 19px) rotate(-35deg);
  }
 .loader:after {
    border-color: #ffffffc5 #0000 #0000 #0000 ;
    transform: translate(32px, 3px) rotate(-35deg);
  }
   @keyframes rotate {
    100%{    transform: rotate(360deg)}
  }
  </style>