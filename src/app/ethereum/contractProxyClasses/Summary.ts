import { Option } from "./Option";

export class Summary {

    topic: string;
    options: Option[];
    votingActive: boolean;
    exists: boolean;

    constructor(topic: string, options: Option[], votingActive: boolean, exists: boolean) {
        this.topic = topic;
        this.options = options;
        this.votingActive = votingActive;
        this.exists = exists;
    }
}