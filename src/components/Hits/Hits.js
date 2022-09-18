import { useEffect, useState } from 'react';
import { Center, Flex } from '@chakra-ui/react';

import Loader from '../Loader/Loader';

const Hits = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hits, setHits] = useState();

  const loadData = async () => {
    const response = await fetch('/hits');
    const dataJson = await response.json();

    setHits(dataJson.hits);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Center w="100%">
      <Flex w="100%" justify="center">
        {isLoading && <Loader />}
        {!isLoading && <p>You are visitor #{hits}</p>}
      </Flex>
    </Center>
  );
};

export default Hits;
