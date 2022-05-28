import './App.css';
import Menu from "./components/Menu";
import {Routes, Route} from "react-router-dom";
import RedPage from "./pages/RedPage";
import BluePage from "./pages/BluePage";
import ImageIsland from "./example/ImageIsland";

function App() {
    console.log(process.env.NODE_ENV) // "development"
  return (
      <body>
          <div>
            <Menu/>
            <hr/>
            <Routes>
              <Route path="/red" element={<RedPage/>}/>
              <Route path="/blue" element={<BluePage/>}/>
            </Routes>
            {/*<ImageIsland/>*/}
          </div>
      </body>
  );
}

export default App;
