import "./App.css";
import ChatWindow from "./Components/Chat/ChatWindow";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <div className="chatbot">
        <Header />
        <ChatWindow />
      </div>
    </>
  );
}

export default App;
