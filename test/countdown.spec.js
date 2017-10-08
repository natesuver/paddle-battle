describe("Countdown", function() {
    var cd;
    describe("will execute", function() {
        beforeEach(function() {
            affix("#countdown");
            var ele = $("#countdown");
            cd = new Countdown(ele,6,"FIGHT");
        });
        it("a beginCountdown method that starts the countdown", function() {
            spyOn(cd,'doCount').and.callFake(function() {
                return true;
            });
            cd.beginCountdown();
            expect(cd.doCount).toHaveBeenCalled();
        });
    })
    describe("runs a countdown", function() {
        beforeEach(function() {
            affix("#countdown");
            var ele = $("#countdown");
            cd = new Countdown(ele,6,"FIGHT");
        });

        it("which recursively hits doCount 7 times and sets a dom element to FIGHT", function() {
            spyOn(window,'setTimeout').and.callFake(function(funcToCall,duration) {
                funcToCall();
            });
            spyOn(cd,'doCount').and.callThrough();
            cd.beginCountdown();
            expect(window.setTimeout).toHaveBeenCalled();
            expect(cd.doCount).toHaveBeenCalled();
            expect(cd.doCount.calls.count()).toBe(7);
            expect(document.getElementById("countdown").innerText).toBe("FIGHT");
        });
    });
});