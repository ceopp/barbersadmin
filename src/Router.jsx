import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import BaseContextWrapper from './components/common/BaseContext'
import Auth from './pages/Auth'
import Barbers from './pages/Barbers'
import Services from './pages/Services'

export default function App() {
    return (
        <BrowserRouter >
            <BaseContextWrapper>
                <Switch>
                    <Route path="/" name="auth" component={Auth} exact />
                    <Route path="/login" name="login" component={Login} exact />
                    <Route path="/barbers" name="barbers" component={Barbers} exact />
                    <Route path="/services" name="services" component={Services} exact />
                    <Route path="" component={NotFound} exact />
                </Switch>
            </BaseContextWrapper>
        </BrowserRouter>
    )
}
