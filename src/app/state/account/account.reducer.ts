
import { createReducer, on } from "@ngrx/store";
import { nonOwnerConnected, noOneConnected, ownerConnected } from "./account.actions";
import { AccountRole, initialAccount } from "./account.state";


export const connectedUserReducer = createReducer(
    initialAccount,
    on( ownerConnected, 
        state => (
            {...state, 
                role: AccountRole.OWNER
            }
        )
    ),
    on( nonOwnerConnected, 
        state => (
            {...state, 
                state: AccountRole.USER
            }
        )
    ),
    on( noOneConnected, 
        state => (
            {...state, 
                state: AccountRole.GUEST
            }
        )
    )
);