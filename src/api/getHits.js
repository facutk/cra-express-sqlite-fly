import handleAPI from './utils/handleAPI';

const getHits = () => fetch('/api/hits').then(handleAPI);

export default getHits;
