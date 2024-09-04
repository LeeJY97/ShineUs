import GlobalStyled from "./shared/GlobalStyled";
import { ShineProvider } from "./context/ShineContext";
import Router from "./shared/Router";

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
