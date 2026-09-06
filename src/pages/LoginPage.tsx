import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name);
    navigate("/rsvps");
  };

  return (
    <div className="flex items-start justify-center pt-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
          Welcome back
        </p>
        <h2 className="mb-6 text-2xl font-bold text-foreground">Log In</h2>
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-foreground">
            Your name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Regina Cadeliña"
            onKeyDown={(e) => {
              if (e.key === "Enter" && name !== "") handleLogin();
            }}
          />
        </div>
        <Button
          onClick={handleLogin}
          disabled={name === ""}
          className="mt-4 w-full"
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
export default LoginPage;
