import "./App.css";
import Nav from "./components/Nav";
// import books from "./components/data.js";
// import BattingOrder from "./components/BattingOrder";
// import booksContext from "./components/Context.js";
// eslint-disable-next-line no-unused-vars
import BookProvider from "./components/Context";
function App() {
  return (
    <>
      <BookProvider>
        <Nav />
      </BookProvider>
    </>
  );
}

export default App;
