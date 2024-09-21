import { Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes/routes';

function App() {
  return (
    <>
      <Routes>
        {publicRoutes?.length
          ? publicRoutes.map(({ path, element: Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })
          : null}
      </Routes>
    </>
  );
}

export default App;
