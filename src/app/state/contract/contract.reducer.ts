import { createReducer, on } from "@ngrx/store";
import { initialContractState } from "./contract.state";
import { newEventTopicIsInprogress, newEventTopicIsNOTInprogress, saveSummariesList, selectLocalNetwork, selectSepoliaNetwork, unSelectedEvent, unSelectedEventId, updateSelectedEvent, updateSelectedEventId } from "./contract.actions";


export const connectedContractReducer = createReducer(
    initialContractState,
    on(newEventTopicIsInprogress, state => (
        {...state, 
            newEventTopicInprogress: true,
            selectedEventSummary: null
        }
    )),
    on(newEventTopicIsNOTInprogress, state => (
        {...state, 
            newEventTopicInprogress: false
        }
    )),
    on(saveSummariesList, (state, {summaries}) => (
        {...state, 
            eventSummaries: summaries
        }
    )),
    on(updateSelectedEvent, (state, {summary}) => (
        {
            ...state,
            selectedEventSummary: summary,
            newEventTopicInprogress: false
        }
    )),
    on(unSelectedEvent, (state) => (
        {
            ...state,
            selectedEventSummary: null
        }
    )),
    on(updateSelectedEventId, (state, {id}) => (
        {
            ...state,
            selectedEventId: id,
            newEventTopicInprogress: false
        }
    )),
    on(unSelectedEventId, (state) => (
        {
            ...state,
            selectedEventId: -1
        }
    )),
    on(selectLocalNetwork, (state) => (
        {
            ...state,
            network: "local"
        }
    )),
    on(selectSepoliaNetwork, (state) => (
        {
            ...state,
            network: "sepolia"
        }
    )),
);