import { ethers } from "ethers";

export interface ContractState {
    contract: ethers.Contract | null;
    newEventTopicInprogress: boolean;
}

export const initialContractState: ContractState = {
    contract: null,
    newEventTopicInprogress: false
}