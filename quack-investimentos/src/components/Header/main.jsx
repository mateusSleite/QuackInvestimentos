import style from "./style.module.css";
import { Container } from "@mui/material";
import pato from "../../assets/Imagens/pato.png"

export const Header = () => {
  return (
    <div className={style.nav}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <img className={style.logo} src={pato}></img>
            <div className={style.titlegroup}>
                <span className={style.tittle} style={{position: 'relative', top: '0.25em'}}>Quack</span>
                <span className={style.tittle} style={{position: 'relative', bottom: '0.25em'}}>Investimentos</span>
            </div>
        </Container>
    </div>
  );
};
