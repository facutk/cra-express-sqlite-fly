import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Layout } from './components';
import { Home, Login } from './routes';

const App = () => (
  <ChakraProvider>
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </HashRouter>
  </ChakraProvider>
);

export default App;
