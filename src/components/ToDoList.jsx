import React from 'react';
import './toDoList.css'

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
      <div className=''>
        <header className='input-container'>
          <h1>My to.do list</h1>
          <div className='add-element'>
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
            <button onClick={this.handleClick}>
              <i className="far fa-check-square"></i>
            </button>
          </div>
        </header>
        <div className="element-list">
          <ul >
            {this.state.myTasks.map((task) => {
              return (
                <div >
                  <li key={task.id}>
                    <div
                      className={task.isCompleted ? 'isCompleted' : ''}
                      data-task="task"
                    >
                      <input
                        type="checkbox"
                        onClick={() => this.handleCheckTask(task.id)}
                      />
                      <span>{task.value}</span>
                    </div>
                    <button onClick={() => this.removeLine(task.id)}><i class="fas fa-trash"></i></button>
                  </li>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Teste;