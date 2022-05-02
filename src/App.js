import './App.css';

//Layouts
import { Header, Footer, Container } from './components/layouts';

//Components
import { News } from './components';

function App() {
  return (
    <div className="App">
			<Header />
			<div className="App__main">
				<Container>
					<News />
					<div className="App__block"></div>
					<div className="App__block"></div>
					<div className="App__block"></div>
					<div className="App__block"></div>
					<div className="App__block"></div>
				</Container>
			</div>
			<Footer />
    </div>
  );
}

export default App;
