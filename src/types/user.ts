export type UserRole = "admin" | "manager" | "user";
export type UserStatus = "active" | "inactive";
export type UserSort = "name_asc" | "created_desc";

export interface User {
    id: number;
    name: string;
    email: string;
    company: string;
    phone: string;
    website: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
}

export type UserOverride = Pick<User, "role" | "status">;
