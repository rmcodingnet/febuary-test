import { Route, Switch } from "react-router-dom";
import Album from "./components/Album/Album";
import Artist from "./components/Artist/Artist";
import MusicTable from "./components/MusicTable/MusicTable";
import MusicForm from "./components/MusicForm/MusicForm";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
      <Route
          exact={true}
          path="/album/:albumID"
          render={(props) => (
            <Album
              {...props}
            />
          )}
        />
      <Route
          exact={true}
          path="/artist/:artistID"
          render={(props) => (
            <Artist
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path="/add/:addType"
          render={(props) => (
            <MusicForm
              {...props}
            />
          )}
          />
        <Route
          exact={true}
          path="/"
          render={(props) => (
            <MusicTable
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
