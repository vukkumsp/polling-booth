import { createAction, props } from "@ngrx/store";
import { Summary } from "../../ethereum/contractProxyClasses/Summary";


export const newEventTopicIsInprogress = createAction(
    '[New Topic] creation inprogress'
);

export const newEventTopicIsNOTInprogress = createAction(
    '[New Topic] creation NOT inprogress'
);

export const saveSummariesList = createAction(
    '[Event Summaries] updated',
    props<{summaries: Summary[]}>()
);

export const updateSelectedEvent = createAction(
    '[Selected Event] updated',
    props<{summary: Summary|null}>()
)

export const unSelectedEvent = createAction(
    '[Selected Event] unselected'
)

export const updateSelectedEventId = createAction(
    '[Selected EventId] updated',
    props<{id: number}>()
)

export const unSelectedEventId = createAction(
    '[Selected EventId] unselected'
)

export const selectLocalNetwork = createAction(
    '[Selected network] local'
)

export const selectSepoliaNetwork = createAction(
    '[Selected network] sepolia'
)