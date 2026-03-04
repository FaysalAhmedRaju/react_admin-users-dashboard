import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import type { User, UserOverride } from "../types/user";
import { mergeUsersWithOverrides, saveUserOverride } from "../utils/localStorage";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError("");
            const data = await fetchUsers();
            setUsers(mergeUsersWithOverrides(data));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load users");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadUsers();
    }, [loadUsers]);

    const updateUser = useCallback((id: number, patch: UserOverride) => {
        saveUserOverride(id, patch);
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    }, []);

    return { users, isLoading, error, reload: loadUsers, updateUser };
}
