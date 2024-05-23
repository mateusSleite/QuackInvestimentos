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

export const DescriptionModal = ({ show, onHide, id, attHome }) => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);

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
    setData(null);
    setEdit(false);
    onHide();
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://quack-investimentos-back.vercel.app/investments/update/?id=${id}`, data);
      setEdit(false);
      attHome();
      onHide();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dia = ("0" + date.getDate()).slice(-2);
    const mes = ("0" + (date.getMonth() + 1)).slice(-2);
    const ano = date.getFullYear();
    return `${ano}-${mes}-${dia}`;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ bottom: "45em", position: "relative", zIndex: "1001" }}
    >
      {data && (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <div className={style.modal}>
            <Grid>
              <div className={style.details}>
                <img className={style.detailsImg} src={details} alt="Detalhes"></img>
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
            <div style={{ position: "relative", bottom: "1.5em" }}>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <div className={style.contorno2}>
                    <div style={{ display: "flex" }}>
                      <Savings
                        style={{
                          color: "#168990",
                        }}
                      ></Savings>
                      <span className={style.label}>Nome</span>
                    </div>
                    {edit ? (
                      <input
                        type="text"
                        name="nameInvestment"
                        value={data.nameInvestment}
                        onChange={handleChange}
                        className={style.transparentInput}
                      />
                    ) : (
                      <span className={style.displayValue}>{data.nameInvestment}</span>
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: 'flex-end' }}
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
                    {edit ? (
                      <input
                        type="text"
                        name="value"
                        value={data.value}
                        onChange={handleChange}
                        className={style.transparentInput}
                      />
                    ) : (
                      <span className={style.displayValue}>{data.value}</span>
                    )}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: 'flex-start' }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <CalendarMonthIcon
                        style={{
                          color: "#168990",
                        }}
                      ></CalendarMonthIcon>
                      <span className={style.label}>Data</span>
                    </div>
                    {edit ? (
                      <input
                        type="date"
                        name="startDate"
                        value={formatDate(data.startDate)}
                        onChange={handleChange}
                        className={style.transparentInput}
                        style={{fontSize: '1.2em'}}
                      />
                    ) : (
                      <span className={style.displayValue}>{formatDate(data.startDate)}</span>
                    )}
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
                    {edit ? (
                      <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className={style.transparentInput}
                        style={{ resize: 'none' }}
                      />
                    ) : (
                      <span className={style.displayValue}>{data.description}</span>
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: 'flex-end' }}
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
                    {edit ? (
                      <input
                        type="text"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        className={style.transparentInput}
                      />
                    ) : (
                      <span className={style.displayValue}>{data.category}</span>
                    )}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{ display: "flex", justifyContent: 'flex-start' }}
                >
                  <div className={style.contorno}>
                    <div style={{ display: "flex" }}>
                      <OutputIcon
                        style={{
                          color: "#168990",
                        }}
                      ></OutputIcon>
                      <span className={style.label}>Pago</span>
                    </div>
                    {edit ? (
                      <select
                        name="isInput"
                        value={data.isInput}
                        onChange={handleChange}
                        className={style.transparentInput}
                      >
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </select>
                    ) : (
                      <span className={style.displayValue}>
                        {data.isInput === null ? "" : data.isInput ? "Sim" : "Não"}
                      </span>
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                {edit ? (
                  <button className={style.button} onClick={handleSave}>
                    Salvar
                  </button>
                ) : (
                  <button className={style.button} onClick={handleEdit}>
                    Editar
                  </button>
                )}
              </Grid>
            </div>
          </div>
        </Container>
      )}
    </Modal>
  );
};
