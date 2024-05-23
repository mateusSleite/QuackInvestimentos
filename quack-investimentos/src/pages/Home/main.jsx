import { useState, useEffect } from "react";
import { Account } from "../../components/Account/main";
import { InfoInvestments } from "../../components/InfoInvestments/main";
import { Months } from "../../components/Months/main";
import { Revenuer } from "../../components/Revenuer";
import axios from "axios";
import { Container, Grid } from "@mui/material";

const baseURL = "https://quack-investimentos-back.vercel.app/investments";

export const Home = () => {
  const currentMonth = new Date()
    .toLocaleString('pt-BR', { month: 'short' })
    .replace('.', '')
    .charAt(0).toUpperCase() + new Date()
    .toLocaleString('pt-BR', { month: 'short' })
    .replace('.', '')
    .slice(1);
  
  const currentYear = new Date().getFullYear().toString();
  
  const [apiData, setApiData] = useState([]);
  const [attStatus, setAttStatus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [saldoEntradas, setSaldoEntradas] = useState(0);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [despesasEntradas, setDespesasEntradas] = useState(0);
  const [despesaTotal, SetDespesaTotal] = useState(0);
  const [attInt, setAttInt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("RECEBIMENTOS");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchData = async () => {
      const monthMap = {
        Jan: "01",
        Fev: "02",
        Mar: "03",
        Abr: "04",
        Mai: "05",
        Jun: "06",
        Jul: "07",
        Ago: "08",
        Set: "09",
        Out: "10",
        Nov: "11",
        Dez: "12",
      };

      const storedUserId = localStorage.getItem("userId");

      if (storedUserId) {
        try {
          const response = await axios.get(
            `${baseURL}/getall/?user=${storedUserId}`
          );
          const data = response.data;

          let newSaldoEntradas = 0;
          let newSaldoTotal = 0;
          let newDespeasEntradas = 0;
          let newDespesasTotal = 0;
          const filteredData = data.filter((item) => {
            const itemDate = new Date(item.startDate);
            const itemMonth = (itemDate.getMonth() + 1)
              .toString()
              .padStart(2, "0");
            const itemYear = itemDate.getFullYear().toString();

            const monthCondition = selectedMonth
              ? itemMonth === monthMap[selectedMonth]
              : true;

            const yearCondition = itemYear === selectedYear;

            const isValid = monthCondition && yearCondition;

            if (isValid) {
              if (item.classification !== "RECEBIMENTOS") {
                if (item.isInput) {
                  newDespeasEntradas += item.value;
                }
                newDespesasTotal += item.value;
              } else {
                if (item.isInput) {
                  newSaldoEntradas += item.value;
                }
                newSaldoTotal += item.value;
              }
            }

            return item.classification === selectedCategory && isValid;
          });

          const newData = filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));

          setApiData(newData);
          setDespesasEntradas(newDespeasEntradas);
          SetDespesaTotal(newDespesasTotal);
          setSaldoEntradas(newSaldoEntradas);
          setSaldoTotal(newSaldoTotal);
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      } else {
        console.log("UserId not found in LocalStorage");
      }
    };

    fetchData();
  }, [attStatus, selectedCategory, selectedMonth, selectedYear, attInt]);

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleRemove = () => {
    const removeRequests = selectedItems.map((id) =>
      axios.delete(`${baseURL}/delete/?id=${id}`).catch((error) => {
        console.error("Erro durante a solicitação de exclusão:", error);
      })
    );

    Promise.all(removeRequests)
      .then(() => {
        setAttStatus(!attStatus);
        setSelectedItems([]);
      })
      .catch((error) => {
        console.error("Erro ao remover itens selecionados:", error);
      });
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Account saldo={saldoEntradas} despesas={despesasEntradas} />
        </Grid>
        <Grid item xs={6}>
          <Revenuer saldoTotal={saldoTotal} saldoEntradas={saldoEntradas} despesaTotal={despesaTotal} despesasEntradas={despesasEntradas} />
        </Grid>
        <Grid item xs={12}>
          <Months
            handleMonthSelect={handleMonthSelect}
            handleYearSelect={handleYearSelect}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        </Grid>
        <Grid item xs={12}>
          <InfoInvestments
            apiData={apiData}
            handleRemove={handleRemove}
            handleCheckboxChange={handleCheckboxChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setAttInt={setAttInt}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
