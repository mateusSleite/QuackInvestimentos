import style from "./style.module.css";
import { Container, Grid } from "@mui/material";

export const InfoInvestments = () => {
  return (
    <Container sx={{ mt: 2 }} style={{ paddingRight: 0 }}>
      <div className={style.container}>
        <Grid item xs={12}>
          <div className={style.opcgroup}>
            <div className={style.opc}>RECEBIMENTOS</div>
            <div className={style.opc}>RECEBIMENTOS</div>
            <div className={style.opc}>RECEBIMENTOS</div>
          </div>
        </Grid>
      </div>
    </Container>
  );
};
