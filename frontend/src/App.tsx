import AppLayout from './layouts/AppLayout';
import { Routes, Route } from "react-router-dom";
import Dashboard from './features/dashboard/pages/Dashboard';
import Projects from './features/projects/pages/Projects';

function App(){
  return(
     <Routes>
          <Route path="/" element={<AppLayout />}>
               <Route index path='/' element={<Dashboard/>} />
               <Route path='/projects' element={<Projects/>} />
          </Route>
      </Routes>
  );
}

export default App;