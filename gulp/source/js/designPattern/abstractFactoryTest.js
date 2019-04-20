const KingJoffery = (function(){
    function KingJoffery(){}
    KingJoffery.prototype.makeDecision = function(){
        console.log('KingJoffery makeDecision')
    }
    KingJoffery.prototype.marry = function(){
        console.log('KingJoffery marry')
    }
    return KingJoffery;
})();

const LordTywin = (function(){
    function LordTywin(){}
    LordTywin.prototype.makeDecision = function(){
        console.log('LordTywin makeDecision')
    }
    LordTywin.prototype.marry = function(){
        console.log('LordTywin marry')
    }
    return LordTywin;
})();

const LannisterFactory = (function(){
    function LannisterFactory(){}
    LannisterFactory.prototype.getKing = function(){
        return new KingJoffery();
    }
    LannisterFactory.prototype.getHandOfTheKing = function(){
        return new LordTywin();
    }
    return LannisterFactory;
})()

const KingAerys = (function(){
    function KingAerys(){}
    KingAerys.prototype.makeDecision = function(){
        console.log('KingAerys makeDecision')
    }
    KingAerys.prototype.marry = function(){
        console.log('KingAerys marry')
    }
    return KingAerys;
})();

const LordConnigton = (function(){
    function LordConnigton(){}
    LordConnigton.prototype.makeDecision = function(){
        console.log('LordConnigton makeDecision')
    }
    LordConnigton.prototype.marry = function(){
        console.log('LordConnigton marry')
    }
    return LordConnigton;
})();

const TargaryenFactory = (function(){
    function TargaryenFactory(){}
    TargaryenFactory.prototype.getKing = function(){
        return new KingAerys();
    }
    TargaryenFactory.prototype.getHandOfTheKing = function(){
        return new LordConnigton();
    }
    return TargaryenFactory;
})()

const CourtSession = (function(){
    function CourtSession(abstractFactory){
        this.abstractFactory = abstractFactory;
        this.COMPLAINT_THRESHOLD = 10;
    }
    CourtSession.prototype.complaintPresented = function(complaint){
        if(complaint.serverity < this.COMPLAINT_THRESHOLD){
            this.abstractFactory.getHandOfTheKing().makeDecision();
        } else {
            this.abstractFactory.getKing().makeDecision();
        }
    }
    return CourtSession;
})()

console.log(new TargaryenFactory());

const CourtSession1 = new CourtSession(new TargaryenFactory());
CourtSession1.complaintPresented({serverity:8});
CourtSession1.complaintPresented({serverity:12});
console.log('CourtSession1 : ', CourtSession1);

const CourtSession2 = new CourtSession(new LannisterFactory());
CourtSession2.complaintPresented({serverity:8});
CourtSession2.complaintPresented({serverity:12});
console.log('CourtSession2 : ', CourtSession2);




