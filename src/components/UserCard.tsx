import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (): void => {
    onSelect(user);
  };
  // Demo only -- shows the typed onChange pattern, not wired to real state
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Note:", e.target.value);
  };
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{user.name}</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">{user.email}</p>
      <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
        {user.role}
      </p>
      <button
        onClick={handleClick}
        className="mt-4 rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        Select
      </button>
      <input
        onChange={handleNoteChange}
        placeholder="Quick note (demo only)"
        className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
export default UserCard;
