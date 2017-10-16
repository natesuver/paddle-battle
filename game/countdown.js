class Countdown {
    constructor(element, countFrom, terminalStatement) {
      this.element = element; //
      this.countFrom = countFrom;
      this.terminalStatement = terminalStatement;
      this.countdownDuration = 800;
    }
    beginCountdown() {
        this.doCount(this.countFrom);       
    }
    doCount(increment) {
        var that = this;
        setTimeout(function() {
            that.element.fadeIn(0);
            that.setCountdownName(increment, that.element);
            that.element.fadeOut(that.countdownDuration);
           // if (increment>0) { //terminating conditions remove to blow test and what not
                that.doCount(--increment);
           // }
        },that.countdownDuration);
    }
    
    setCountdownName(increment, element) {
        if (increment===0) {
            element.text(this.terminalStatement);
            element.css('color', 'red');
            element.css('font-weight', 'bolder');
        }
        else {
            element.text(increment);
        }
    }
  }
