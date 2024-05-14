import { Account } from "../../components/Account/main";
import { InfoInvestments } from "../../components/InfoInvestments/main";
import { Months } from "../../components/Months/main";
import { Revenuer } from "../../components/Revenuer";
import style from "./style.module.css";
import { Container, Grid, Typography } from '@mui/material';

export const Home = () => {
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Account/>
        </Grid>
        <Grid item xs={6}>
          <Revenuer/>
        </Grid>
        <Grid item xs={12}>
          <Months/>
        </Grid>
        <Grid item xs={12}>
          <InfoInvestments/>
        </Grid>
      </Grid>
    </Container>
  );
};
