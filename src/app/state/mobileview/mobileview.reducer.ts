import { createReducer, on } from "@ngrx/store";
import { initialMobileViewState } from "./mobileview.state";
import { toggleSidebar } from "./mobileview.actions";


export const mobileviewReducer = createReducer(
    initialMobileViewState,
    on(toggleSidebar, (state) => ({
        ...state,
        sidebarVisible: (state.sidebarVisible)?false:true
    }))
);