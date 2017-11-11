class Countdown {
    constructor(element, countFrom, terminalStatement, onStart) {
      this.element = element;
      this.countFrom = countFrom;
      this.terminalStatement = terminalStatement;
      this.countdownDuration = 800;
      this.onStart = onStart;
      this.increment=0;
    }
    fade() {
        this.element.fadeIn(0);
        this.setCountdownName(this.increment, this.element);
        this.element.fadeOut(this.countdownDuration);
    }
    beginCountdown() {
        this.increment = this.countFrom;
        this.fade(); //start the countdown immediately, do not wait for timeout.
        this.increment--;
        if (this.increment > -1) {
            this.doCount(this.increment);  
        }
    }
    doCount(increment, scope) {
        var that = this;
        setTimeout(function() {
            that.fade();
            if (that.increment>0) {
                that.doCount(--that.increment);
            }
        },this.countdownDuration);      
    }
    
    setCountdownName(increment, element) {
        if (this.increment===0) {
            element.text(this.terminalStatement);
            element.css('color', 'red');
            element.css('font-weight', 'bolder');
            element.fadeOut(this.countdownDuration, this.onStart);
        }
        else {
            element.text(this.increment);
        }
    }
  }
