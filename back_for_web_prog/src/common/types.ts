import { RoleType } from "./enums";

export interface TokenData {
    token: string;
    refreshToken: string;
    expiresIn: number;
}

export interface DataStoredInJWT {
    id: string;
    role: RoleType;
}