import type { User, UserRole, UserSort, UserStatus } from "../types/user";

export function filterUsers(
    users: User[],
    search: string,
    role: UserRole | "all",
    status: UserStatus | "all"
) {
    const q = search.trim().toLowerCase();

    return users.filter((u) => {
        const bySearch = q === "" || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        const byRole = role === "all" || u.role === role;
        const byStatus = status === "all" || u.status === status;
        return bySearch && byRole && byStatus;
    });
}

export function sortUsers(users: User[], sortBy: UserSort) {
    const copy = [...users];
    if (sortBy === "name_asc") return copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function paginateUsers(users: User[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
}
