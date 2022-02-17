import "./App.css";
import ButtonAppBar from "./Appbar";
import SymptomAutocomplete from "./Autocomplete";
import BasicCard from "./Title";

function App() {
  return (
    <div className="App">
      <div className="Appbar">
        <ButtonAppBar />
      </div>
      <div className="title-bar">
        <BasicCard />
      </div>
      <div className="symptom-bar">
        <SymptomAutocomplete />
      </div>
    </div>
  );
}

export default App;
