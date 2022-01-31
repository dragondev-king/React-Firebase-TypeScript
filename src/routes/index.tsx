
import { Routes, Route, Link } from 'react-router-dom'
import AddTutorial from './AddTutorials'
import TutorialList from './TutorialsList'

const Main = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/tutorials"} className="navbar-brand">
          
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>React Typescript Firebase example</h2>
        <Routes>
          <Route path='/' element={<TutorialList />} />
          <Route path="/add" element={<AddTutorial />} />
        </Routes>
      </div>
    </div>
  )
}

export default Main
