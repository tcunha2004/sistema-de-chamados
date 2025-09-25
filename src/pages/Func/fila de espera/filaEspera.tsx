import { useNavigate } from "react-router-dom";
import {
  NavBar,
  NenhumChamadoText,
} from "../../../components/styled-components/common/commonComponents";
import {
  ColoredTd,
  FilaChamadosContainer,
  FilaEsperaContainer,
} from "./styles";
import { useEffect, useState } from "react";
import useFilaEspera from "../../../hooks/useFilaEspera";
import { TbLoader } from "react-icons/tb";

function FilaEspera() {
  const navigate = useNavigate();
  const { fila, getFilaEspera } = useFilaEspera();
  const [loading, setLoading] = useState(true);

  async function fetchChamados() {
    setLoading(true);
    await getFilaEspera();
    setLoading(false);
  }

  useEffect(() => {
    fetchChamados();
  }, []);

  return (
    <FilaEsperaContainer>
      <NavBar>
        <ul>
          <li onClick={() => navigate("/", { replace: true })}>
            Realizar Chamado
          </li>
          <li className="active">Fila de Espera</li>
        </ul>
      </NavBar>

      <FilaChamadosContainer>
        {loading === true ? (
          <TbLoader size={30} />
        ) : fila.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Ordem</th>
                <th>Problema</th>
                <th>Funcionário</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {fila.map((item, i) => {
                const etapa = item.Chamado?.etapa;
                const problema = item.Chamado?.problema_funcionario ?? "—";
                const nome = item.Chamado?.nome_funcionario ?? "—";
                const responsavel = item.Chamado.responsavel?.nome;

                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <ColoredTd
                      color={
                        etapa === "aberto"
                          ? "red"
                          : etapa === "atendimento"
                          ? "yellow"
                          : "green"
                      }
                    >
                      {problema}
                      <span />
                    </ColoredTd>
                    <td>{nome}</td>
                    <td>{responsavel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NenhumChamadoText>
            Nenhum chamado foi realizado até o momento.
          </NenhumChamadoText>
        )}
      </FilaChamadosContainer>
    </FilaEsperaContainer>
  );
}

export default FilaEspera;
