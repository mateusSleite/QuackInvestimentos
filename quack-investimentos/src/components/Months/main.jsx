import { useState } from "react";
import { Container, Grid } from "@mui/material";
import style from "./style.module.css";

export const Months = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [apiData, setApiData] = useState([]);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  return (
    <Container sx={{ mt: 2, display: 'flex'}} style={{paddingRight: 0}}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <select name="select" className={style.select} defaultValue="valor3">
            <option value="valor1">2022</option>
            <option value="valor2">2023</option>
            <option value="valor3">2024</option>
          </select>
        </Grid>
        <Grid item xs={11}>
          <div className={style.months}>
            {months.map((month, index) => (
              <div key={index} className={`${style.month} ${
                selectedMonth === month ? style.monthhover : ''}`} onClick={() => handleMonthSelect(month)}>
                {month}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
