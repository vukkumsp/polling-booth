export class Result{
    winnerName: string;
    winnerVoteCount: number;

    constructor(winnerName: string, winnerVoteCount: number){
        this.winnerName = winnerName;
        this.winnerVoteCount = winnerVoteCount;
    }
}