
export enum AccountRole{
    OWNER="OWNER", 
    USER="USER", 
    GUEST="GUEST"
}

export interface AccountState {
    role: AccountRole;
    address: string;
}

export const initialAccount: AccountState = {
    role: AccountRole.GUEST,
    address: ""
}
