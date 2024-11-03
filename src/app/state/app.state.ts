import { AccountState } from "./account/account.state";
import { ContractState } from "./contract/contract.state";
import { MobileviewState } from "./mobileview/mobileview.state";

export interface AppState {
    accountConnected: AccountState,
    contractConnected: ContractState,
    mobileviewState: MobileviewState
}