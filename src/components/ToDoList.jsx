import React from 'react';

class Teste extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      myTasks: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeLine = this.removeLine.bind(this);
  }

  handleChange(event) {
    this.setState((state) => ({
      inputValue: event.target.value,
    }))
  }

  handleClick() {
    this.setState((state) => ({
      myTasks: [...state.myTasks, { value: this.state.inputValue, id: Math.random() }],
      inputValue: '',
    }))
    console.log(this.state.myTasks);
  }

  removeLine() {
    console.log('removeLine');
  }


  render() {
    return (
      <>
        <input onChange={this.handleChange} placeholder='Adicione uma tarefa'></input>
        <button onClick={this.handleClick}>ADD</button>
        <ul>
          {this.state.myTasks.map((task) => {
            return <li key={task.id}>{task.value} <button onClick={this.removeLine}>remove</button></li>
          })}
        </ul>
      </>
    )
  }
}

export default Teste;