import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MobileviewState } from "./mobileview.state";

export const selectMobileviewState = (state: AppState) => state.mobileviewState;

export const selectSidebarToggleStatus = createSelector(
    selectMobileviewState,
    (state: MobileviewState) => state.sidebarVisible
);