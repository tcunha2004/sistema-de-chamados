import { useContext } from "react";
import { SupabaseContext } from "../contexts/supabaseContext";

function useConcluiChamado() {
  const { supabase } = useContext(SupabaseContext);

  async function concluiChamado() {
    const { data: MembroTI, error: MembroTISearchError } = await supabase
      .from("MembroTI")
      .select("*")
      .eq("email", localStorage.getItem("emailUsuarioAtivoTI"))
      .single();

    if (MembroTISearchError) alert("Erro ao buscar membros de TI!");
    else if (MembroTI) {
      const { error: UpdateChamadoError } = await supabase
        .from("Chamado")
        .update({
          etapa: "concluido",
          data_conclusao: new Date().toISOString(),
        })
        .eq("membroTI_id", MembroTI.membro_id);

      if (UpdateChamadoError) alert("Erro ao mudar etapa do Chamado!");

      const { error: UpdateFilaError } = await supabase
        .from("Fila")
        .delete()
        .eq("chamado_id", MembroTI.chamado_atual);

      if (UpdateFilaError) alert("Erro ao atualizar lista de chamados!");

      const { error: MembroTIUpdateError } = await supabase
        .from("MembroTI")
        .update({ chamado_atual: null })
        .eq("email", localStorage.getItem("emailUsuarioAtivoTI"));

      if (MembroTIUpdateError) alert("Erro ao atualizar membro de TI!");
    }
  }

  return concluiChamado;
}

export default useConcluiChamado;
