"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Não foi possível cadastrar.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "2rem 1rem" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>Criar conta</h2>
      <p style={{ marginBottom: "1.5rem", color: "#6b7280" }}>Cadastre-se para salvar e gerenciar seus cards Pokémon.</p>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" required style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" required style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        {error ? <p style={{ color: "#b91c1c" }}>{error}</p> : null}
        <button type="submit" style={{ padding: "0.8rem", borderRadius: "0.5rem", background: "#1e40af", color: "white", fontWeight: 700 }}>Cadastrar</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Já tem conta? <Link href="/login" style={{ color: "#2563eb" }}>Entrar</Link>
      </p>
    </div>
  );
}
