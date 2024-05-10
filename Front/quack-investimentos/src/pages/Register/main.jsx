import React, { useState } from "react";
import axios from "axios";
import style from "./style.module.css";
import { Container, Link } from "@mui/material";

export const Register = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Nome:", name);
    console.log("Data de Nascimento:", birthdate);
    console.log("Email:", email);
    console.log("CPF:", cpf);
    console.log("Senha:", password);
    console.log("Confirme a Senha:", confirmPassword);

    const json = {
      name,
      email,
      password,
      confirmPassword,
      cpf,
      birthdate
    };
    
    console.log(json);
    try {
      await axios.post("http://localhost:8080/api/user/register", json);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className={style.border}>
        <h1 className={style.tittle}>CADASTRO</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <div className={style.caixas}>
              <label className={style.label}>Nome:</label>
              <input
                className={style.input2}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.caixas}>
              <label className={style.label}>Data de Nascimento:</label>
              <input
                className={style.input2}
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
          </div>
          <div className={style.caixas}>
            <label className={style.label}>Email:</label>
            <input
              className={style.input}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.caixas}>
            <label className={style.label}>CPF:</label>
            <input
              className={style.input}
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div className={style.caixas}>
              <label className={style.label}>Senha:</label>
              <input
                className={style.input2}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.caixas}>
              <label className={style.label}>Confirme a Senha:</label>
              <input
                className={style.input2}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={style.button} type="submit">
              Cadastrar
            </button>
          </div>
        </form>
        <span style={{ marginTop: "0.8em" }}>Já possui uma Conta?</span>
        <Link
          href="/login"
          style={{
            cursor: "pointer",
            color: "#168990",
            textDecoration: "none",
          }}
        >
          Entre
        </Link>
      </div>
    </Container>
  );
};
