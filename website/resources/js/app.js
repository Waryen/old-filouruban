require('./bootstrap');

import ReactDOM from 'react-dom'
import Example from './components/Example';

if(document.getElementById('react')) {
    ReactDOM.render(
        <Example></Example>,
        document.getElementById('react')
    )
}

const moment = require('moment')
console.log(moment().format())
