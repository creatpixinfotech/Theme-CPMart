function timer() {
    const dayEl = document.querySelector('.collection-timer .day');
    const hoursEl = document.querySelector('.collection-timer .hours');
    const minsEl = document.querySelector('.collection-timer .mins');
    const secsEl = document.querySelector('.collection-timer .secs');
  
    let days = parseInt(dayEl.textContent);
    let hours = parseInt(hoursEl.textContent);
    let mins = parseInt(minsEl.textContent);
    let secs = parseInt(secsEl.textContent);
  
    let totalSeconds = days * 24 * 3600 + hours * 3600 + mins * 60 + secs;
  
    const countdown = setInterval(function () {
      if (totalSeconds <= 0) {
        clearInterval(countdown);
        return;
      }
  
      totalSeconds--;
  
      const remainingDays = Math.floor(totalSeconds / (24 * 3600));
      const remainingHours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      const remainingSeconds = totalSeconds % 60;
  
      dayEl.textContent = remainingDays;
      hoursEl.textContent = remainingHours.toString().padStart(2, '0');
      minsEl.textContent = remainingMinutes.toString().padStart(2, '0');
      secsEl.textContent = remainingSeconds.toString().padStart(2, '0');

      if(remainingDays == 0 && remainingHours == 0 && remainingMinutes == 0 && remainingSeconds == 0 ) {
        document.querySelector('.collection-timer').textContent = 'Offer was Ended'
      }
    }, 1000);
}

timer();