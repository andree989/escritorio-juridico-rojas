import React, { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface MessageRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  user_id: string | null;
}

interface InboxProps {
  user: User | null;
}

// Muestra los últimos mensajes recibidos (solo cuando hay una sesión activa).
// Este componente es un ejemplo de cómo leer datos desde Supabase.
const Inbox: React.FC<InboxProps> = ({ user }) => {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [total, setTotal] = useState(0);

  const [selectedMessage, setSelectedMessage] = useState<MessageRecord | null>(null);

  const filteredMessages = useMemo(() => {
    if (!query) return messages;
    const lc = query.trim().toLowerCase();
    return messages.filter((msg) => {
      return (
        msg.name.toLowerCase().includes(lc) ||
        msg.email.toLowerCase().includes(lc) ||
        msg.message.toLowerCase().includes(lc)
      );
    });
  }, [messages, query]);

  console.log("Inbox component loaded");

  useEffect(() => {
    console.log("useEffect triggered: user", user);
    if (!user) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      const from = (page - 1) * pageSize;
      const to = page * pageSize - 1;

      let queryBuilder = supabase
        .from("contacts")
        .select("id, name, email, message, created_at, user_id", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      // Mostrar solo los mensajes del usuario logueado (puede ajustarse para roles/admin)
      if (user?.id) {
        queryBuilder = queryBuilder.eq("user_id", user.id);
      }

      if (startDate) {
        queryBuilder = queryBuilder.gte("created_at", startDate);
      }
      if (endDate) {
        queryBuilder = queryBuilder.lte("created_at", `${endDate}T23:59:59Z`);
      }

      if (query) {
        const q = query.trim().replace(/"/g, "\\\"");
        queryBuilder = queryBuilder.or(
          `name.ilike.%${q}%,email.ilike.%${q}%,message.ilike.%${q}%`
        );
      }

      const { data, error: fetchError, count } = await queryBuilder;

      if (fetchError) {
        setError(fetchError.message);
        setMessages([]);
      } else {
        setMessages(data ?? []);
        setTotal(count ?? 0);
      }

      setLoading(false);
    };

    fetchMessages();
  }, [user, page, query, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (!user) {
    return null;
  }

  return (
    <section id="inbox" className="section">
      <div className="container">
        <div className="panel">
          <div className="panel-header">
            <h2 className="text-2xl font-bold">Mensajes recibidos</h2>
            <div className="panel-search">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre, email o texto..."
                className="auth-input"
              />
            </div>
          </div>

          <div className="panel-filters">
            <label>
              Desde:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="auth-input"
              />
            </label>
            <label>
              Hasta:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="auth-input"
              />
            </label>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setQuery("");
                setStartDate("");
                setEndDate("");
                setPage(1);
              }}
            >
              Limpiar filtros
            </button>
          </div>

          {loading && <p className="panel-info">Cargando mensajes…</p>}

          {error && <p className="panel-error">Error al cargar mensajes: {error}</p>}

          {!loading && !error && filteredMessages.length === 0 && (
            <p className="panel-info">No se encontraron mensajes.</p>
          )}

          {!loading && !error && filteredMessages.length > 0 && (
            <>
              <div className="card-grid">
                {filteredMessages.map((msg) => (
                  <button
                    key={msg.id}
                    type="button"
                    className="card card-clickable"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <div className="panel-row">
                      <p className="text-sm text-gray-300">
                        <strong>{msg.name}</strong> — {msg.email}
                      </p>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed line-clamp-3">
                      {msg.message}
                    </p>
                  </button>
                ))}
              </div>

              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </button>
                <span className="pagination-info">
                  Página {page} de {totalPages} • {total} mensaje(s)
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}

          {selectedMessage && (
            <div className="modal" role="dialog" aria-modal="true">
              <div className="modal-backdrop" onClick={() => setSelectedMessage(null)} />
              <div className="modal-card">
                <div className="modal-header">
                  <h3 className="text-lg font-bold">Mensaje de {selectedMessage.name}</h3>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Cerrar
                  </button>
                </div>
                <p className="text-sm text-gray-300">{selectedMessage.email}</p>
                <p className="text-xs text-gray-400">
                  Recibido: {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
                <div className="modal-body">
                  <p>{selectedMessage.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Inbox;
