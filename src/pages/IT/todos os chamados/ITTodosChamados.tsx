import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../../../contexts/supabaseContext";
import {
  Avatar,
  AvatarAndLogout,
  ChamadoCard,
  ChamadoRemetente,
  ChamadosContainer,
  ChamadoText,
  ChamadoTitle,
  LogoutButton,
  NavBar,
  NenhumChamadoText,
} from "../../../components/styled-components/common/commonComponents";
import { Responsavel, TodosChamadosContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { TbLoader } from "react-icons/tb";

interface ChamadoEResponsavel {
  chamado_id: number;
  nome_funcionario: string;
  problema_funcionario: string;
  etapa: "aberto" | "atendimento" | "concluido";
  membroTI_id: number | null;
  desc_problema_funcionario?: string;
  responsavel?: { nome: string };
}

function ITTodosChamados() {
  const { supabase } = useContext(SupabaseContext);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showLogoutButton, setshowLogoutButton] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [todosChamados, setTodosChamados] = useState<ChamadoEResponsavel[]>([]);

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

  async function getTodosChamados() {
    let { data, error } = await supabase
      .from("Chamado")
      .select(
        `
      *, responsavel:membroTI_id ( nome )
      `
      )
      .order("data_criacao", { ascending: false });

    if (error) alert("Erro ao requisitar chamados!");
    else {
      return data;
    }
  }

  async function fetchChamados() {
    setLoading(true);
    await getTodosChamados().then((chamados) => {
      setTodosChamados(chamados || []);
    });
    setLoading(false);
  }

  useEffect(() => {
    // url => o que a funcao retorna
    getImageUrl().then((url) => {
      setImageUrl(url);
    });

    fetchChamados();
  }, []);

  return (
    <TodosChamadosContainer>
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
          <li
            onClick={() => {
              navigate("/ti/meus-chamados", { replace: true });
            }}
          >
            Meus Chamados
          </li>
          <li className="active">Todos os Chamados</li>
        </ul>
      </NavBar>

      <ChamadosContainer width={20} flexDirection="column">
        {loading === true ? (
          <TbLoader size={30} />
        ) : todosChamados.filter((chamado) => chamado.etapa == "aberto")
            .length > 0 ? (
          todosChamados
            .filter((chamado) => chamado.etapa == "aberto")
            .map((chamado) => {
              const id = chamado.chamado_id;
              const problema = chamado.problema_funcionario ?? "—";
              const nome = chamado.nome_funcionario ?? "—";
              const desc = chamado.desc_problema_funcionario ?? "—";

              return (
                <ChamadoCard key={id}>
                  <ChamadoTitle color="red">
                    {problema} <span></span>
                  </ChamadoTitle>
                  <ChamadoText>{desc}</ChamadoText>
                  <ChamadoRemetente>Por: {nome}</ChamadoRemetente>
                </ChamadoCard>
              );
            })
        ) : (
          <NenhumChamadoText>
            Não há nenhum chamado aberto no momento.
          </NenhumChamadoText>
        )}
      </ChamadosContainer>

      <ChamadosContainer width={20} flexDirection="column">
        {loading === true ? (
          <TbLoader size={30} />
        ) : todosChamados.filter((chamado) => chamado.etapa == "atendimento")
            .length > 0 ? (
          todosChamados
            .filter((chamado) => chamado.etapa == "atendimento")
            .map((chamado) => {
              const id = chamado.chamado_id;
              const problema = chamado.problema_funcionario ?? "—";
              const desc = chamado.desc_problema_funcionario ?? "—";
              const responsavel = chamado.responsavel;

              return (
                <ChamadoCard key={id}>
                  <ChamadoTitle color="yellow">
                    {problema} <span></span>
                  </ChamadoTitle>
                  <ChamadoText>{desc}</ChamadoText>
                  <Responsavel>Atribuído: {responsavel?.nome}</Responsavel>
                </ChamadoCard>
              );
            })
        ) : (
          <NenhumChamadoText>
            Não há nenhum chamado aberto no momento.
          </NenhumChamadoText>
        )}
      </ChamadosContainer>

      <ChamadosContainer width={20} flexDirection="column">
        {loading === true ? (
          <TbLoader size={30} />
        ) : todosChamados.filter((chamado) => chamado.etapa == "concluido")
            .length > 0 ? (
          todosChamados
            .filter((chamado) => chamado.etapa == "concluido")
            .map((chamado) => {
              const id = chamado.chamado_id;
              const problema = chamado.problema_funcionario ?? "—";
              const desc = chamado.desc_problema_funcionario ?? "—";
              const responsavel = chamado.responsavel;

              return (
                <ChamadoCard key={id}>
                  <ChamadoTitle color="green">
                    {problema} <span></span>
                  </ChamadoTitle>
                  <ChamadoText>{desc}</ChamadoText>
                  <Responsavel>Concluido por: {responsavel?.nome}</Responsavel>
                </ChamadoCard>
              );
            })
        ) : (
          <NenhumChamadoText>
            Não há nenhum chamado aberto no momento.
          </NenhumChamadoText>
        )}
      </ChamadosContainer>
    </TodosChamadosContainer>
  );
}

export default ITTodosChamados;
