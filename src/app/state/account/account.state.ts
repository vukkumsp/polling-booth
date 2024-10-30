import { ethers } from "ethers";

export enum AccountRole{
    OWNER="OWNER", 
    USER="USER", 
    GUEST="GUEST"
}

export interface AccountState {
    role: AccountRole;
    address: string;
    provider: ethers.BrowserProvider | null;
}

export const initialAccount: AccountState = {
    role: AccountRole.GUEST,
    address: "",
    provider: null
}
