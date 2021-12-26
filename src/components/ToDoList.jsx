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
    this.handleCheckTask = this.handleCheckTask.bind(this);
  }

  handleChange(event) {
    this.setState((state) => ({
      inputValue: event.target.value,
    }))
  }

  handleClick() {
    if (this.state.inputValue !== '') {
      this.setState((state) => ({
        myTasks: [...state.myTasks, { value: this.state.inputValue, id: Math.random() }],
        inputValue: '',
      }))
      console.log(this.state.inputValue);
    }
  }

  removeLine(id) {
    const newArray = this.state.myTasks.filter((task) => task.id !== id)
    this.setState((state) => ({
      myTasks: [...newArray]
    }))
  }

  handleCheckTask(id) {
    const checkedTasks = this.state.myTasks.map((task) => {
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    });

    this.setState((state) => ({
      myTasks: [...checkedTasks],
    }))
  }


  render() {
    return (
      <>
        <input
          onChange={this.handleChange}
          placeholder='Adicione uma tarefa'
          onKeyUp={(e) => {
            if (e.key === 'Enter' && this.state.inputValue !== '') {
              this.handleClick()
            }
          }}
          value={this.state.inputValue}
        />
        <button onClick={this.handleClick}>ADD</button>
        <ul>
          {this.state.myTasks.map((task) => {
            return <li key={task.id}>
              <div className={task.isCompleted ? 'isCompleted' : ''}>
                <input
                  type="checkbox"
                  onClick={() => this.handleCheckTask(task.id)}
                />
                {task.value}
              </div>
              <button onClick={() => this.removeLine(task.id)}>remove</button>
            </li>
          })}
        </ul>
      </>
    )
  }
}

export default Teste;