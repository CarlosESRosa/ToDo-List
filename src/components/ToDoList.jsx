import React from 'react';
import './toDoList.css'

class Teste extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      myTasks: [],
      disabled: true,
      editInputValue: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.handleCheckTask = this.handleCheckTask.bind(this);
    this.editLine = this.editLine.bind(this);
    this.editHandleChange = this.editHandleChange.bind(this);
  }

  handleChange(event) {
    this.setState((state) => ({
      inputValue: event.target.value,
    }))
  }

  handleClick() {
    if (this.state.inputValue !== '') {
      this.setState((state) => {
        return {
          myTasks: [...state.myTasks, { value: this.state.inputValue, id: Math.random() }],
          inputValue: '',
        }
      })
    }
  }

  removeLine(id) {
    const newArray = this.state.myTasks.filter((task) => task.id !== id)
    this.setState((state) => ({
      myTasks: [...newArray],
    }))
  }

  editLine(id) {
    const changingTask = this.state.myTasks.find((task) => task.id === id)
    changingTask.value = this.state.otherInputValue;
    this.setState({
      disabled: !this.state.disabled,
      otherInputValue: '',
    })
  }

  editHandleChange(event) {
    this.setState((state) => ({
      otherInputValue: event.target.value,
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

  componentDidMount() { // window.onload
    if (localStorage.getItem("myList") !== null) { // caso o localStorage esteja vazio não roda
      this.setState({
        myTasks: JSON.parse(localStorage.getItem("myList")),
      })
    }
  }

  componentDidUpdate() { // roda sempre que atualiza o state
    localStorage.setItem("myList", JSON.stringify(this.state.myTasks));
  }

  render() {
    return (
      <div>
        <header className='input-container'>
          <h1><span id='header-todo'>TO.DO</span> List</h1>
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
          <ul>
            {this.state.myTasks.map((task) => {
              return (
                <div key={task.id}>
                  <li>
                    <div
                      className={task.isCompleted ? 'isCompleted' : ''}
                      data-task="task"
                    >
                      <input
                        type="checkbox"
                        onClick={() => this.handleCheckTask(task.id)}
                      />
                      <input
                        id='input-text'
                        type="text"
                        onChange={(event) => this.editHandleChange(event)}
                        onKeyUp={(e) => {
                          if (e.key === 'Enter' && this.state.otherInputValue !== '') {
                            this.editLine(task.id)
                          }
                        }}
                        value={this.state.disabled ? task.value : this.state.otherInputValue}
                        disabled={(this.state.disabled) ? "disabled" : ""}></input>
                    </div>
                    <div>
                      <button id='editButton' onClick={() => this.editLine(task.id)}><i className="fas fa-edit"></i></button>
                      <button id="removeButton" onClick={() => this.removeLine(task.id)}><i className="fas fa-trash"></i></button>
                    </div>
                  </li>
                </div>
              )
            })}
          </ul>
        </div >
      </div >
    )
  }
}

export default Teste;