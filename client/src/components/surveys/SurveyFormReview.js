import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = FIELDS.map(({ label, name }) => {
        return (
            <div key={name}>
                <label style={{marginBottom: '5px'}}>{label}</label>
                <div style={{marginBottom: '20px'}}>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please review your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel} >
                    Back
            </button>
            <button className="green btn-flat white-text right" 
                onClick={() => submitSurvey(formValues, history)} 
            >
                    Send Survey
                    <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    }
}

// withRouter returns a history object in the props to help navigate
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));