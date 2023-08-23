import { MantineProvider } from '@mantine/core';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import UserTable from './components/UserTable';
import EditUser from './components/EditUser';
import UsersContextProvider from './contexts/UsersContext';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UsersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Users />}>
              <Route index element={<UserTable />} />
              <Route path="edit/:id" element={<EditUser />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UsersContextProvider>
    </MantineProvider>
  );
}

export default App;
