import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import "./App.css";
 
import Login from './Login.js';
import Signup from './Signup.js';
import Home from './Home.js';
import Adminlogin from './Adminlogin.js';
import Adminpage from './Adminpage.js'; 



function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/adminlogin" element={<Adminlogin />}></Route>
        <Route path="/adminpage" element={<Adminpage />}></Route>
        

      </Routes>
      </BrowserRouter>
    
  );
}

export default App;