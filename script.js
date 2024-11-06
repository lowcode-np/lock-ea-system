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
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = 'block';
  setTimeout(() => {
    installButton.style.display = 'none';
  }, 10000);
});

installButton.addEventListener('click', () => {
  installButton.style.display = 'none';

  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
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
