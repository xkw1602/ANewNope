
//TODO: Change game name
//TODO: Add sleep

class Unit {
    constructor(type) {
        this.type = type;

        if (type == "Trooper") {
            this.price = 100;
            this.hit = .5;
            this.health = 3;
            this.damage = 1;
        } else if (type == "Hunter") {
            this.price = 150;
            this.hit = 0.9;
            this.health = 1;
            this.damage = 3;
        } else if (type == "Heavy") {
            this.price = 250;
            this.hit = 0.25;
            this.health = 5;
            this.damage = 2;
        }
    }

    fire() {
        if (Math.random() < this.hit) {
            console.log(this.type + " hit");
            textarea.value += this.type + " hit\n";
            return this.damage

        }
        console.log(this.type + " missed");
        textarea.value += this.type + " missed\n";
        return 0;
    }
}

class Game {
    constructor() {
        this.team1 = new Team(1);
        this.team2 = new Team(2);
    }

    reset(){
        this.team1.credits = 1000;
        this.team2.credits = 1000;
        while(this.team1.size != 0){
            this.team1.remove();
        }
        while(this.team2.size != 0){
            this.team2.remove();
        }
        document.getElementById("team1-money").innerHTML = "Credits: " + this.team1.credits;
        document.getElementById("team2-money").innerHTML = "Credits: " + this.team2.credits;
    }

    setCredits(credits){
        this.team1Credits = credits;
        this.team2Credits = credits;
    }

    battle() {
        this.unit1 = new Unit(this.team1.getUnit());
        this.unit2 = new Unit(this.team2.getUnit());

        while (this.team1.size > 0 && this.team2.size > 0) {

            let pick = Math.random();

            if (pick > 0.5) {
                while (this.unit1.health > 0 && this.unit2.health > 0) {
                    textarea.value += "Team 1 ";
                    this.unit2.health -= this.unit1.fire();
                    if (this.unit2.health > 0) {
                        textarea.value += "Team 2 ";
                        this.unit1.health -= this.unit2.fire();
                    }
                }
            } else {
                while (this.unit2.health > 0 && this.unit1.health > 0) {
                    textarea.value += "Team 2 ";
                    this.unit1.health -= this.unit2.fire();
                    if (this.unit1.health > 0) {
                        textarea.value += "Team 1 ";
                        this.unit2.health -= this.unit1.fire();
                    }
                }
            }

            if (this.unit1.health > 0) {
                console.log("Unit 1 wins");
                textarea.value += "Team 1 " + this.unit1.type + " wins\n";
                this.team2.remove();
                if(this.team2.size != 0){
                    this.unit2 = new Unit(this.team2.getUnit());
                }
            } else if (this.unit2.health > 0) {
                console.log("Unit 2 wins");
                textarea.value += "Team 2 " + this.unit2.type + " wins\n";
                this.team1.remove();
                if(this.team1.size != 0){
                    this.unit1 = new Unit(this.team1.getUnit());
                }
            }
        }

        if(this.team1.size > 0){
            console.log("Team 1 wins");
            textarea.value += "Team 1 wins!\n";
            alert("Team 1 wins!");
        }

        if(this.team2.size > 0){
            console.log("Team 2 wins");
            textarea.value += "Team 2 wins!\n";
            alert("Team 2 wins!");
        }

    }


}

class Team {
    constructor(id) {
        this.id = id;
        this.credits = 1000;
        this.team = [];
        this.size = 0;
    }

    add(unit) {
        this.team.push(unit);
        this.size++;
    }

    buy(unit){
        let newUnit = new Unit(unit);
        if(this.credits >= newUnit.price){
            this.add(unit);
            this.credits -= newUnit.price;
            console.log("Bought " + unit);
            if(this.id == 1){
                document.getElementById("team1-money").innerHTML = "Credits: " + this.credits;
            } else {
                document.getElementById("team2-money").innerHTML = "Credits: " + this.credits;
            }
        }
    }

    remove(){
        this.team.pop();
        this.size--;
    }

    getUnit(){
        return this.team[this.team.length-1];
    }
}

var textarea = document.getElementById("scroll-box");
const myGame = new Game();
