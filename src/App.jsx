import GlobalStyled from "./shared/GlobalStyled";
import { ShineProvider } from "./context/ShineContext";
import Routes from "./routes";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <GlobalStyled />
      <ShineProvider>
        {/* <Routes /> */}
        <Router />
      </ShineProvider>
    </>
  );
}
export default App;
