import React, { useState } from "react";
import styles from "../styles/survival.module.css";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (user.trim()) onLogin(user.trim());
  }

  return (
    <div className={styles.login_container}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={user}
          onChange={e => setUser(e.target.value)}
          className={styles.login_input}
        />
        <button type="submit" className={styles.shoot}>Entrar</button>
      </form>
    </div>
  );
}