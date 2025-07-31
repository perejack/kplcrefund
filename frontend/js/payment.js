// Alpine.js for payment form
function countdownTimer(hours) {
  return {
    timer: '',
    end: new Date(Date.now() + hours * 60 * 60 * 1000),
    interval: null,
    init() {
      this.update();
      this.interval = setInterval(() => this.update(), 1000);
    },
    update() {
      const now = new Date();
      let diff = Math.max(0, this.end - now);
      let h = Math.floor(diff / (1000 * 60 * 60));
      let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((diff % (1000 * 60)) / 1000);
      this.timer = `${h > 0 ? h+':' : ''}${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }
  }
}

function paymentForm() {
  return {
    phone: '',
    loading: false,
    progress: 0,
    progressInterval: null,
    initiatePayment() {
      this.loading = true;
      sessionStorage.setItem('mpesaPhone', this.phone);
      this.progress = 0;
      this.progressInterval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += Math.random() * 20 + 10;
          if (this.progress > 100) this.progress = 100;
        }
      }, 400);
      setTimeout(() => {
        clearInterval(this.progressInterval);
        window.location.href = 'confirmation.html';
      }, 3200);
    }
  }
}

