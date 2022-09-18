import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Hits, Layout, Login, NoMatch } from './components';

const App = () => (
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Flex>
                <Hits />
              </Flex>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
