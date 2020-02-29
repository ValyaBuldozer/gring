import React from 'react';
import ObjectsStore from './ObjectsStore';
import RoutesStore from './RoutesStore';
import makeInspectable from 'mobx-devtools-mst';

const stores = {
    objects: new ObjectsStore(),
    routes: new RoutesStore()
};

makeInspectable(stores);

const storesContext = React.createContext(stores);

export default storesContext;
