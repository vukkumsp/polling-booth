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