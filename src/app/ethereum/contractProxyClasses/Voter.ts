export class Voter {
    voted: boolean;
    vote: number;

    constructor(voted: boolean, vote: number){
        this.voted = voted;
        this.vote = vote;
    }
}