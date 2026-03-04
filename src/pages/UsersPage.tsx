import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { Loading } from "../components/Loading";
import { useDebounce } from "../hooks/useDebounce";
import { useUsers } from "../hooks/useUsers";
import type { UserRole, UserSort, UserStatus } from "../types/user";
import { filterUsers, paginateUsers, sortUsers } from "../utils/userFilters";

const PAGE_SIZE = 5;

export function UsersPage() {
    const { users, isLoading, error, reload } = useUsers();

    const [searchInput, setSearchInput] = useState("");
    const [role, setRole] = useState<UserRole | "all">("all");
    const [status, setStatus] = useState<UserStatus | "all">("all");
    const [sortBy, setSortBy] = useState<UserSort>("name_asc");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(searchInput, 300);

    const preparedUsers = useMemo(() => {
        const filtered = filterUsers(users, debouncedSearch, role, status);
        return sortUsers(filtered, sortBy);
    }, [users, debouncedSearch, role, status, sortBy]);

    const totalPages = Math.max(1, Math.ceil(preparedUsers.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pagedUsers = useMemo(
        () => paginateUsers(preparedUsers, safePage, PAGE_SIZE),
        [preparedUsers, safePage]
    );

    if (isLoading) return <Loading />;
    if (error) return <ErrorState message={error} onRetry={reload} />;

    return (
        <section>
            <h1>Admin Users Dashboard</h1>

            <div>
                <label htmlFor="search">Search</label>
                <input
                    id="search"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Search by name or email"
                />

                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value as UserRole | "all");
                        setPage(1);
                    }}
                >
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                </select>

                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value as UserStatus | "all");
                        setPage(1);
                    }}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <label htmlFor="sortBy">Sort</label>
                <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value as UserSort)}>
                    <option value="name_asc">Name A-Z</option>
                    <option value="created_desc">CreatedAt Newest</option>
                </select>
            </div>

            {preparedUsers.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <table aria-label="Users table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedUsers.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.company}</td>
                                    <td>{u.role}</td>
                                    <td>{u.status}</td>
                                    <td>
                                        <Link to={`/users/${u.id}`}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}>
                            Prev
                        </button>
                        <span aria-live="polite">
                            Page {safePage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
