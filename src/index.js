import 'bulma/css/bulma.css'
import './static/styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import App from './Router'
import 'moment/locale/ru'

moment.locale('ru')

ReactDOM.render(<App />, document.getElementById('root'))
