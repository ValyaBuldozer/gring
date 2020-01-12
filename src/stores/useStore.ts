import React from 'react';
import storesContext from './storeContext';

const useStore = () => React.useContext(storesContext);

export default useStore;
