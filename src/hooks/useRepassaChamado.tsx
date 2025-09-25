import { useContext } from "react";
import { SupabaseContext } from "../contexts/supabaseContext";

function useRepassaChamado() {
  const { supabase } = useContext(SupabaseContext);

  async function repassaChamado() {
    const { data: MembroTI, error: MembroTISearchError } = await supabase
      .from("MembroTI")
      .select("*")
      .eq("email", localStorage.getItem("emailUsuarioAtivoTI"))
      .single();

    if (MembroTISearchError) alert("Erro ao buscar membros de TI!");
    else if (MembroTI) {
      const { data: Chamado, error: UpdateChamadoError } = await supabase
        .from("Chamado")
        .update({
          etapa: "aberto",
          membroTI_id: null,
        })
        .eq("membroTI_id", MembroTI.membro_id)
        .eq("etapa", "atendimento")
        .select("*");

      if (UpdateChamadoError) alert("Erro ao mudar etapa do Chamado!");

      const { error: FindFilaError } = await supabase
        .from("Fila")
        .update({
          repassado: true,
        })
        .eq("chamado_id", MembroTI.chamado_atual);

      if (FindFilaError) alert("Erro ao buscar chamado na fila!");

      const { error: MembroTIUpdateError } = await supabase
        .from("MembroTI")
        .update({ chamado_atual: null })
        .eq("email", localStorage.getItem("emailUsuarioAtivoTI"));

      if (MembroTIUpdateError) alert("Erro ao atualizar membro de TI!");
      else {
        return Chamado;
      }
    }
  }

  return repassaChamado;
}

export default useRepassaChamado;
