import React, { useState } from "react";
import style from "./style.module.css";
import { Container, Grid, Checkbox } from "@mui/material";

const handlePreviousPage = (setCurrentPage) => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const handleNextPage = (setCurrentPage, totalPages) => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};

export const InfoInvestments = () => {
  const options = ["RECEBIMENTOS", "DESPESAS FIXAS", "DESPESAS VARIAVEIS"];

  const [selectedCategory, setSelectedCategory] = useState("RECEBIMENTOS");
  const [data, setData] = useState([
    {
      id: 1,
      vencimento: "01/05/2024",
      descricao: "Aluguel",
      valor: 1000,
      recebidoDe: "Inquilino 1",
      categoria: "Despesas Fixas",
      pago: false,
    },
    {
      id: 2,
      vencimento: "10/05/2024",
      descricao: "Internet",
      valor: 80,
      recebidoDe: "Provedor",
      categoria: "Despesas Fixas",
      pago: true,
    },
    {
      id: 3,
      vencimento: "15/05/2024",
      descricao: "Salário",
      valor: 2500,
      recebidoDe: "Empresa X",
      categoria: "Recebimentos",
      pago: false,
    },
    {
      id: 4,
      vencimento: "20/05/2024",
      descricao: "Energia",
      valor: 150,
      recebidoDe: "Empresa Energética",
      categoria: "Despesas Fixas",
      pago: false,
    },
    {
      id: 5,
      vencimento: "25/05/2024",
      descricao: "Manutenção",
      valor: 200,
      recebidoDe: "Oficina Y",
      categoria: "Despesas Variaveis",
      pago: false,
    },
    {
      id: 6,
      vencimento: "25/05/2024",
      descricao: "Manutenção",
      valor: 200,
      recebidoDe: "Oficina Y",
      categoria: "Despesas Variaveis",
      pago: false,
    },
    {
      id: 7,
      vencimento: "25/05/2024",
      descricao: "Manutenção",
      valor: 200,
      recebidoDe: "Oficina Y",
      categoria: "Despesas Variaveis",
      pago: false,
    },
    {
      id: 8,
      vencimento: "25/05/2024",
      descricao: "Manutenção",
      valor: 200,
      recebidoDe: "Oficina Y",
      categoria: "Despesas Variaveis",
      pago: false,
    },
    {
      id: 9,
      vencimento: "25/05/2024",
      descricao: "Manutenção",
      valor: 200,
      recebidoDe: "Oficina Y",
      categoria: "Despesas Variaveis",
      pago: false,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleRemove = () => {
    const newData = data.filter((item) => !selectedItems.includes(item.id));
    setData(newData);
    setSelectedItems([]);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

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
          <button className={style.button} onClick={handleRemove}>
            Remover
          </button>
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
              {getCurrentPageData().map((item) => (
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      item.id % 2 === 0 ? "rgba(22, 137, 144, 0.1)" : "ffffff",
                  }}
                  item
                  xs={12}
                  key={item.id}
                >
                  <Grid item xs={0.5}>
                    <Checkbox
                      sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        "&.Mui-checked": {
                          color: "rgba(22, 137, 144, 1)",
                        },
                      }}
                      onChange={() => handleCheckboxChange(item.id)}
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
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              padding: "0.3em 0 0 1.2em",
            }}
          >
            <span
              style={{ color: "rgba(0, 0, 0, 0.70)", fontWeight: "bold" }}
            >
              Mostrando de {(currentPage - 1) * itemsPerPage + 1} até{" "}
              {Math.min(currentPage * itemsPerPage, data.length)} de{" "}
              {data.length} Registros
            </span>
            <div>
              <button
                className={style.nextdown}
                onClick={() => handlePreviousPage(setCurrentPage)}
              >
                Anterior
              </button>
              <span style={{ color: "black" }}>{currentPage}</span>
              <button
                className={style.nextdown}
                onClick={() => handleNextPage(setCurrentPage, totalPages)}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
