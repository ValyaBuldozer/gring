import React from 'react';
import ObjectsStore from './ObjectsStore';
import RoutesStore from './RoutesStore';
import makeInspectable from 'mobx-devtools-mst';
import UserStore from "./UserStore";
import SettingsStore from "./SettingsStore";

const stores = {
    objects: new ObjectsStore(),
    routes: new RoutesStore(),
    user: new UserStore(),
    settings: new SettingsStore()
};

makeInspectable(stores);

const storesContext = React.createContext(stores);

export default storesContext;
