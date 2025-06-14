import React, { useState } from "react";
import styles from "../styles/survival.module.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  }

  return (
    <div className={styles.login_container}>
      <form className={styles.login_box} onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <input
          className={styles.login_input}
          type="text"
          placeholder="Seu Nome"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button className={styles.pixel_button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}