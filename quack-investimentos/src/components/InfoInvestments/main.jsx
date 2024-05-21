import { useState, useEffect } from "react";
import style from "./style.module.css";
import { Container, Grid, Checkbox } from "@mui/material";
import { CustomModal } from "../CustomModal/main";
import { DescriptionModal } from "../DescriptionModal/main";

const handlePreviousPage = (setCurrentPage) => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const handleNextPage = (setCurrentPage, totalPages) => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};

const baseURL = "https://quack-investimentos-back.vercel.app/investments";

export const InfoInvestments = ({ apiData, handleRemove, handleCheckboxChange, selectedCategory, setSelectedCategory }) => {
  const options = ["RECEBIMENTOS", "DESPESAS FIXAS", "DESPESAS VARIAVEIS"];

  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = (idPar) => {
    setId(idPar);
    setShowDetails(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return apiData.slice(startIndex, endIndex);
  };
  
  const formatDate = (data) => {
    console.log("data: ", data)
    const dia = ("0" + data.getDate()).slice(-2);
    const mes = ("0" + (data.getMonth() + 1)).slice(-2);
    const ano = data.getFullYear();

    if (ano < 1980)
      return  " ";

    return `${dia}/${mes}/${ano}`;
  };

  const overlay = show ? (
    <div className={style.overlay} onClick={handleClose}></div>
  ) : null;
  const overlayDetails = showDetails ? (
    <div className={style.overlay} onClick={handleCloseDetails}></div>
  ) : null;

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
          <button
            className={style.button}
            style={{ marginLeft: "2em" }}
            onClick={handleShow}
          >
            Adicionar
          </button>
          <button className={style.button} onClick={handleRemove}>
            Remover
          </button>
        </Grid>
        <div style={{ display: "flex", padding: "1.2em 1em 0 1em" }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2.4}>
            <span className={style.spanCar}>Nome:</span>
          </Grid>
          <Grid item xs={1}>
            <span className={style.spanCar}>Valor:</span>
          </Grid>
          <Grid item xs={2}>
            <span className={style.spanCar}>Início:</span>
          </Grid>
          <Grid item xs={2}>
            <span className={style.spanCar}>Fim:</span>
          </Grid>
          <Grid item xs={2.5}>
            <span className={style.spanCar}>Classificação</span>
          </Grid>
          <Grid item xs={1}>
            <span className={style.spanCar}>Entrada/Saída</span>
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
              {getCurrentPageData().map((item) => {
                console.log("Erro", item.startDate)
                console.log()
                const data = new Date(item.startDate);
                const formatoData = formatDate(data);
                const dataEnd = new Date(item.endDate);
                const formatoDataEnd = formatDate(dataEnd);
                return (
                  <Grid
                    key={item._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor:
                        item.index % 2 === 0
                          ? "ffffff"
                          : "rgba(22, 137, 144, 0.1)",
                    }}
                    item
                    xs={12}
                  >
                    <Grid item xs={0.5}>
                      <Checkbox
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          "&.Mui-checked": {
                            color: "rgba(22, 137, 144, 1)",
                          },
                        }}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </Grid>
                    <Grid item xs={11.5} sx={{ display: "flex", cursor: 'default' }} onClick={() => handleShowDetails(item._id)}>
                      <Grid item xs={2.5}>
                        <span className={style.spanInfo}>
                          {item.nameInvestment}
                        </span>
                      </Grid>
                      <Grid item xs={1}>
                        <span className={style.spanInfo}>{item.value}</span>
                      </Grid>
                      <Grid item xs={2.1}>
                        <span className={style.spanInfo}>{formatoData}</span>
                      </Grid>
                      <Grid item xs={2.1}>
                        <span className={style.spanInfo}>{formatoDataEnd}</span>
                      </Grid>
                      <Grid item xs={2.6}>
                        <span className={style.spanInfo}>{item.category}</span>
                      </Grid>
                      <Grid item xs={1}>
                        <span className={style.spanInfo}>
                          {item.isInput === null ? "" : item.isInput ? "Entrada" : "Saída"}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
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
            <span style={{ color: "rgba(0, 0, 0, 0.70)", fontWeight: "bold" }}>
              Mostrando de {(currentPage - 1) * itemsPerPage + 1} até{" "}
              {Math.min(currentPage * itemsPerPage, apiData.length)} de{" "}
              {apiData.length} Registros
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
      <Container sx={{ mt: 2 }} style={{ paddingRight: 0 }}>
        {overlay}
        <CustomModal show={show} onHide={handleClose} />
      </Container>
      <Container sx={{ mt: 2 }} style={{ paddingRight: 0 }}>
        {overlayDetails}
        <DescriptionModal show={showDetails} onHide={handleCloseDetails} id={id} />
      </Container>
    </Container>
  );
};
