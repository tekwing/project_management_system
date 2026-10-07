import AppLayout from './layouts/AppLayout';
import { Routes, Route } from "react-router-dom";
import Dashboard from './features/dashboard/pages/Dashboard';
import Projects from './features/projects/pages/Projects';
import AddProject from './features/projects/pages/AddProject/AddProject';
import AddMember from './features/team/pages/AddMember';
import Members from './features/team/pages/Members';
import AddTask from './features/tasks/pages/AddTask/AddTask';
import Tasks from './features/tasks/pages/Tasks';
import AddLead from './features/sales/leads/pages/AddLead';
import AllLeads from './features/sales/leads/pages/AllLead';
import LeadDetails from './features/sales/leads/pages/LeadDetails';
import KanbanBoard from './features/sales/pipeline/KanbanBoard';
import { Toaster } from 'sonner';

function App(){
  return(
     <>
          <Toaster position="top-right" richColors closeButton /> 
          <Routes>
               <Route path="/" element={<AppLayout />}>
                    <Route index element={<Dashboard/>} />
                    <Route path='projects' element={<Projects/>} />
                    <Route path='projects/add' element={<AddProject/>} />
                    <Route path='members/add' element={<AddMember/>} />
                    <Route path='members' element={<Members/>} />
                    <Route path='tasks/add' element={<AddTask/>} />
                    <Route path='tasks' element={<Tasks/>} />
                    <Route path='sales/lead/add' element={<AddLead/>} />
                    <Route path='sales/leads' element={<AllLeads/>} />
                    <Route path='sales/lead/details/:id' element={<LeadDetails/>} />
                    <Route path='sales/pipeline' element={<KanbanBoard/>} />
               </Route>
          </Routes>
     </>
  );
}

export default App;