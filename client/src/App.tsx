import './App.css'
import Nav from './components/nav'
import KanbanContainer from './pages/kanban/container/kanbanContainer'
import { dashboardConfig } from './config/navigationConfig'
import {
  BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster';
import AuthContainer from './pages/auth/container/authContainer';

function App() {

  return (
    <ThemeProvider>
      <Toaster/>
        <Router>
            <Routes>
              <Route path='/' element={<AuthContainer/>}/>

              <Route path='nav' element={<Nav item={dashboardConfig.mainNav} />}>
              </Route>
              <Route path='kanban' element={<KanbanContainer />} />
          
            </Routes>
        </Router>
    </ThemeProvider>
  )
}

export default App
