import './App.css';
import React from 'react';
import ToDoList from './components/ToDoList'

class App extends React.Component {
  render() {
    return (
      <>
        <h1>to.<strong>do</strong> </h1>
        <ToDoList />
      </>
    )
  }
}

export default App;
