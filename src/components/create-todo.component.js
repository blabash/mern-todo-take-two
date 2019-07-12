import React from 'react';

export default class CreateTodo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: 'Low',
            todo_completed: false,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        console.log(this.state)

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: this.state.todo_priority,
            todo_completed: false,
        })
    }

    render () {
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: 
                            <input type="text"
                                    onChange={this.onChange}
                                    value={this.state.todo_description}
                                    name="todo_description"
                                    className="form-control"
                                    />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Responsible: 
                            <input type="text"
                                    onChange={this.onChange}
                                    value={this.state.todo_responsible}
                                    name="todo_responsible"
                                    className="form-control"
                                    />
                        </label>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <label htmlFor="priorityLow" className="form-check-label">Low&nbsp;</label>
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    onChange={this.onChange}
                                    checked={this.state.todo_priority === 'Low'}
                                    value='Low'
                                    id="priorityLow"
                                    />
                        </div>
                        <div className="form-check form-check-inline">
                            <label htmlFor="priorityMedium" className="form-check-label">Medium&nbsp;</label>
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    onChange={this.onChange}
                                    checked={this.state.todo_priority === 'Medium'}
                                    value='Medium'
                                    id="priorityMedium"
                                    />
                        </div>
                        <div className="form-check form-check-inline">
                            <label htmlFor="priorityHigh" className="form-check-label">High&nbsp;</label>
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    onChange={this.onChange}
                                    checked={this.state.todo_priority === 'High'}
                                    value='High'
                                    id="priorityHigh"
                                    />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Todo" className="btn btn-primary"></input>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}