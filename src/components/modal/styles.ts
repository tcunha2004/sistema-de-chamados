import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Content = styled.div`
  background: ${(props) => props.theme.white};
  padding: 5rem;
  border-radius: 20px;
  width: 30rem;
  height: 25rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  font-weight: 100;
  font-size: 1.2rem;
  margin: 2rem 0 1rem;
`;
