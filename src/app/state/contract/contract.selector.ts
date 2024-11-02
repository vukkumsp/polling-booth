import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ContractState } from "./contract.state";

export const selectContractState = (state: AppState) => state.contractConnected;

export const selectIsNewEventTopicInProgress = createSelector(
    selectContractState,
    (state: ContractState) => state.newEventTopicInprogress
)

export const selectEventSummaries = createSelector(
    selectContractState,
    (state: ContractState) => state.eventSummaries
)

export const selectSelectedEventSummary = createSelector(
    selectContractState,
    (state: ContractState) => state.selectedEventSummary
)

export const selectSelectedEventId = createSelector(
    selectContractState,
    (state: ContractState) => state.selectedEventId
)

export const selectNetwork = createSelector(
    selectContractState,
    (state: ContractState) => state.network
)