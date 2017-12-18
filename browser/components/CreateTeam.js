import React, { Component } from 'react';
import { Form, Text } from 'react-form';

export default class CreateTeam extends Component {
    constructor() {
        super();
        this.state = {};
    }

    createTeam() {
        console.log('got to create')
        axios.post('/api/users', this.state)
            .catch(console.error);
    }
    
    render() {
        return (
            <Form onSubmit={submittedValues => {
                this.setState({submittedValues});
                this.createTeam.bind(this);
            }}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id='create-team'>
                        <label htmlFor='firstName'>First Name</label><br/>
                        <Text field='firstName' id='first-name' /><br/>
                        <label htmlFor='lastName'>Last Name</label><br/>
                        <Text field='lastName' id='last-name' /><br/>
                        <label htmlFor='email'>Email</label><br/>
                        <Text field='email' id='email' /><br/>
                        <label htmlFor='teamName'>Team Name</label><br/>
                        <Text field='teamName' id='team-name' /><br/>
                        <button type='submit'>Submit</button>
                    </form>
                )}
            </Form>
        )
    }
}