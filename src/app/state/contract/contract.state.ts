import { ethers } from "ethers";
import { Summary } from "../../ethereum/contractProxyClasses/Summary";

export interface ContractState {
    contract: ethers.Contract | null;
    newEventTopicInprogress: boolean;
    eventSummaries: Summary[];
    selectedEventSummary: Summary | null;
}

export const initialContractState: ContractState = {
    contract: null,
    newEventTopicInprogress: false,
    eventSummaries: [],
    selectedEventSummary: null
}