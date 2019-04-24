const Westeros = {};

const Event = (function(){
    function Event(name){
        this.name = name;
    }
    return Event;
})();
Westeros.Event = Event;

const Prize = (function(){
    function Prize(name){
        this.name = name;
    }
    return Prize;
})();
Westeros.Prize = Prize;

const Attendee = (function(){
    function Attendee(name){
        this.name = name;
    }
    return Attendee;
})();
Westeros.Attendee = Attendee;

const Tournament = (function(){
    function Tournament(){
    }
    return Tournament;
})();
Westeros.Tournament = Tournament;

const LannisterTournamentBuilder = (function(){
    function LannisterTournamentBuilder(){}
    LannisterTournamentBuilder.prototype.build = function(){
        const tournament = new Tournament();
        tournament.events.push(new Event("Joust"));
        tournament.events.push(new Event("Melee"));
        tournament.attendees.push(new Attendee("Jamie"));
        tournament.prizes.push(new Prize("Gold"));
        tournament.prizes.push(new Prize("More Gold"));
        return tournament
    }
    return LannisterTournamentBuilder;
})();
Westeros.LannisterTournamentBuilder = LannisterTournamentBuilder;

const BaratheonTournamentBuilder = (function(){
    function BaratheonTournamentBuilder(){}
    BaratheonTournamentBuilder.prototype.build = function(){
        const tournament = new Tournament();
        tournament.events.push(new Event("Joust"));
        tournament.events.push(new Event("Melee"));
        tournament.attendees.push(new Attendee("Stannis"));
        tournament.attendees.push(new Attendee("Robert"));
        return tournament
    }
    return BaratheonTournamentBuilder;
})();
Westeros.BaratheonTournamentBuilder = BaratheonTournamentBuilder;

const TournamentBuilder = (function(){
    function TournamentBuilder(){}
    TournamentBuilder.prototype.build = function(builder){
        return builder.build();
    }
    return TournamentBuilder;
})();
Westeros.TournamentBuilder = TournamentBuilder;