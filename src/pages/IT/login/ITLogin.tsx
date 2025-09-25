import { useContext } from "react";
import {
  Button,
  Input,
  InputWrapper,
} from "../../../components/styled-components/common/commonComponents";
import {
  LoginContainer,
  LoginForm,
  LoginTitle,
} from "../../../components/styled-components/login frame/loginComponents";
import { SupabaseContext } from "../../../contexts/supabaseContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  senha: string;
}

function ITLogin() {
  const { supabase } = useContext(SupabaseContext);
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  async function handleLoginSubmit(dataForm: FormData) {
    let { data: MembroTI, error } = await supabase
      .from("MembroTI")
      .select("*")
      .eq("email", dataForm.email)
      .eq("senha", dataForm.senha);

    if (error) {
      alert("Erro!");
    }

    if (MembroTI && MembroTI.length < 1) {
      alert("Não existe usuário com essas credenciais!");
    } else {
      localStorage.setItem("isLoggedMembroTI", "true");
      localStorage.setItem("emailUsuarioAtivoTI", `${dataForm.email}`);
      navigate("/ti/meus-chamados", { replace: true });
    }
  }

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <LoginForm onSubmit={handleSubmit(handleLoginSubmit)}>
        <InputWrapper>
          <label>E-mail</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="exemplo@mip.com"
            required
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <label>Senha</label>
          <Input
            {...register("senha")}
            type="password"
            placeholder="******"
            required
          ></Input>
        </InputWrapper>
        <Button type="submit">Enviar</Button>
      </LoginForm>
    </LoginContainer>
  );
}

export default ITLogin;
