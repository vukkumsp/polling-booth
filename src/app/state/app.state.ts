import { AccountState } from "./account/account.state";
import { ContractState } from "./contract/contract.state";

export interface AppState {
    accountConnected: AccountState,
    contractConnected: ContractState
}