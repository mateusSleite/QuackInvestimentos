import { Account } from "../../components/Account/main";
import { Revenuer } from "../../components/Revenuer";
import style from "./style.module.css";
import { Container, Row, Col } from "@mui/material";

export const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Account />
        </Col>
      </Row>
      <Col>
        <Revenuer />
      </Col>
    </Container>
  );
};
