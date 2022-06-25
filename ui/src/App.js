
import './App.css';

import AppWrapper, { Route } from '@xavisoft/app-wrapper';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function setWindowDimensions() {

	const winHeight = window.innerHeight + 'px';
	const winWidth = window.innerWidth + 'px';

	document.documentElement.style.setProperty('--window-height', winHeight);
	document.documentElement.style.setProperty('--window-width', winWidth);
	
}

window.addEventListener('resize', setWindowDimensions);
setWindowDimensions();

function App() {
  return (
   <AppWrapper>

      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />

   </AppWrapper>
  );
}

export default App;
