import { useEffect, useState } from "react";

import Loader from "./Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("/foo");
      const dataJson = await response.json();

      setData(dataJson);

      setIsLoading(false);
    };
    fetchData();

  }, []);

  return (
    <div className="App">
      {isLoading && <Loader />}

      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
};

export default App;
