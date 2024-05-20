import { Modal } from "react-bootstrap";
import { Container, Grid } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import style from "./style.module.css";
import { useState } from "react";
import axios from "axios";

export const CustomModal = ({ show, onHide }) => {
  const [nameInvestment, setnameInvestment] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [classification, setClassification] = useState("");
  const [isInput, setIsInput] = useState(null);
  const [userId, setUserId] = useState("dsad");

  const handleCreate = async (event) => {
    event.preventDefault();
    const json = {
      userId,
      nameInvestment,
      description,
      value,
      startDate,
      endDate,
      category,
      classification,
      isInput
    };

    try {
      console.log("JSON enviado:", json);
      await axios.post("https://quack-investimentos-back.vercel.app/investments/create", json)
      onHide();
      
    } catch (error) {
      console.log("Erro ao criar investimento:", error);
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ position: "relative", bottom: "45em", zIndex: "1001" }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <div className={style.modal}>
          <form onSubmit={handleCreate}>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div onClick={onHide}>
                <CancelIcon style={{ color: '#168990', cursor: 'pointer', margin: '0.3em 0.3em 0 0' }}></CancelIcon>
              </div>
            </Grid>
            <Grid container sx={{ mt: 3 }}>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Nome:</span>
                  <input
                    className={style.inputText}
                    onChange={(e) => setnameInvestment(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Valor:</span>
                  <input
                    type="number"
                    className={style.inputText}
                    onChange={(e) => setValue(parseFloat(e.target.value))} />
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Data Início:</span>
                  <input
                    type="date"
                    className={style.inputDate}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      setStartDate(dateValue ? new Date(dateValue) : null);
                    }} />

                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Data Final:</span>
                  <input
                    type="date"
                    className={style.inputDate}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      setEndDate(dateValue !== "" ? new Date(dateValue) : "");
                    }} />

                </div>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Categoria:</span>
                  <input
                    className={style.inputText}
                    onChange={(e) => setCategory(e.target.value)} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Entrada:</span>
                  <select
                    name="select"
                    className={style.select}
                    defaultValue=""
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setIsInput(
                        selectedValue === "valor1" ? true : 
                        false
                      );
                    }}>
                    <option value="">Selecione...</option>
                    <option value="valor1">Sim</option>
                    <option value="valor2">Não</option>
                  </select>
                </div>
              </Grid>

            </Grid>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Classificação:</span>
                  <select
                    name="select"
                    className={style.select}
                    defaultValue="fixo"
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setClassification(selectedValue === "RECEBIMENTOS" || selectedValue === "DESPESAS FIXAS" || selectedValue === "DESPESAS VARIAVEIS" ? selectedValue : null);
                    }}>
                    <option value="">Selecione...</option>
                    <option value="RECEBIMENTOS">Recebimentos</option>
                    <option value="DESPESAS FIXAS">Renda Fixa</option>
                    <option value="DESPESAS VARIAVEIS">Renda Variável</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={style.junLabel}>
                  <span className={style.label}>Descrição:</span>
                  <textarea
                    className={style.textArea}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
              </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <button className={style.button} type="submit">Adicionar</button>
            </Grid>
          </form>
        </div>
      </Container>
    </Modal>
  );
};
