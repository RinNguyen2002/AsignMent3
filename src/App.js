import './App.css';
import 'antd/dist/reset.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from "./constants/routes"
import MainLayout from './layouts/MainLayout';
import AllTask from './pages/AllTask';
import AddNewTask from './pages/AddNewTask';
import DoingTask from './pages/DoingTask';
import DoneTask from './pages/DoneTask';
import NewTask from './pages/NewTask';
import UpdateTask from './pages/UpdateTask';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<AllTask/>}/>
            <Route path={ROUTES.ALL_TASK} element={<AllTask />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask/>}/>
            <Route path={ROUTES.NEW_TASK} element={<NewTask />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTask />} />
            <Route path={ROUTES.DONE_NEW} element={<DoneTask />} />
            <Route path={ROUTES.ADD_NEW} element={< AddNewTask/>} />
          </Route>
          <Route path={'/'} element={<Navigate to={ROUTES.ALL_TASK} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
