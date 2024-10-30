import { ethers } from "ethers";
import { Summary } from "../../ethereum/contractProxyClasses/Summary";

export interface ContractState {
    contract: ethers.Contract | null;
    newEventTopicInprogress: boolean;
    eventSummaries: Summary[];
}

export const initialContractState: ContractState = {
    contract: null,
    newEventTopicInprogress: false,
    eventSummaries: []
}