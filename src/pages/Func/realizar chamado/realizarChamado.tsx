import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputWrapper,
  NavBar,
  TextArea,
  SelectContato, // Importa o novo styled component
} from "../../../components/styled-components/common/commonComponents";
import {
  CadastroContainer,
  CadastroFormChamado,
  CadastroTitle,
} from "../../../components/styled-components/cadastro frame/cadastroComponents";
import { useContext, useState } from "react";
import { SupabaseContext } from "../../../contexts/supabaseContext";
import { useForm } from "react-hook-form";
import Modal from "../../../components/modal/modal";
import { api } from "../../../lib/axiosSendEmail";

interface FormData {
  nome: string;
  email: string;
  departamento: string;
  problema: string;
  descricao: string;
  contato: string; // Adicionado campo para contato
}

function RealizarChamado() {
  const { supabase } = useContext(SupabaseContext);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  async function sendEmail(
    title: string,
    nomeFunc: string,
    depFunc: string,
    problemaFunc: string,
    desc: string,
    contato: string
  ) {
    const response = await api.post("crie-seu-proxy-e-envie-a-requisicao", {
      title,
      nomeFunc,
      depFunc,
      problemaFunc,
      desc,
      contato,
    });

    return response.data;
  }

  async function handleChamadoSubmit(dataForm: FormData) {
    sendEmail(
      "Novo Chamado",
      dataForm.nome,
      dataForm.departamento,
      dataForm.problema,
      dataForm.descricao,
      dataForm.contato
    ).then((resp) => {
      console.log(resp);
    });

    let { data: CreateChamadoData, error: CreateChamadoError } = await supabase
      .from("Chamado")
      .insert([
        {
          nome_funcionario: dataForm.nome,
          email_funcionario: dataForm.email,
          dep_funcionario: dataForm.departamento,
          problema_funcionario: dataForm.problema,
          desc_problema_funcionario: dataForm.descricao,
          etapa: "aberto",
          data_criacao: new Date().toISOString(),
        },
      ])
      .select();

    if (CreateChamadoError) {
      alert("Erro ao criar chamado!");
    }

    if (CreateChamadoData) {
      let { error: AddFilaError } = await supabase.from("Fila").insert([
        {
          data_entrada: CreateChamadoData[0].data_criacao,
          chamado_id: CreateChamadoData[0].chamado_id,
        },
      ]);

      if (AddFilaError) {
        alert("Erro ao adicionar chamado na fila!");
      } else {
        setModal(true);
      }
    }
  }

  return (
    <CadastroContainer>
      <NavBar>
        <ul>
          <li className="active">Realizar Chamado</li>
          <li
            onClick={() => {
              navigate("fila-espera", { replace: true });
            }}
          >
            Fila de Espera
          </li>
        </ul>
      </NavBar>
      <CadastroTitle>Realizar Chamado</CadastroTitle>
      <CadastroFormChamado onSubmit={handleSubmit(handleChamadoSubmit)}>
        <InputWrapper>
          <label>Nome</label>
          <Input
            {...register("nome")}
            type="text"
            placeholder="Carlos Lloyd"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="exemplo@mip.com"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>Departamento</label>
          <Input
            {...register("departamento")}
            type="text"
            placeholder="Contabilidade"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>Problema</label>
          <Input
            {...register("problema")}
            type="text"
            placeholder="Falha na impressora"
            required
          />
        </InputWrapper>
        <InputWrapper style={{ gridColumn: "1/2" }}>
          <label>Descrição</label>
          <TextArea
            {...register("descricao")}
            placeholder="Não estou conseguindo imprimir contrato do empreendimento X. A impressora não responde aos meus comandos."
            rows={3}
            required
          />
        </InputWrapper>
        <InputWrapper style={{ gridColumn: "2/3", alignSelf: "end" }}>
          <label>Como gostaria de ser contatado?</label>
          <SelectContato {...register("contato")} required>
            <option value="">Selecione uma opção</option>
            <option value="Teams">Teams</option>
            <option value="E-mail">E-mail</option>
            <option value="Telefone">Telefone</option>
            <option value="Pessoalmente">Pessoalmente</option>
          </SelectContato>
        </InputWrapper>
        <Button style={{ gridColumn: "1/-1" }} type="submit">
          Enviar
        </Button>
      </CadastroFormChamado>
      <Modal
        title="Chamado realizado com sucesso!"
        button="Voltar"
        isOpen={modal}
        closeModal={closeModal}
        reset={reset}
      />
    </CadastroContainer>
  );
}

export default RealizarChamado;
