import { useEffect, useState } from 'react';

import Loader from './Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hits, setHits] = useState();

  const loadData = async () => {
    setIsLoading(true);

    const response = await fetch('/hits');
    const dataJson = await response.json();

    setHits(dataJson.hits);

    setIsLoading(false);
  };

  useEffect(() => loadData(), []);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && <>You are visitor #{hits}</>}
    </div>
  );
};

export default App;
