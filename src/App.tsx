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

function App() {

  return (
    <ThemeProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Nav item={dashboardConfig.mainNav} />}>
              <Route path='/kanban' element={<KanbanContainer />} />
            </Route>
          </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
