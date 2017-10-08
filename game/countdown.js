class Countdown {
    constructor(elementId, countFrom, terminalStatement) {
      this.elementId = elementId;
      this.countFrom = countFrom;
      this.terminalStatement = terminalStatement;
    }
    beginCountdown() {
        this.doCount(this.countFrom);       
    }
    doCount(increment) {
        var that = this;
        setTimeout(function() {
            $("#"+ that.elementId).fadeIn(0);
            that.setCountdownName(increment, that.elementId);
            $("#"+ that.elementId).fadeOut(countdownDuration);
            if (increment>0) {
                that.doCount(--increment);
            }
        },countdownDuration);
    }
    
    setCountdownName(increment, elementId) {
        if (increment===0) {
            document.getElementById(elementId).innerHTML = this.terminalStatement;
            $("#"+ elementId).css('color', 'red');
            $("#"+ elementId).css('font-weight', 'bolder');
        }
        else {
            document.getElementById(elementId).innerHTML = increment;
        }
    }
  }
