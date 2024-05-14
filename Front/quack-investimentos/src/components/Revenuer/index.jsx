import style from "./style.module.css";
import { Container } from "@mui/material";

const BudgetBar = ({ label, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className={style.barcontainer}>
      <span className={style.label}>{label}</span>
      <div className={style.bar}>
        <div className={style.barvalue} style={{ width: `${percentage}%` }} />
        <div className={style.barmax} />
      </div>
      <span className={style.values}>R$ {value.toLocaleString()} de R$ {maxValue.toLocaleString()}</span>
    </div>
  );
};

export const Revenuer = () => {
  return (
    <div className={style.container}>
      <div>
        <BudgetBar label="RECEITAS" value={4100} maxValue={7100} />
        <BudgetBar label="DESPESAS" value={4990} maxValue={5540} />
      </div>
    </div>
  );
};
