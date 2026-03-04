import type { User, UserOverride } from "../types/user";

const STORAGE_KEY = "admin-users-overrides-v1";

function readMap(): Record<number, UserOverride> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) as Record<number, UserOverride>;
    } catch {
        return {};
    }
}

export function saveUserOverride(userId: number, value: UserOverride) {
    const map = readMap();
    map[userId] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function mergeUsersWithOverrides(users: User[]): User[] {
    const map = readMap();
    return users.map((u) => (map[u.id] ? { ...u, ...map[u.id] } : u));
}
