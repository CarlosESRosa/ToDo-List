import './App.css';
import React from 'react';
import ToDoList from './components/ToDoList'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <ToDoList />
      </div>
    )
  }
}

export default App;
