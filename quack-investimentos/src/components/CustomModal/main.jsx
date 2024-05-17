import { Modal } from "react-bootstrap";
import { Container, Grid } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import style from "./style.module.css";

export const CustomModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ position: "relative", bottom: "42em", zIndex: "1001" }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <div className={style.modal}>
          <Grid sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <div onClick={onHide}>
              <CancelIcon style={{ color: '#168990', cursor: 'pointer', margin:'0.3em 0.3em 0 0' }}></CancelIcon>
            </div>
          </Grid>
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Nome:</span>
                <textarea className={style.textArea}></textarea>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Valor:</span>
                <input type="number" className={style.inputText}></input>
              </div>
            </Grid>
           
          </Grid>
          <Grid container>
          <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Vencimento:</span>
                <input type="date" className={style.inputDate}></input>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Recebido de:</span>
                <input className={style.inputText}></input>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Categoria:</span>
                <input className={style.inputText}></input>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Pago:</span>
                <select
                  name="select"
                  className={style.select}
                  defaultValue="valor2"
                >
                  <option value="valor1">SIM</option>
                  <option value="valor2">NÃO</option>
                </select>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>Classificação:</span>
                <input className={style.inputText}></input>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={style.junLabel}>
                <span className={style.label}>3213:</span>
                <select
                  name="select"
                  className={style.select}
                  defaultValue="valor2"
                >
                  <option value="valor1">SIM</option>
                  <option value="valor2">NÃO</option>
                </select>
              </div>
            </Grid>
          </Grid>
          <Grid sx={{display: 'flex', justifyContent: 'center'}}>
            <button className={style.button}>Adicionar</button>
          </Grid>
        </div>
      </Container>
    </Modal>
  );
};
