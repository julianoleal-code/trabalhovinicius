"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CardItem = {
  id: string;
  name: string;
  type: string;
  hp: string;
  attack: string;
  description: string;
  image: string;
  rarity: string;
  createdAt: string;
};

const emptyForm = {
  name: "",
  type: "",
  hp: "",
  attack: "",
  description: "",
  image: "",
  rarity: "",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCreatedAt, setEditingCreatedAt] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadData() {
      const meResponse = await fetch("/api/auth/me");
      if (!meResponse.ok) {
        router.replace("/login");
        return;
      }
      const me = await meResponse.json();
      setUser(me.user);

      const cardsResponse = await fetch("/api/cards");
      if (cardsResponse.ok) {
        const data = await cardsResponse.json();
        setCards(data);
      }
    }
    loadData();
  }, [router]);

  const filteredCards = useMemo(() => {
    const term = search.toLowerCase();
    return cards.filter((card) => card.name.toLowerCase().includes(term));
  }, [cards, search]);

  async function saveCard(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/cards/${editingId}` : "/api/cards";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setStatus("Não foi possível salvar o card.");
      return;
    }

    const data = await response.json();
    setForm(emptyForm);
    setEditingId(null);
    setEditingCreatedAt(null);
    setStatus(editingId ? "Card atualizado com sucesso." : "Card criado com sucesso.");
    const refreshResponse = await fetch("/api/cards");
    if (refreshResponse.ok) {
      const refreshed = await refreshResponse.json();
      setCards(refreshed);
    }
  }

  async function editCard(card: CardItem) {
    setEditingId(card.id);
    setEditingCreatedAt(card.createdAt);
    setForm({
      name: card.name,
      type: card.type,
      hp: card.hp,
      attack: card.attack,
      description: card.description,
      image: card.image,
      rarity: card.rarity,
    });
  }

  async function deleteCard(id: string) {
    const response = await fetch(`/api/cards/${id}`, { method: "DELETE" });
    if (response.ok) {
      setCards((current) => current.filter((card) => card.id !== id));
      setStatus("Card excluído com sucesso.");
    }
  }

  function logout() {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace("/login");
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Dashboard</h2>
          <p style={{ color: "#6b7280" }}>Bem-vindo, {user?.name || "usuário"}.</p>
        </div>
        <button onClick={logout} style={{ padding: "0.7rem 1rem", borderRadius: "0.5rem", background: "#ef4444", color: "white" }}>Sair</button>
      </div>

      <form onSubmit={saveCard} style={{ display: "grid", gap: "0.75rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "1rem", background: "#f9fafb" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{editingId ? "Editar card" : "Criar card"}</h3>
        <div style={{ display: "grid", gap: "0.25rem", color: "#4b5563" }}>
          <strong>Campos obrigatórios do card:</strong>
          <p>Nome do Pokémon • Tipo • HP • Ataque principal • Descrição • Imagem do Pokémon • Raridade</p>
          <p>Data de criação: {editingCreatedAt ? new Date(editingCreatedAt).toLocaleString("pt-BR") : "Será definida automaticamente ao salvar."}</p>
        </div>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome do Pokémon" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Tipo" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={form.hp} onChange={(e) => setForm({ ...form, hp: e.target.value })} placeholder="HP" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={form.attack} onChange={(e) => setForm({ ...form, attack: e.target.value })} placeholder="Ataque principal" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db", minHeight: "90px" }} />
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="URL da imagem" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <input value={form.rarity} onChange={(e) => setForm({ ...form, rarity: e.target.value })} placeholder="Raridade" required style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button type="submit" style={{ padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#16a34a", color: "white", fontWeight: 700 }}>{editingId ? "Salvar alterações" : "Criar card"}</button>
          {editingId ? <button type="button" onClick={() => { setEditingId(null); setEditingCreatedAt(null); setForm(emptyForm); }} style={{ padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "#e5e7eb" }}>Cancelar</button> : null}
        </div>
        {status ? <p style={{ color: "#2563eb" }}>{status}</p> : null}
      </form>

      <div style={{ display: "grid", gap: "1rem" }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar card por nome" style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
        {filteredCards.map((card) => (
          <div key={card.id} style={{ border: "1px solid #e5e7eb", borderRadius: "1rem", padding: "1rem", display: "grid", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <strong>{card.name}</strong>
              <span style={{ color: "#6b7280" }}>Data de criação: {new Date(card.createdAt).toLocaleString("pt-BR")}</span>
            </div>
            <p>Tipo: {card.type}</p>
            <p>HP: {card.hp}</p>
            <p>Ataque: {card.attack}</p>
            <p>{card.description}</p>
            {card.image ? <img src={card.image} alt={card.name} style={{ width: "120px", borderRadius: "0.75rem" }} /> : null}
            <p>Raridade: {card.rarity}</p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => editCard(card)} style={{ padding: "0.6rem 0.9rem", borderRadius: "0.5rem", background: "#3b82f6", color: "white" }}>Editar</button>
              <button onClick={() => deleteCard(card.id)} style={{ padding: "0.6rem 0.9rem", borderRadius: "0.5rem", background: "#ef4444", color: "white" }}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
