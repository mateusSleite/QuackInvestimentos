import style from "./style.module.css";
import { Container } from "@mui/material";

export const Account = ({saldo, despesas}) => {
  return (
    <Container>
        <div className={style.container}>
            <h1 className={style.account}>R$ {parseFloat(saldo - despesas)},00</h1>
            <span>Saldo Atual</span>
        </div>
    </Container>
  );
};
