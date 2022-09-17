import { ChakraProvider } from '@chakra-ui/react';
import { Hits } from './components';

const App = () => (
  <ChakraProvider>
    <div>
      <Hits />
    </div>
  </ChakraProvider>
);

export default App;
