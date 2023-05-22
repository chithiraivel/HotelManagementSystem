
import Layout from "./Components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { useContext, useState } from "react";
import { createContext } from "react";
export const loginContext = createContext();
function App() {
  const [login, setLogin] = useState(false);
  return (
    <loginContext.Provider value={{ login, setLogin }}>
      <BrowserRouter>
        <div className="App">
          <div className="side">
            <Layout />
          </div>
        </div>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
