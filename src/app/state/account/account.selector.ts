import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AccountState } from "./account.state";

export const selectAccountState = (state: AppState) => state.accountConnected;

export const selectAccountRole = createSelector(
    selectAccountState,
    (state: AccountState) => state.role
)

export const selectAccountAddress = createSelector(
    selectAccountState,
    (state: AccountState) => state.address
)
