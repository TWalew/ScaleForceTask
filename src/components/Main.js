import React from 'react'
import { Switch, Route } from 'react-router-dom'
import View from './View'
import Table from './Table'


const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Table}/>
            <Route path='/view' component={View}/>
        </Switch>
    </main>
);

export default Main
