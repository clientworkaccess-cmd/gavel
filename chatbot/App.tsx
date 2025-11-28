import { ChatWindow } from './components/ChatWindow';

const App: React.FC = () => {

  return (
    <div className="fixed inset-0 flex flex-col justify-end items-end sm:p-6 p-4">
      <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
        <ChatWindow onClose={() => { window.parent.postMessage({ type: "CHAT_CLOSED" }, "*") }} />
      </div>
    </div>
  );
};

export default App;