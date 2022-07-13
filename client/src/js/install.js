const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  // store the events
  window.deferredPrompt = event;

  // Remove hidden class from the button so it appears
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show the prompt
  promptEvent.prompt();

  // Reset deferred prompt variable so it can only be used once
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  // Clear the prompt
  window.deferredPrompt = null;
});
