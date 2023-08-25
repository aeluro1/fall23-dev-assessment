import { MantineProvider } from '@mantine/core';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import UserTable from './components/UserTable';
import EditUser from './components/EditUser';
import UsersContextProvider from './contexts/UsersContext';
import AddUser from './components/AddUser';
import ViewUser from './components/ViewUser';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UsersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<Users />}>
              <Route index element={<UserTable />} />
              <Route path="view/:id" element={<ViewUser />} />
              <Route path="edit/:id" element={<EditUser />} />
              <Route path="add" element={<AddUser />} />
              <Route path="*" element={<p>Invalid Page</p>} />
            </Route>
            <Route path="/viewer" element={<Users />}>
              <Route index element={<UserTable />} />
              <Route path="view/:id" element={<ViewUser />} />
              <Route path="*" element={<p>Invalid Page</p>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UsersContextProvider>
    </MantineProvider>
  );
}

export default App;
