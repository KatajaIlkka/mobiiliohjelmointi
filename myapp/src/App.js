import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '',  date: '', todos: []}

  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState({
      todos: [...this.state.todos, {date: this.state.date, description: this.state.description}]
    });
  }

  render() {
    const itemRows = this.state.todos.map((todo, index) =>
        <tr key={index}>
          <td>{todo.date}</td><td>{todo.description}</td>
          <td><button onClick={this.deleteTodo} value={index}>Delete</button></td>
        </tr>
      )

    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div className="input">
          <form onSubmit={this.addTodo}>
          Date:
            <input type="text" onChange={this.inputChanged} value={this.state.date} name="date"/>
          Description:
            <input type="text"  onChange={this.inputChanged} value={this.state.description} name="description"/>
            <input type="submit" value="Add"/>
          </form>
        </div>
        <table>
          <tbody>
            <tr>
            <th>Date</th>
            <th>Description</th>
            </tr>
            {itemRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
