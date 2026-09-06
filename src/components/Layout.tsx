import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-sm font-semibold text-foreground border-b-2 border-foreground pb-0.5 transition-colors"
      : "text-sm text-muted-foreground hover:text-foreground transition-colors";

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top Nav */}
        <header className="border-b border-border bg-background">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            {/* Left links */}
            <div className="flex items-center gap-6">
              <NavLink to="/" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/events" className={linkClass}>
                Events
              </NavLink>
            </div>

            {/* Center brand */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Event</p>
              <p className="text-lg font-bold tracking-tight text-foreground">RSVP System</p>
            </div>

            {/* Right links */}
            <div className="flex items-center gap-6">
              <NavLink to="/rsvps" className={linkClass}>
                RSVPs
              </NavLink>

              {userName === null ? (
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={logout}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logout ({userName})
                </button>
              )}

              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {isDarkMode ? "☀ Light" : "☾ Dark"}
              </button>
            </div>
          </nav>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Layout;
