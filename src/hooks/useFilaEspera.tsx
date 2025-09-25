import { useContext, useState } from "react";
import { SupabaseContext } from "../contexts/supabaseContext";

interface Chamado {
  chamado_id: number;
  nome_funcionario: string;
  problema_funcionario: string;
  etapa: "aberto" | "atendimento" | "concluido";
  membroTI_id: number | null;
  desc_problema_funcionario?: string;
  responsavel?: { nome: string } | null;
}

interface ItemFilaChamados {
  data_entrada: string;
  data_saida: string | null;
  repassado: boolean;
  Chamado: Chamado;
}

function useFilaEspera() {
  const { supabase } = useContext(SupabaseContext);
  const [fila, setFila] = useState<ItemFilaChamados[]>([]);

  async function getFilaEspera() {
    const { data: Fila, error } = await supabase
      .from("Fila")
      .select(
        `
        data_entrada,
        data_saida,
        repassado,
        Chamado:chamado_id (
          chamado_id,
          nome_funcionario,
          problema_funcionario,
          etapa,
          membroTI_id,
          desc_problema_funcionario,
          responsavel:membroTI_id (
            nome
          )
        )
      `
      )
      .order("data_entrada", { ascending: true });

    if (error) {
      alert("Erro ao requisitar chamados");
      return [];
    }

    if (Fila) {
      const novaFila = Fila.map((row: any) => {
        const chamado = Array.isArray(row.Chamado)
          ? row.Chamado?.[0]
          : row.Chamado;
        if (!chamado) return null; // descarta linhas sem chamado
        return {
          data_entrada: row.data_entrada,
          data_saida: row.data_saida,
          repassado: row.repassado,
          Chamado: {
            ...chamado,
            responsavel: chamado.responsavel ?? null,
          },
          desc_problema_funcionario: row.desc_problema_funcionario,
        } as ItemFilaChamados;
      }).filter(Boolean) as ItemFilaChamados[];

      setFila(novaFila);
      return novaFila;
    }

    return [];
  }

  return { fila, getFilaEspera };
}

export default useFilaEspera;
