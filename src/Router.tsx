import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import AdminLogin from "./pages/Admin/login/adminLogin";
import ITLogin from "./pages/IT/login/ITLogin";
import AdminCadastro from "./pages/Admin/cadastro/cadastroMembroTI";
import ProtectedRoutesAdmin from "./utils/ProtectedRoutesAdmin";
import ProtectedRoutesTI from "./utils/ProtectedRoutesTI";
import ITMeusChamados from "./pages/IT/meus chamados/ITMeusChamados";
import ITTodosChamados from "./pages/IT/todos os chamados/ITTodosChamados";
import RealizarChamado from "./pages/Func/realizar chamado/realizarChamado";
import FilaEspera from "./pages/Func/fila de espera/filaEspera";

function Router() {
  return (
    <Routes>
      {/* Logo MIP todas as paginas */}
      <Route element={<DefaultLayout />}>
        <Route index element={<RealizarChamado />} />
        <Route path="fila-espera" element={<FilaEspera />} />

        {/* Login Admin */}
        <Route path="admin-login" element={<AdminLogin />} />
        {/* Check Login Admin */}
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path="admin/cadastro" element={<AdminCadastro />} />
        </Route>

        {/* Login TI */}
        <Route path="ti-login" element={<ITLogin />} />
        {/* Check Login MembroTI */}
        <Route element={<ProtectedRoutesTI />}>
          <Route path="ti/meus-chamados" element={<ITMeusChamados />} />
          <Route path="ti/todos-chamados" element={<ITTodosChamados />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
