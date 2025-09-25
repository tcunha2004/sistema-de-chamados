import styled from "styled-components";

export const TodosChamadosContainer = styled.div`
  width: 100vw;
  height: 100%;
  padding: 10rem 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

export const Responsavel = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 100;
  margin-top: 0.8rem;
  color: ${(props) => props.theme.black};
  text-align: center;
`;
