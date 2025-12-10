import { Fragment } from "react";
import Routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import AppProvider from "./config/reactQuery";
import AuthProvider from "./context/authContext";

export default function App() {
  return (
    <Fragment>
      <AppProvider>
        <AuthProvider>
          <Routes />
          <Toaster />
        </AuthProvider>
      </AppProvider>
    </Fragment>
  );
}
