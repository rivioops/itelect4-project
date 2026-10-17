import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { registerUser, loginUser } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleRegister = async (e?: FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    if (!name || !email || !password) return;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Register the user
      await registerUser({ name, email, password });

      // 2. Automatically log in to get the JWT token
      const authData = await loginUser({ email, password });
      login(authData.token, authData.user);

      navigate("/rsvps");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to register. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center pt-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
          Get Started
        </p>
        <h2 className="mb-6 text-2xl font-bold text-foreground">Create Account</h2>

        {error && (
          <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Regina Cadeliña"
              required
              autoFocus
            />
          </div>

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
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-foreground">
              Password (min 8 chars)
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !name || !email || !password}
            className="mt-2 w-full"
          >
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
