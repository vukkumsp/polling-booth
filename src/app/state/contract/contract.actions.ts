import { createAction } from "@ngrx/store";


export const newEventTopicIsInprogress = createAction(
    '[New Topic] creation inprogress'
);

export const newEventTopicIsNOTInprogress = createAction(
    '[New Topic] creation NOT inprogress'
);