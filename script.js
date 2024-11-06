// script.js

document.addEventListener("DOMContentLoaded", () => {
  // สร้าง iframe แบบ dynamic
  const iframe = document.createElement("iframe");
  iframe.src = "https://script.google.com/macros/s/AKfycbwaqAcfxH5QzjDPTV3RzuvXzgxMOlfD85XdcmLdchi-KBYBu0-jsTQ7Y_EKWhdZKGCNNA/exec";
  iframe.style.display = "none"; // ป้องกันการมองเห็น
  document.body.appendChild(iframe);
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
  e.preventDefault();
  deferredPrompt = e;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!window.matchMedia('(display-mode: standalone)').matches && isMobile) {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    setTimeout(() => {
      installButton.style.display = 'none';
    }, 10000);

    installButton.addEventListener('click', () => {
      installButton.style.display = 'none';
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
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
