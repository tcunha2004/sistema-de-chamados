import styled from "styled-components";

interface ButtonProps {
  width?: number;
  backgroundColor?: "black" | "green";
  padding?: number;
  fontSize?: number;
  marginTop?: number;
}

export const Button = styled.button<ButtonProps>`
  width: ${(props) => (props.width ? `${props.width}rem` : "100%")};
  background: ${(props) =>
    props.backgroundColor == "green" ? props.theme.green : props.theme.black};
  color: ${(props) => props.theme.white};
  padding: ${(props) => (props.padding ? `${props.padding}rem` : "1rem")};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.black};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : "1.1rem")};
  cursor: pointer;
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}rem` : "")};

  &:hover {
    background: ${(props) => props.theme.white};
    color: ${(props) => props.theme.black};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-size: 1.25rem;
  }
`;

export const Input = styled.input`
  padding: 0.65rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["gray"]};
  color: ${(props) => props.theme["dark-gray"]};

  &::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.65rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["gray"]};
  color: ${(props) => props.theme["dark-gray"]};
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;

export const SelectContato = styled.select`
  padding: 0.65rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme["gray"]};
  color: ${(props) => props.theme["dark-gray"]};
  background: ${(props) => props.theme.white};
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;

export const AvatarAndLogout = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  height: auto;
  width: 6rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Avatar = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
`;

export const LogoutButton = styled.button`
  background: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
  width: 80%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.black};
  font-size: 0.75rem;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.white};
    color: ${(props) => props.theme.black};
  }
`;

export const NavBar = styled.nav`
  position: absolute;
  top: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;

  & ul {
    display: flex;
    flex-direction: row;
    gap: 5px;
    list-style: none;
    background: ${(props) => props.theme["light-gray"]};
    padding: 0.3rem;
    border-radius: 30px;

    & li {
      padding: 0.3rem 0.6rem;
      border-radius: 30px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 100;
    }

    & li.active {
      background: ${(props) => props.theme.white};
    }

    & li:hover {
      background: ${(props) => props.theme.white};
      opacity: 0.8;
    }
  }
`;

interface ChamadosContainerProps {
  flexDirection?: "column";
  width?: number;
}

export const ChamadosContainer = styled.div<ChamadosContainerProps>`
  background: ${(props) => props.theme["light-gray"]};
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  gap: 2rem;
  flex-direction: ${(props) =>
    props.flexDirection === "column" ? "column" : "row"};
  width: ${(props) => (props.width ? `${props.width}rem` : "100%")};
  overflow: auto;
  flex-wrap: nowrap;
`;

interface ChamadoCardProps {
  width?: number;
}

export const ChamadoCard = styled.div<ChamadoCardProps>`
  background: ${(props) => props.theme.white};
  border-radius: 20px;
  padding: 1rem;
  width: ${(props) => (props.width ? `${props.width}rem` : `18rem`)};
  max-height: 15rem;
  height: fit-content;
  flex-shrink: 0;
`;

interface ChamadoTitleColorProps {
  color: "red" | "yellow" | "green";
}

export const ChamadoTitle = styled.h1<ChamadoTitleColorProps>`
  font-size: 1rem;
  font-weight: 500;

  & span {
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

export const ChamadoText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 100;
  margin-top: 0.5rem;
  color: ${(props) => props.theme.black};
  width: 100%;
  overflow: hidden;
`;

export const ChamadoRemetente = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 100;
  margin-top: 0.8rem;
  color: ${(props) => props.theme.black};
  text-align: end;
`;

export const NenhumChamadoText = styled.h2`
  font-weight: 100;
  font-size: 1rem;
  opacity: 0.8;
`;
