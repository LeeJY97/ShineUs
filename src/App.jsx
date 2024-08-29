import Router from "./shared/Router";
import GlobalStyled from "./shared/GlobalStyled";
import { ShineProvider } from "./context/ShineContext";

function App() {
  return (
    <>
      <GlobalStyled />
      <ShineProvider>
        <Router />
      </ShineProvider>
    </>
  );
}
export default App;
