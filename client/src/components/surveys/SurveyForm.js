import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';

const FIELDS = [
    { label: 'Survey Title', name: 'title', error: 'You must provide a title!' },
    { label: 'Subject Line', name: 'subject', error: 'You must provide a subject!' },
    { label: 'Email Body', name: 'body', error: 'You must provide a body!' },
    { label: 'Recipient List', name: 'emails', error: 'You must provide a recipients list!' }
]

class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({label, name}) => {
            return <Field key={name} label={label} name={name} component={SurveyField} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))} >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    FIELDS.forEach(({ name, error}) => {
        if (!values[name]) {
            errors[name] = error;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);