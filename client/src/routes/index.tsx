import { useRoutes } from "react-router-dom";

import FunctionList from "../sections/functions-list";
import NewFunctionEditor from "../sections/new-function-editor";
import EditFunctionEditor from "../sections/edit-function-editor";


export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <FunctionList />
    },
    {
      path: "/function/:id",
      element: <NewFunctionEditor />
    },
    {
      path: '/function/edit/:id',
      element: <EditFunctionEditor />
    }
  ]);
}