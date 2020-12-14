import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import Posts from "./components/posts.component"
import CreatePost from "./components/create-post.component"
import EditPost from './components/edit-post.component'
import ViewPost from './components/view-post.component'
import Signin from './components/signin.component'
import Register from './components/register.component'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path='/' exact component={Posts} />
        <Route path='/create' component={CreatePost} />
        <Route path='/edit/:id' component={EditPost} />
        <Route path='/view/:id' component={ViewPost} />
        <Route path='/signin' component={Signin} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  );
}

export default App;
