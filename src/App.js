import "./App.css";
import Cameras from "./components/Cameras";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";
import CameraDetail from "./components/CameraDetail";
import StreamPlayer from "./components/StreamPlayer";
import AddCamera from "./components/AddCamera";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <h1>
            <a className="link header" href="/">
              WebCams
            </a>
          </h1>
          <div className="header">
            <nav>
              <ul className="nav">
                <li>
                  <Link className="link" to="/cameras">
                    Cameras
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/add">
                    Add
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            <Route path="/add" element={<AddCamera />} />
            <Route
              path="/cameras"
              element={
                <div>
                  <Cameras />
                </div>
              }
            />
            <Route path="/cameraDetail/:name" element={<CameraDetail />} />
            <Route path="/stream/:name/:video" element={<StreamPlayer />} />
            <Route path="/" />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
