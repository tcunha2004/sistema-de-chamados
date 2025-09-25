import styled from "styled-components";

export const CadastroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

export const CadastroTitle = styled.h1`
  width: 25%;
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
`;

export const CadastroForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const CadastroFormChamado = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 40vw;
`;
