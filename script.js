// script.js

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("secureFrame");
  iframe.style.visibility = "visible";
});

function updateViewport() {
  const viewportMeta = document.getElementById("viewportMeta");
  if (window.innerWidth <= 768) {
    viewportMeta.setAttribute("content", "width=960, user-scalable=no");
  } else {
    viewportMeta.setAttribute("content", "width=1024, user-scalable=no");
  }
}

window.addEventListener("load", updateViewport);
window.addEventListener("resize", updateViewport);

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired'); // ตรวจสอบว่าอีเวนต์นี้ถูกเรียกหรือไม่
  e.preventDefault();
  deferredPrompt = e;

  // แสดงการแจ้งเตือนติดตั้งอัตโนมัติ
  if (deferredPrompt) {
    deferredPrompt.prompt();

    // ตรวจสอบผลลัพธ์ที่ผู้ใช้เลือก
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  } else {
    console.log('Deferred prompt is not available');
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
