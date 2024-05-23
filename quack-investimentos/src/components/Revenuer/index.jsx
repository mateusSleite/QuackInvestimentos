import style from "./style.module.css";
import { Container } from "@mui/material";

const BudgetBar = ({ label, value, maxValue }) => {
  const percentage = maxValue === 0 ? 0 : (value / maxValue) * 100;
  return (
    <div className={style.barcontainer}>
      <span className={style.label}>{label}</span>
      <div className={style.bar}>
        <div className={style.barvalue} style={{ width: `${percentage}%` }} />
      </div>
      <span className={style.values}>R$ {value.toLocaleString()} de R$ {maxValue.toLocaleString()}</span>
    </div>
  );
};

export const Revenuer = ({ saldoEntradas, saldoTotal, despesasEntradas, despesaTotal }) => {
  return (
    <div className={style.container}>
      <div>
        <BudgetBar label="RECEITAS" value={saldoEntradas} maxValue={saldoTotal} />
        <BudgetBar label="DESPESAS" value={despesasEntradas} maxValue={despesaTotal} />
      </div>
    </div>
  );
};
