import { Modal } from "react-bootstrap";
import style from "./style.module.css";
import { Container, Grid } from "@mui/material";
import pato from "../../assets/Imagens/pato.png";

export const DescriptionModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
        <Container>
          <div className={style.modal}>
            
          </div>
        </Container>
    </Modal>
  );
};
