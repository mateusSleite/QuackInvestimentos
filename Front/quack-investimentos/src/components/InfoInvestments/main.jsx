import React, { useState } from "react";
import style from "./style.module.css";
import { Container, Grid, Checkbox } from "@mui/material";
import { green } from "@mui/material/colors";
import { dark } from "@mui/material/styles/createPalette";

export const InfoInvestments = () => {
  const options = ["RECEBIMENTOS", "DESPESAS FIXAS", "DESPESAS VARIAVEIS"];

  const [selectedCategory, setSelectedCategory] = useState("RECEBIMENTOS");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const data = [
    {
      vencimento: "01/05/2024",
      descricao: "Aluguel",
      valor: 1000,
      recebidoDe: "Inquilino 1",
      categoria: "Despesas Fixas",
      pago: false,
    },
    {
      vencimento: "10/05/2024",
      descricao: "Internet",
      valor: 80,
      recebidoDe: "Provedor",
      categoria: "Despesas Fixas",
      pago: true,
    },
    {
      vencimento: "15/05/2024",
      descricao: "Salário",
      valor: 2500,
      recebidoDe: "Empresa X",
      categoria: "Recebimentos",
      pago: false,
    },
    {
      vencimento: "20/05/2024",
      descricao: "Energia",
      valor: 150,
      recebidoDe: "Empresa Energética",
      categoria: "Despesas Fixas",
      pago: false,
    },
    {
      vencimento: "25/05/2024",
      descricao: "Manutenção",
      valor: 200,
      recebidoDe: "Oficina Y",
      categoria: "Despesas Variaveis",
      pago: false,
    },
  ];

  return (
    <Container sx={{ mt: 2 }} style={{ paddingRight: 0 }}>
      <div className={style.container}>
        <div style={{ display: "flex" }}>
          {options.map((option, index) => (
            <Grid key={index} item xs={4}>
              <div
                onClick={() => handleCategorySelect(option)}
                style={{
                  color: "black",
                  cursor: "default",
                  border: "1px solid rgba(0, 0, 0, 0.20)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "2em",
                  backgroundColor:
                    selectedCategory === option ? "white" : "#f5f5f5",
                  borderBottom:
                    selectedCategory === option
                      ? "none"
                      : "1px solid rgba(0, 0, 0, 0.20)",
                }}
              >
                {option}
              </div>
            </Grid>
          ))}
        </div>
        <Grid>
          <button className={style.button} style={{ marginLeft: "2em" }}>
            Adicionar
          </button>
          <button className={style.button}>Remover</button>
        </Grid>
        <div style={{ display: "flex", padding: "1.2em 1em 0 1em" }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2}>
            <span className={style.spanCar}>Vencimento</span>
          </Grid>
          <Grid item xs={3}>
            <span className={style.spanCar}>Descrição</span>
          </Grid>
          <Grid item xs={1}>
            <span className={style.spanCar}>Valor</span>
          </Grid>
          <Grid item xs={2}>
            <span className={style.spanCar}>Recebido de</span>
          </Grid>
          <Grid item xs={2.5}>
            <span className={style.spanCar}>Categoria</span>
          </Grid>
          <Grid item xs={1}>
            <span className={style.spanCar}>Pago</span>
          </Grid>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        >
          <div className={style.border}>
            <div className={style.border2}>
              {data.map((item, index) => (
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      index % 2 === 0 ? "rgba(22, 137, 144, 0.1)" : "ffffff",
                  }}
                  item
                  xs={12}
                  key={index}
                >
                  <Grid item xs={0.5}>
                    <Checkbox
                      sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        "&.Mui-checked": {
                          color: "rgba(22, 137, 144, 1)",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <span className={style.spanInfo}>{item.vencimento}</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span className={style.spanInfo}>{item.descricao}</span>
                  </Grid>
                  <Grid item xs={1}>
                    <span className={style.spanInfo}>{item.valor}</span>
                  </Grid>
                  <Grid item xs={2}>
                    <span className={style.spanInfo}>{item.recebidoDe}</span>
                  </Grid>
                  <Grid item xs={2.5}>
                    <span className={style.spanInfo}>{item.categoria}</span>
                  </Grid>
                  <Grid item xs={1}>
                    <span className={style.spanInfo}>
                      {item.pago ? "Sim" : "Não"}
                    </span>
                  </Grid>
                </Grid>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
