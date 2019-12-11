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

if ('serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW regitered');
            })
            .catch(err => {
                console.log('SW registration failed ', err);
            })
    })
}
