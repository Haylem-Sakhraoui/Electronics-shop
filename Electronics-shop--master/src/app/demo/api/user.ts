
import { Token } from './token';


export interface User { 
    id?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    role?: String;
    token?: Token;

}
export namespace Admin {
    export type RoleEnum = 'ADMIN' | 'CLIENT'|'GUEST';
    export const RoleEnum = {
        Admin: 'ADMIN' as RoleEnum,
        Client: 'CLIENT' as RoleEnum,
        Guest: 'GUEST' as RoleEnum
    };
}


