
import { createReducer, on } from "@ngrx/store";
import { nonOwnerConnected, noOneConnected, ownerConnected } from "./account.actions";
import { AccountRole, initialAccount } from "./account.state";


export const connectedUserReducer = createReducer(
    initialAccount,
    on( ownerConnected, 
        (state, {address}) => (
            {...state, 
                role: AccountRole.OWNER,
                address
            }
        )
    ),
    on( nonOwnerConnected, 
        (state, {address}) => (
            {...state, 
                role: AccountRole.USER,
                address
            }
        )
    ),
    on( noOneConnected, 
        state => (
            {...state, 
                role: AccountRole.GUEST
            }
        )
    )
);