import { createAction, props } from "@ngrx/store";


export const ownerConnected = createAction(
    '[All Components] Owner Connected',
    props<{address: string}>()
);
export const nonOwnerConnected = createAction(
    '[All Components] Non-Owner Connected',
    props<{address: string}>()
)
export const noOneConnected = createAction('[All Components] No One Connected')