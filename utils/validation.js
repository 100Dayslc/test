
// utils/validation.js
exports.validateEmail = (email) => {
    const re = /^(([^<>()$$$$\\.,;:\s@"]+(\.[^<>()$$$$\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  exports.generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  // utils/points.js
  exports.calculatePoints = {
    adWatch: () => 10,
    referral: () => 50,
  };