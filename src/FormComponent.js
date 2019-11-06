import React, { Component } from 'react';
import TexxtInput from './TextInput';
import validate from './validate';

class FormContainer extends Component {

    constructor() {
        super();
        this.state = {
            formIsValid: false, //we will use this to track the overall form validity
            formControls: {
                email: {
                    value: '',

                },
                name: {
                    value: '',
                    placeholder: 'What is your name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: ''
                }
            }
        }

    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    }

    formSubmitHandler = () => {
        console.dir(this.state.formControls);
    }


    render() {
        return (
            <form style={{ textAlign: "center" }}>
                <div>
                    <input type="email"
                        name="email"
                        value={this.state.formControls.email.value} placeholder="Email"
                        onChange={this.changeHandler}
                    />
                </div>
                <div>
                    <TexxtInput name="name"
                        placeholder={this.state.formControls.name.placeholder}
                        value={this.state.formControls.name.value}
                        onChange={this.changeHandler}
                        touched={this.state.formControls.name.touched}
                        valid={this.state.formControls.name.valid}
                    />
                </div>
                <div>
                    <input type="password"
                        name="password"
                        value={this.state.formControls.password.value} placeholder="Password"
                        onChange={this.changeHandler}
                    />
                </div>
                <button onClick={this.formSubmitHandler} disabled={!this.state.formControls.name.valid}> Submit </button>
            </form>
        );
    }

}


export default FormContainer;