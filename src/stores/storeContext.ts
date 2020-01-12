import React from 'react';
import ObjectsStore from './ObjectsStore';

const storesContext = React.createContext({
    objects: new ObjectsStore()
});

export default storesContext;
