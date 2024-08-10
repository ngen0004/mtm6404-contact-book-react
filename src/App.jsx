import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ContactDetails from './components/ContactDetails';
import NewContact from './components/NewContact';
import EditContact from './components/EditContact';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/new" element={<NewContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Router>
    
  )
}

export default App;
