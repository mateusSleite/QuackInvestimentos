import style from "./style.module.css";
import { Container } from "@mui/material";

export const Account = () => {
  return (
    <Container>
        <div className={style.container}>
            <h1 className={style.account}>R$ 9052,52</h1>
            <span>Saldo Atual</span>
        </div>
    </Container>
  );
};
