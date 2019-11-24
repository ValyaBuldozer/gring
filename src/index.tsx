import * as React from 'react';
import * as ReactDOM from 'react-dom';
import jss from 'jss';
import preset from 'jss-preset-default';
import App from './components/App';

jss.setup(preset());

ReactDOM.render(
    <App/>,
    document.getElementById('index')
);
