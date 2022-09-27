import { useEffect, useState } from 'react';
import { Center, Flex } from '@chakra-ui/react';

import getHits from 'src/api/getHits';
import Loader from 'src/components/Loader/Loader';

const Hits = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hits, setHits] = useState();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getHits();
      setHits(response.hits);
    } finally {
      setIsLoading(false);
    }
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
