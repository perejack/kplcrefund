// Alpine.js for eligibility page
function testimonialSlider() {
  return {
    testimonials: [
      '“I received my refund instantly – George N.”',
      '“Thought it was a scam, but I got my money back – Mercy K.”',
      '“Refund hit my M-Pesa in 2 minutes! – Stephen M.”',
      '“I invited 3 friends and got my refund faster. – Lucy W.”',
      '“Super easy process, thank you KPLC! – Joseph O.”',
    ],
    current: 0,
    interval: null,
    init() {
      this.interval = setInterval(() => {
        this.current = (this.current + 1) % this.testimonials.length;
      }, 4000);
    }
  };
}

function disbursementCounter() {
  return {
    count: 87,
    interval: null,
    init() {
      // Simulate live decrement
      this.interval = setInterval(() => {
        if (this.count > 1) this.count--;
      }, 7000);
    }
  }
}
// Fake live feed
function liveFeed() {
  const feedSamples = [
    'Stephen from Kisumu just claimed Ksh 1,430',
    'Lucy from Nakuru just claimed Ksh 1,430',
    'Joseph from Nairobi just claimed Ksh 1,430',
    'Mercy from Eldoret just claimed Ksh 1,430',
    'George from Mombasa just claimed Ksh 1,430',
    'Agnes from Nyeri just claimed Ksh 1,430',
    'Brian from Thika just claimed Ksh 1,430',
    'Faith from Kakamega just claimed Ksh 1,430',
    'Samuel from Kitale just claimed Ksh 1,430',
    'Diana from Machakos just claimed Ksh 1,430',
    'Evans from Kisii just claimed Ksh 1,430',
    'Caroline from Embu just claimed Ksh 1,430',
    'Peter from Meru just claimed Ksh 1,430'
  ];
  return {
    feed: feedSamples[0],
    idx: 0,
    interval: null,
    init() {
      this.interval = setInterval(() => {
        this.idx = (this.idx + 1) % feedSamples.length;
        this.feed = feedSamples[this.idx];
      }, 4000);
    }
  }
}

// Viral referral loop (fake progress for animation)
function referralLoop() {
  return {
    invited: 0,
    needed: 3,
    get progress() { return Math.min((this.invited/this.needed)*100,100); },
    get done() { return this.invited >= this.needed; },
    invite() {
      if(this.invited<this.needed) this.invited++;
    },
    reset() { this.invited=0; }
  }
}

