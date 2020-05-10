import React from 'react';
import ObjectsStore from './ObjectsStore';
import RoutesStore from './RoutesStore';
import makeInspectable from 'mobx-devtools-mst';
import UserStore from "./UserStore";
import SettingsStore from "./SettingsStore";
import Api from '../api/Api';

function createStores() {
    const settings = new SettingsStore();
    const api = new Api(settings);
    const objects = new ObjectsStore(api);
    const routes = new RoutesStore(api);
    const user = new UserStore(api);

    return {
        objects,
        routes,
        user,
        settings,
        api
    }
}

const stores = createStores();

makeInspectable(stores);

const storesContext = React.createContext(stores);

export default storesContext;
