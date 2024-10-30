import { createReducer, on } from "@ngrx/store";
import { initialContractState } from "./contract.state";
import { newEventTopicIsInprogress, newEventTopicIsNOTInprogress, saveSummariesList, unSelectedEvent, updateSelectedEvent } from "./contract.actions";


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
    ))
);