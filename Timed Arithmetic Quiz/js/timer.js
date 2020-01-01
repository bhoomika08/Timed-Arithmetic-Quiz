class Timer {
  constructor($timeSpan) {
    const data = {
      timeUpMessage: "Times up!",
    }
    this.timeInterval;
    this.$timeSpan = $timeSpan;
    this.data = data;
  }

  startTime(timeDuration) {
    this.$timeSpan.text(timeDuration);
    this.remainingTime = timeDuration;
    this.timeInterval = setInterval(() => this.decrementTime(timeDuration),1000);
  }

  decrementTime(timeDuration) {
    this.remainingTime--;
    if(this.remainingTime < timeDuration) {
      this.$timeSpan.text(this.remainingTime);
    }
    if(this.remainingTime == 0) {
      this.clearTimer();
    }
  }

  // B: clearInterval() used to end the previous Time Interval.
  clearTimer() {
    clearInterval(this.timeInterval);
  }
}
