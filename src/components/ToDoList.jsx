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
    this.editLine = this.editLine.bind(this);
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
    }
  }

  removeLine(id) {
    const newArray = this.state.myTasks.filter((task) => task.id !== id)
    this.setState((state) => ({
      myTasks: [...newArray]
    }))
  }

  editLine(event) {
    console.log(event.target.disabled);
    event.target.disabled = !event.target.disabled;
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
                      <input id='input-text' type="text" value={task.value} disabled={true}></input>
                    </div>
                    <div>
                      <button id='editButton' onClick={this.editLine}><i class="fas fa-edit"></i></button>
                      <button id="removeButton" onClick={() => this.removeLine(task.id)}><i class="fas fa-trash"></i></button>
                    </div>
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