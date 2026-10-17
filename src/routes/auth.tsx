import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, LoaderCircle, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner sign-in — Sangamithra D" },
      { name: "description", content: "Sign in to manage Sangamithra D’s portfolio." },
      { property: "og:title", content: "Owner sign-in — Sangamithra D" },
      { property: "og:description", content: "Private access to manage portfolio content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const OWNER_EMAIL = "duraisamysangamithra19@gmail.com";

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (email.trim().toLowerCase() !== OWNER_EMAIL) {
      setError("This sign-in is reserved for the portfolio owner.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "create") {
        const { error: authError } = await supabase.auth.signUp({ email: email.trim(), password });
        if (authError) throw authError;
        setNotice("Check your email for a confirmation link, then return here to sign in.");
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        await navigate({ to: "/manage" });
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign-in could not be completed.");
    } finally {
      setBusy(false);
    }
  }

  async function signInWith(provider: "google" | "lovable") {
    setError("");
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (result.error) {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    await navigate({ to: "/manage" });
    setBusy(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </a>
        <section className="glass-strong rounded-2xl p-7 sm:p-9">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Private area</p>
          <h1 className="mt-2 text-3xl font-black">Portfolio access</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage the portfolio. Editing is limited to its owner.</p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block space-y-1.5 text-sm font-semibold">
              Email
              <Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="block space-y-1.5 text-sm font-semibold">
              Password
              <Input type="password" autoComplete={mode === "create" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
            </label>
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? <LoaderCircle className="animate-spin" /> : <Mail />}
              {mode === "create" ? "Create owner account" : "Sign in"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or continue with<span className="h-px flex-1 bg-border" /></div>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" disabled={busy} onClick={() => void signInWith("google")}>Google</Button>
            <Button type="button" variant="outline" disabled={busy} onClick={() => void signInWith("lovable")}><Sparkles /> Lovable</Button>
          </div>

          <button type="button" onClick={() => { setMode((current) => current === "signin" ? "create" : "signin"); setError(""); setNotice(""); }} className="mt-5 w-full text-center text-sm font-semibold text-primary hover:underline">
            {mode === "signin" ? "Need to create the owner account?" : "Already have an account? Sign in"}
          </button>
          {notice && <p role="status" className="mt-4 rounded-lg bg-primary/10 p-3 text-sm text-foreground">{notice}</p>}
          {error && <p role="alert" className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        </section>
      </div>
    </main>
  );
}