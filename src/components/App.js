import '../style/App.css';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/Routes'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header />
        <Routes />              
    </div>
    </BrowserRouter>
  );
}

export default App;
