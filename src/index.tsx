import * as React from 'react';
import * as ReactDOM from 'react-dom';
import jss from 'jss';
import preset from 'jss-preset-default';
//@ts-ignore
import reset from 'reset-jss';
import App from './components/App';

jss.setup(preset());
jss.createStyleSheet(reset).attach()

ReactDOM.render(
    <App/>,
    document.getElementById('index')
);
