import { createAction } from "@ngrx/store";


export const ownerConnected = createAction('[All Components] Owner Connected');
export const nonOwnerConnected = createAction('[All Components] Non-Owner Connected')
export const noOneConnected = createAction('[All Components] No One Connected')