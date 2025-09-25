import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarAndLogout,
  Button,
  ChamadoCard,
  ChamadoRemetente,
  ChamadosContainer,
  ChamadoText,
  ChamadoTitle,
  LogoutButton,
  NavBar,
  NenhumChamadoText,
} from "../../../components/styled-components/common/commonComponents";
import { SupabaseContext } from "../../../contexts/supabaseContext";
import {
  EtapaChamadoContainer,
  EtapaTitle,
  MeusChamadosContainer,
  ToDoButtonsContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";
import useFilaEspera from "../../../hooks/useFilaEspera";
import { TbLoader } from "react-icons/tb";
import useDefineChamadoToMembroTI from "../../../hooks/useDefineChamadoToMembroTI";
import useConcluiChamado from "../../../hooks/useConcluiChamado";
import useRepassaChamado from "../../../hooks/useRepassaChamado";
import { api } from "../../../lib/axiosSendEmail";

interface Chamado {
  chamado_id: number;
  nome_funcionario: string;
  problema_funcionario: string;
  etapa: "aberto" | "atendimento" | "concluido";
  membroTI_id: number | null;
  desc_problema_funcionario?: string;
}

interface ItemFilaChamados {
  data_entrada: string;
  data_saida: string | null;
  repassado: boolean;
  Chamado: Chamado;
}

function ITMeusChamados() {
  const { supabase } = useContext(SupabaseContext);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showLogoutButton, setshowLogoutButton] = useState(false);
  const navigate = useNavigate();

  const { fila, getFilaEspera } = useFilaEspera();
  const [loading, setLoading] = useState(true);

  const [chamadoAtual, setChamadoAtual] = useState<Chamado>();

  async function getImageUrl() {
    const email = localStorage.getItem("emailUsuarioAtivoTI")?.trim() || "";

    let { data: Imagem, error } = await supabase
      .from("MembroTI")
      .select("imagem")
      .eq("email", email)
      .single();

    if (error) {
      alert("Erro ao pegar imagem de perfil");
    }

    return Imagem?.imagem ?? null;
  }

  async function getChamadoAtual() {
    const { data: ChamadoAtualMembroTI, error: MembroTISearch } = await supabase
      .from("MembroTI")
      .select(
        `
          Chamado: chamado_atual (
            chamado_id,
            nome_funcionario,
            problema_funcionario,
            desc_problema_funcionario,
            etapa,
            membroTI_id
          )
        `
      )
      .eq("email", localStorage.getItem("emailUsuarioAtivoTI"))
      .single();

    if (MembroTISearch) alert("Erro ao buscar Membro de TI!");
    else if (ChamadoAtualMembroTI) {
      setChamadoAtual(
        Array.isArray(ChamadoAtualMembroTI.Chamado)
          ? ChamadoAtualMembroTI.Chamado[0]
          : ChamadoAtualMembroTI.Chamado
      );
    }
  }

  async function fetchChamados() {
    setLoading(true);
    await getFilaEspera();
    await getChamadoAtual();
    setLoading(false);
  }

  useEffect(() => {
    // url => o que a funcao retorna
    getImageUrl().then((url) => {
      setImageUrl(url);
    });

    fetchChamados();
  }, []);

  const associateChamadoToMembro = useDefineChamadoToMembroTI();

  function handleAtribuirChamadoMembro(itemFilaChamado: ItemFilaChamados) {
    if (chamadoAtual == null) {
      associateChamadoToMembro(itemFilaChamado)
        .then((response) => {
          if (response === null) {
            alert("Membro já possui chamado associado!");
          } else {
            alert("Chamado atribuído com sucesso!");
          }
        })
        .then(() => {
          fetchChamados();
        });
    } else {
      alert("Já existe um chamado atribuído a este membro");
    }
  }

  const concluiChamado = useConcluiChamado();

  function handleConcluirChamado() {
    concluiChamado().then(() => fetchChamados());
  }

  async function sendEmail(
    title: string,
    nomeFunc: string,
    depFunc: string,
    problemaFunc: string,
    desc: string
  ) {
    const response = await api.post("crie-seu-proxy-e-envie-a-requisicao", {
      title,
      nomeFunc,
      depFunc,
      problemaFunc,
      desc,
    });

    return response.data;
  }

  const repassaChamado = useRepassaChamado();

  function handleRepassarChamado() {
    repassaChamado()
      .then((response) =>
        sendEmail(
          "Chamado Repassado",
          response && response[0].nome_funcionario,
          response && response[0].dep_funcionario,
          response && response[0].problema_funcionario,
          response && response[0].desc_problema_funcionario
        )
      )
      .then((response) => {
        console.log(response);
        fetchChamados();
      });
  }

  return (
    <MeusChamadosContainer>
      <AvatarAndLogout
        onMouseEnter={() => setshowLogoutButton(true)}
        onMouseLeave={() => setshowLogoutButton(false)}
      >
        <Avatar src={imageUrl ?? undefined} />
        {showLogoutButton && (
          <LogoutButton
            onClick={() => {
              localStorage.removeItem("isLoggedMembroTI");
              localStorage.removeItem("emailUsuarioAtivoTI");
              window.location.reload();
            }}
          >
            Logout
          </LogoutButton>
        )}
      </AvatarAndLogout>

      <NavBar>
        <ul>
          <li className="active">Meus Chamados</li>
          <li
            onClick={() => {
              navigate("/ti/todos-chamados", { replace: true });
            }}
          >
            Todos os Chamados
          </li>
        </ul>
      </NavBar>

      <EtapaChamadoContainer>
        <EtapaTitle>Em Aberto</EtapaTitle>
        <ChamadosContainer>
          {loading === true ? (
            <TbLoader size={30} />
          ) : fila.length > 0 ? (
            fila
              .filter((item) => item.Chamado.etapa == "aberto")
              .map((item) => {
                const id = item.Chamado.chamado_id;
                const problema = item.Chamado?.problema_funcionario ?? "—";
                const nome = item.Chamado?.nome_funcionario ?? "—";
                const desc = item.Chamado?.desc_problema_funcionario ?? "—";

                return (
                  <ChamadoCard key={id}>
                    <ChamadoTitle color="red">
                      {problema} <span></span>
                    </ChamadoTitle>
                    <ChamadoText>{desc}</ChamadoText>
                    <ChamadoRemetente>Por: {nome}</ChamadoRemetente>
                    <Button
                      onClick={() => handleAtribuirChamadoMembro(item)}
                      padding={0.4}
                      fontSize={0.8}
                      marginTop={2}
                    >
                      Atribuir
                    </Button>
                  </ChamadoCard>
                );
              })
          ) : (
            <NenhumChamadoText>
              Não há nenhum chamado aberto no momento.
            </NenhumChamadoText>
          )}
        </ChamadosContainer>
      </EtapaChamadoContainer>

      <EtapaChamadoContainer>
        <EtapaTitle>Chamado Atual</EtapaTitle>
        <ChamadosContainer width={38}>
          {loading === true ? (
            <TbLoader size={30} />
          ) : chamadoAtual != null ? (
            <>
              <ChamadoCard>
                <ChamadoTitle color="yellow">
                  {chamadoAtual.problema_funcionario} <span></span>
                </ChamadoTitle>
                <ChamadoText>
                  {chamadoAtual.desc_problema_funcionario}
                </ChamadoText>
                <ChamadoRemetente>
                  Por: {chamadoAtual.nome_funcionario}
                </ChamadoRemetente>
              </ChamadoCard>
              <ToDoButtonsContainer>
                <Button
                  width={15}
                  backgroundColor="green"
                  padding={0.5}
                  fontSize={1}
                  onClick={() => handleConcluirChamado()}
                >
                  Concluir
                </Button>
                <Button
                  width={15}
                  padding={0.5}
                  fontSize={1}
                  onClick={() => handleRepassarChamado()}
                >
                  Repassar
                </Button>
              </ToDoButtonsContainer>
            </>
          ) : (
            <NenhumChamadoText>
              Não há nenhum chamado atribuído a este membro no momento no
              momento.
            </NenhumChamadoText>
          )}
        </ChamadosContainer>
      </EtapaChamadoContainer>
    </MeusChamadosContainer>
  );
}

export default ITMeusChamados;
