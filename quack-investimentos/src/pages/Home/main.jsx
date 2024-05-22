import { useState, useEffect } from "react";
import { Account } from "../../components/Account/main";
import { InfoInvestments } from "../../components/InfoInvestments/main";
import { Months } from "../../components/Months/main";
import { Revenuer } from "../../components/Revenuer";
import style from "./style.module.css";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";

const baseURL = "https://quack-investimentos-back.vercel.app/investments";

export const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [attStatus, setAttStatus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("RECEBIMENTOS");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");

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
      console.log("UserId from localStorage:", storedUserId);

      if (storedUserId) {
        try {
          const response = await axios.get(
            `${baseURL}/getall/?user=${storedUserId}`
          );
          console.log("response", response);
          const data = response.data;
          const filteredData = data.filter((item) => {
            if (item.isInput) {
              setSaldo(saldo + item.value);
            }
            const itemDate = new Date(item.createdAt);
            const itemMonth = (itemDate.getMonth() + 1)
              .toString()
              .padStart(2, "0");
            const itemYear = itemDate.getFullYear().toString();

            const monthCondition = selectedMonth
              ? itemMonth === monthMap[selectedMonth]
              : true;

            return (
              item.classification === selectedCategory &&
              monthCondition &&
              itemYear.toString() === selectedYear
            );
          });

          const newData = filteredData.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          setApiData(newData);
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      } else {
        console.log("UserId not found in LocalStorage");
      }
    };

    fetchData();
  }, [attStatus, selectedCategory, selectedMonth, selectedYear]);

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
      {console.log(saldo)}
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Account />
        </Grid>
        <Grid item xs={6}>
          <Revenuer />
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
          />
        </Grid>
      </Grid>
    </Container>
  );
};
