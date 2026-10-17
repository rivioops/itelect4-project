import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { loginUser } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e?: FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });
      login(data.token, data.user);
      navigate("/rsvps");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center pt-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
          Welcome back
        </p>
        <h2 className="mb-6 text-2xl font-bold text-foreground">Log In</h2>

        {error && (
          <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="mt-2 w-full"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
