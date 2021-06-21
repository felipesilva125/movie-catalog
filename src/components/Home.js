import '../style/App.css';
import Header from './Header';

function handleButton(){
  alert("click");
}

function Home() {
  return (
    <div className="App">
        <Header />               
        <input type="button" value="Click Me!" onClick={handleButton} />      
    </div>
  );
}

export default Home;
