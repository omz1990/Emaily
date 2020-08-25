import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';
import FIELDS from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({label, name}) => {
            return <Field key={name} label={label} name={name} component={SurveyField} />
        });
    }

    render() {
        return (
            <div>
                <h5>Please enter survey details</h5>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Review
                        <i className="material-icons right">navigate_next</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    FIELDS.forEach(({ name, error}) => {
        if (!values[name]) {
            errors[name] = error;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);