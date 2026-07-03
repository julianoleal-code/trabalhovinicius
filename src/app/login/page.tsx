"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "2rem 1rem" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>Entrar</h2>
      <p style={{ marginBottom: "1.5rem", color: "#6b7280" }}>Acesse sua conta para gerenciar seus cards Pokémon.</p>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" required style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" required style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        {error ? <p style={{ color: "#b91c1c" }}>{error}</p> : null}
        <button type="submit" style={{ padding: "0.8rem", borderRadius: "0.5rem", background: "#1e40af", color: "white", fontWeight: 700 }}>Entrar</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Ainda não tem conta? <Link href="/register" style={{ color: "#2563eb" }}>Cadastre-se</Link>
      </p>
    </div>
  );
}
