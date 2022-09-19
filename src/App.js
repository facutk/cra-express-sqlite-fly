import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';

import { Layout } from './components';
import { Auth, Home, Login } from './routes';

const App = () => (
  <ChakraProvider>
    <BrowserRouter basename="/">
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/auth/token/:token" element={<Auth />} />
            <Route path="*" element={<Login />} />
          </Route>
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
