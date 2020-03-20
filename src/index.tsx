import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

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
