import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './app/AllRoutes';

function App() {
  return (
    <BrowserRouter className="App">
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
