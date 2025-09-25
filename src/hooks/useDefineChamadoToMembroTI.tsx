import { useContext } from "react";
import { SupabaseContext } from "../contexts/supabaseContext";

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

function useDefineChamadoToMembroTI() {
  const { supabase } = useContext(SupabaseContext);

  async function associateChamadoToMembro(item: ItemFilaChamados) {
    const { data: MembroTI, error: MembroTISearchError } = await supabase
      .from("MembroTI")
      .select("*")
      .eq("email", localStorage.getItem("emailUsuarioAtivoTI"))
      .single();

    if (MembroTISearchError) alert("Erro ao buscar membros de TI");
    else if (MembroTI.chamado_atual != null) {
      return null;
    } else {
      const { error: UpdateMembroError } = await supabase
        .from("MembroTI")
        .update({ chamado_atual: item.Chamado.chamado_id })
        .eq("email", localStorage.getItem("emailUsuarioAtivoTI"));

      if (UpdateMembroError) alert("Erro ao associar Chamado a Membro");

      const { error: UpdateChamadoError } = await supabase
        .from("Chamado")
        .update({ membroTI_id: MembroTI.membro_id, etapa: "atendimento" })
        .eq("chamado_id", item.Chamado.chamado_id);

      if (UpdateChamadoError) alert("Erro ao associar Membro ao Chamado");
    }
  }

  return associateChamadoToMembro;
}

export default useDefineChamadoToMembroTI;
