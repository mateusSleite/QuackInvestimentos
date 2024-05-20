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
  const [attStatus, SetAttStatus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/getall`);
        const data = response.data;

        const newData = data.map((item, index) => {
          return { ...item, index: index + 1 };
        });

        setApiData(newData);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
    fetchData();
  }, [attStatus]);

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
      
    console.log(removeRequests)


    Promise.all(removeRequests)
      .then(() => {
        SetAttStatus(!attStatus);
        setSelectedItems([]);
      })
      .catch((error) => {
        console.error("Erro ao remover itens selecionados:", error);
      });
  };

  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Account />
        </Grid>
        <Grid item xs={6}>
          <Revenuer />
        </Grid>
        <Grid item xs={12}>
          <Months />
        </Grid>
        <Grid item xs={12}>
          <InfoInvestments 
            apiData={apiData} 
            attStatus={attStatus} 
            setAttStatus={SetAttStatus} 
            handleRemove={handleRemove} 
            handleCheckboxChange={handleCheckboxChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
