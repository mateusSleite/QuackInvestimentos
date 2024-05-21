import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import style from "./style.module.css";
import { Container, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export const DescriptionModal = ({ show, onHide, id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://quack-investimentos-back.vercel.app/investments/getid/?id=${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show, id]);

  const Clean = () => {
    setData('')
    onHide()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dia = ("0" + date.getDate()).slice(-2);
    const mes = ("0" + (date.getMonth() + 1)).slice(-2);
    const ano = date.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ bottom: "42em", position: "relative", zIndex: "1001" }}
    >
      {data && (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <div className={style.modal}>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <div onClick={Clean}>
                <CancelIcon
                  style={{
                    color: "#168990",
                    cursor: "pointer",
                    margin: "0.3em 0.3em 0 0",
                  }}
                ></CancelIcon>
              </div>
            </Grid>
            
            
          </div>
        </Container>
      )}
    </Modal>
  );
};
