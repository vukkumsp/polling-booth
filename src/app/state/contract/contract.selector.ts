import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ContractState } from "./contract.state";

export const selectContractState = (state: AppState) => state.contractConnected;

export const selectIsNewEventTopicInProgress = createSelector(
    selectContractState,
    (state: ContractState) => state.newEventTopicInprogress
)
