import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 40rem;
  font-weight: 100;
  margin-top: 3rem;
`;
