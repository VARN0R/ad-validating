import React, { useState } from "react";
import { registerUser, loginUser } from "../services/api";
import styles from "./RegistrationForm.module.css";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to 'user'
  const [isLoginMode, setIsLoginMode] = useState(false); // New state for mode
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoginMode && password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters",
        type: "error",
      });
      return;
    }

    try {
      if (isLoginMode) {
        // Login mode
        await loginUser(username, password);
        setMessage({ text: "Login successful!", type: "success" });
      } else {
        // Registration mode
        await registerUser(username, password);
        setMessage({ text: "Registration successful!", type: "success" });
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage({
        text: `${
          isLoginMode ? "Login" : "Registration"
        } failed. Please try again.`,
        type: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isLoginMode ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          {isLoginMode ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>

      {message && (
        <div
          className={message.type === "success" ? styles.success : styles.error}
        >
          {message.text}
        </div>
      )}

      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setMessage(null);
        }}
      >
        {isLoginMode
          ? "Нет аккаунта? Зарегистрироваться"
          : "Уже есть аккаунт? Войти"}
      </button>
    </div>
  );
};

export default RegistrationForm;
