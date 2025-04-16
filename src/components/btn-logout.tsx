import { logout } from "@/app/(auth)/actions";
import { Button } from "./ui/button";

export const BtnLogout = () => {
  return <Button onClick={logout}>Cerrar Sesión</Button>;
};
