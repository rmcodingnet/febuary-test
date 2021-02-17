import { Route, Switch } from "react-router-dom"
import Album from "./components/Album/Album";
import Artist from "./components/Artist/Artist";
import MusicTable from "./components/MusicTable/MusicTable"

function App() {
  return (
    <div className="App">
      <Switch>
      <Route
          exact={true}
          path="/album"
          render={(props) => (
            <Album
              {...props}
            />
          )}
        />
      <Route
          exact={true}
          path="/artist"
          render={(props) => (
            <Artist
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
