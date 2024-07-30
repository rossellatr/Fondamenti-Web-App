import './style/App.css';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';
import AddFriend from "./pages/AddFriend";
import  DeleteFriend from "./pages/DeleteFriend";
import ViewFriends from './pages/ViewFriends';
import ChatsPage from "./pages/ChatsPage";
import SendFirstMessage from "./components/SendFirstMessage";
import ChatsPageFriends from './pages/ChatsPageFriends';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/ChatsPage" element={<ChatsPage />} />
                <Route path="/SendFirstMessage" element={<SendFirstMessage />} />
                <Route path="/AddFriend" element={<AddFriend />} />
                <Route path="/DeleteFriend" element={<DeleteFriend />} />
                <Route path="/viewFriends" element={<ViewFriends />} />
                <Route path="/chatsFriends" element={<ChatsPageFriends/> } />
            </Routes>
        </div>
          );
}

export default App;
