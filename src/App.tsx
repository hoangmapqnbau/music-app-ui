import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import MainLayout from './layouts/layouts';

function App() {
  return (
    <Routes>
      {publicRoutes?.length
        ? publicRoutes.map(({ path, element: Component }) => {
            return <Route key={path} path={path} element={<MainLayout><Component /></MainLayout>} />;
          })
        : null}
    </Routes>
  );
}

export default App;
