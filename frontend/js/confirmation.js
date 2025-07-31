// Alpine.js for confirmation page
function trackingId() {
  return {
    id: '',
    init() {
      // Generate random tracking ID
      const meter = sessionStorage.getItem('meterNumber') || '00000000';
      const rand = Math.floor(Math.random() * 900000 + 100000);
      this.id = `REF#KPCL-${rand}`;
    }
  }
}
