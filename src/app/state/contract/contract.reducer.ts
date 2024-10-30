import { createReducer, on } from "@ngrx/store";
import { initialContractState } from "./contract.state";
import { newEventTopicIsInprogress, newEventTopicIsNOTInprogress } from "./contract.actions";


export const connectedContractReducer = createReducer(
    initialContractState,
    on(newEventTopicIsInprogress, state => ({...state, newEventTopicInprogress: true})),
    on(newEventTopicIsNOTInprogress, state => ({...state, newEventTopicInprogress: false}))
);