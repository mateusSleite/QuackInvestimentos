import { Modal } from "react-bootstrap";
import { Container, Grid } from "@mui/material";
import style from "./style.module.css";

export const CustomModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ position: "relative", bottom: "48em", padding: "0" }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <div className={style.modal}>
          <div style={{width: '100%'}}>
            <div className={style.junLabel}>
              <span>Descrição</span>
              <input></input>
            </div>
            <div className={style.junLabel}>
              <span>Descrição</span>
              <input></input>
            </div>
          </div>
        </div>
      </Container>
    </Modal>
  );
};
