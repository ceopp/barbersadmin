import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import BaseContextWrapper from './components/common/BaseContext'
import Auth from './pages/Auth'
import Barbers from './pages/Barbers'

export default function App() {
    return (
        <BrowserRouter basename="/admin">
            <BaseContextWrapper>
                <Switch>
                    <Route path="/" name="auth" component={Auth} exact />
                    <Route path="/login" name="login" component={Login} exact />
                    <Route path="/barbers" name="barbers" component={Barbers} exact />
                    <Route path="/user" name="user" component={Barbers} exact />
                    <Route path="/services" name="services" component={Barbers} exact />
                    <Route path="" component={NotFound} exact />
                </Switch>
            </BaseContextWrapper>
        </BrowserRouter>
    )
}
