import "./App.css";
import Nav from "./components/Nav";
import BookProvider from "./contexts/Context";

function App() {
  return (
    <BookProvider>
      <Nav />
    </BookProvider>
  );
}

export default App;
