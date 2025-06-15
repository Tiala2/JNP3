import React, { useState } from "react";
import styles from "../styles/survival.module.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username.trim() || !password.trim()) {
      setError("Preencha nome e senha.");
      return;
    }
    if (isRegister) {
      // Cadastro
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      if (res.ok) {
        // Login automático após cadastro
        onLogin(username.trim());
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao cadastrar.");
      }
    } else {
      // Login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      if (res.ok) {
        onLogin(username.trim());
      } else {
        const data = await res.json();
        setError(data.error || "Usuário ou senha inválidos.");
      }
    }
  }

  return (
    <div className={styles.login_container}>
      <form className={styles.login_box} onSubmit={handleSubmit}>
        <h1>{isRegister ? "CADASTRAR" : "LOGIN"}</h1>
        <input
          className={styles.login_input}
          type="text"
          placeholder="Seu Nome"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className={styles.login_input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button className={styles.pixel_button} type="submit">
            {isRegister ? "Cadastrar" : "Entrar"}
          </button>
          <button
            className={styles.pixel_button}
            type="button"
            onClick={() => {
              setIsRegister(r => !r);
              setError("");
              setSuccess("");
            }}
          >
            {isRegister ? "Já tenho conta" : "Cadastrar"}
          </button>
        </div>
        {error && <div style={{ color: "#ff3c3c", marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: "#43a047", marginTop: 8 }}>{success}</div>}
      </form>
    </div>
  );
}