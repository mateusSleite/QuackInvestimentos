import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import style from "./style.module.css";
import details from "../../assets/Imagens/detalhes.png";
import { Container, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PaidIcon from "@mui/icons-material/Paid";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import OutputIcon from "@mui/icons-material/Output";
import { Savings } from "@mui/icons-material";
import axios from "axios";

export const DescriptionModal = ({ show, onHide, id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://quack-investimentos-back.vercel.app/investments/getid/?id=${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show, id]);

  const Clean = () => {
    setData("");
    onHide();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dia = ("0" + date.getDate()).slice(-2);
    const mes = ("0" + (date.getMonth() + 1)).slice(-2);
    const ano = date.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ bottom: "45em", position: "relative", zIndex: "1001" }}
    >
      {console.log(data)}
      {data && (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <div className={style.modal}>
            <Grid>
              <div className={style.details}>
                <img className={style.detailsImg} src={details}></img>
                <span className={style.detailsText}>DETALHES</span>
              </div>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                onClick={Clean}
                style={{ position: "relative", bottom: "1.9em" }}
              >
                <CancelIcon
                  style={{
                    color: "#168990",
                    cursor: "pointer",
                    margin: "0.3em 0.3em 0 0",
                    zIndex: "1001",
                  }}
                ></CancelIcon>
              </div>
            </Grid>
            <div style={{position: 'relative', bottom: '1.5em'}}>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <Savings
                        style={{
                          color: "#168990",
                        }}
                      ></Savings>
                      <span className={style.label}>Nome</span>
                    </div>
                    <span>{data.nameInvestment}</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <PaidIcon
                        style={{
                          color: "#168990",
                        }}
                      ></PaidIcon>
                      <span className={style.label}>Valor</span>
                    </div>
                    <span>{data.value}</span>
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno2}>
                    <div style={{ display: "flex" }}>
                      <DescriptionIcon
                        style={{
                          color: "#168990",
                        }}
                      ></DescriptionIcon>
                      <span className={style.label}>Descrição</span>
                    </div>
                    <span>{data.description}</span>
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <CalendarMonthIcon
                        style={{
                          color: "#168990",
                        }}
                      ></CalendarMonthIcon>
                      <span className={style.label}>Início</span>
                    </div>
                    <span>{formatDate(data.startDate)}</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <CalendarMonthIcon
                        style={{
                          color: "#168990",
                        }}
                      ></CalendarMonthIcon>
                      <span className={style.label}>Final</span>
                    </div>
                    <span>{formatDate(data.endDate)}</span>
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <CategoryIcon
                        style={{
                          color: "#168990",
                        }}
                      ></CategoryIcon>
                      <span className={style.label}>Categoria</span>
                    </div>
                    <span>{data.category}</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <OutputIcon
                        style={{
                          color: "#168990",
                        }}
                      ></OutputIcon>
                      <span className={style.label}>Entrada/Saída</span>
                    </div>
                    <span>
                      {data.isInput === null ? "" : data.isInput ? "Entrada" : "Saída"}
                    </span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      )}
    </Modal>
  );
};
