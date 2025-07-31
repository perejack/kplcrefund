import Alpine from 'alpinejs';
window.Alpine = Alpine;

// Auto-import page-specific scripts BEFORE starting Alpine
const pageScript = document.body.dataset.pageScript;
if (pageScript) {
  import(`./js/${pageScript}.js`)
    .then(() => {
      console.log(`${pageScript}.js loaded, starting Alpine`);
      Alpine.start();
    })
    .catch((error) => {
      console.warn(`Failed to load ${pageScript}.js:`, error);
      Alpine.start(); // Start Alpine anyway
    });
} else {
  Alpine.start();
}
