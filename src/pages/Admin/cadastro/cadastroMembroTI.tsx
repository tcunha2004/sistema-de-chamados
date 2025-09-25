import { useContext, useState } from "react";
import {
  CadastroContainer,
  CadastroForm,
  CadastroTitle,
} from "../../../components/styled-components/cadastro frame/cadastroComponents";
import {
  Button,
  Input,
  InputWrapper,
} from "../../../components/styled-components/common/commonComponents";
import { SupabaseContext } from "../../../contexts/supabaseContext";
import { useForm } from "react-hook-form";
import Modal from "../../../components/modal/modal";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  imagem: FileList;
}

function CadastroMembroTI() {
  const { supabase } = useContext(SupabaseContext);
  const { register, handleSubmit } = useForm<FormData>();
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
    window.location.reload();
  };

  async function handleCadastroSubmit(dataForm: FormData) {
    let { data: MembroTI, error: getMembroError } = await supabase
      .from("MembroTI")
      .select("*")
      .eq("email", dataForm.email);

    if (getMembroError) {
      alert("Erro ao conferir membro");
      return;
    }

    if (MembroTI && MembroTI.length > 0) {
      alert("Membro já cadastrado!");
      return;
    } else {
      let publicImageUrl: string | null;
      publicImageUrl = "";

      const file = dataForm.imagem[0];
      const filePath = `${dataForm.nome}-imagem-${Date.now()}.${file.name
        .split(".")
        .pop()}`;

      let { data: uploadData, error: uploadFileError } = await supabase.storage
        .from("membros-ti-imagens")
        .upload(filePath, file);

      if (uploadFileError) {
        alert("Erro ao inserir imagem");
      } else if (uploadData?.path) {
        let { data: publicUrlData } = supabase.storage
          .from("membros-ti-imagens")
          .getPublicUrl(uploadData.path);

        publicImageUrl = publicUrlData.publicUrl;
      }

      let { error: insertMembroError } = await supabase
        .from("MembroTI")
        .insert([
          {
            nome: dataForm.nome,
            email: dataForm.email,
            senha: dataForm.senha,
            imagem: publicImageUrl,
          },
        ]);

      if (insertMembroError) {
        alert("Erro ao inserir membro");
        return;
      } else {
        localStorage.removeItem("isLoggedAdmin");
        setModal(true);
      }
    }
  }

  return (
    <CadastroContainer>
      <CadastroTitle>Realizar cadastro de membro de TI</CadastroTitle>
      <CadastroForm onSubmit={handleSubmit(handleCadastroSubmit)}>
        <InputWrapper>
          <label>Nome Completo</label>
          <Input
            {...register("nome")}
            type="text"
            placeholder="Carlos Lloyd"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>E-mail</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="exemplo@mip.com"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>Senha</label>
          <Input
            {...register("senha")}
            type="text"
            placeholder="Sua senha"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>Imagem</label>
          <Input {...register("imagem")} type="file" accept="image/*" />
        </InputWrapper>
        <Button width={30} type="submit">
          Cadastrar
        </Button>
      </CadastroForm>
      <Modal
        title="Membro cadastrado com sucesso!"
        button="Voltar"
        closeModal={closeModal}
        isOpen={modal}
      />
    </CadastroContainer>
  );
}

export default CadastroMembroTI;
