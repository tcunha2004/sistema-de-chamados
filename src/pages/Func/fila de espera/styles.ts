import styled from "styled-components";

export const FilaEsperaContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TdColor {
  color: "red" | "yellow" | "green";
}

export const ColoredTd = styled.td<TdColor>`
  padding: 1rem 0;
  text-align: center;
  width: 10rem;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-left: 8px;
    background: ${(props) =>
      props.color === "red"
        ? props.theme.red
        : props.color === "yellow"
        ? props.theme.yellow
        : props.color === "green"
        ? props.theme.green
        : "transparent"};
    border-radius: 50%;
  }
`;

export const FilaChamadosContainer = styled.div`
  height: 25rem;
  width: 60rem;
  box-shadow: 0 3px 7px 1px rgba(51, 51, 51, 0.2);
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  table {
    width: 90%;
    border-collapse: separate;
    table-layout: fixed;
    padding-top: 12rem;
    padding-bottom: 2rem;
  }

  thead,
  th {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
  }

  th,
  td {
    padding: 1rem 0;
    text-align: center;
    width: 10rem;
  }

  tbody {
    font-weight: 100;
  }
`;
