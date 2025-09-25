import { Button } from "../styled-components/common/commonComponents";
import { Content, Overlay, Title } from "./styles";

import { FaRegCheckCircle } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  button: string;
  reset?: () => void;
}

function Modal({ isOpen, closeModal, title, button, reset }: ModalProps) {
  if (isOpen) {
    return (
      <Overlay>
        <Content>
          <FaRegCheckCircle size={80} />
          <Title>{title}</Title>
          <Button
            onClick={() => {
              closeModal();
              if (reset) reset();
            }}
          >
            {button}
          </Button>
        </Content>
      </Overlay>
    );
  }
}

export default Modal;
