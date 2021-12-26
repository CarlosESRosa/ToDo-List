import './App.css';
import React from 'react';
import ToDoList from './components/ToDoList'

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1 className='main-title'>to.<strong>do</strong> </h1>
        </header>
        <ToDoList />
      </>
    )
  }
}

export default App;
