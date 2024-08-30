import Router from "./shared/Router";
import GlobalStyled from "./shared/GlobalStyled";
import { ShineProvider } from "./context/ShineContext";
import Routes from "./routes";

function App() {
  return (
    <>
      <GlobalStyled />
      <ShineProvider>
        {/* <Router /> */}
        <Routes />
      </ShineProvider>
    </>
  );
}
export default App;
