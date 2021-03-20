import React from 'react';
import PropTypes from 'prop-types';
import languageContext from './contexts/languageContext';
import {stringsModule} from './helpers/strings';

/**
 * Functional react component for congrats message
 * @param {object} props
 * @returns {JSX.Element}
 */
const Congrats = (props) => {
    const language = React.useContext(languageContext)
        if (props.success){
            return (
                <div data-test="component-congrats" className="alert alert-success">
                    <span data-test="congrats-message">
                        {stringsModule.getStringByLanguage(language, 'congrats')}
                    </span>
                </div>
            )
        } else {
            return (
                <div data-test="component-congrats">
                    <span></span>
                </div>
            )
        }
}

Congrats.propTypes = {
success : PropTypes.bool.isRequired,
}

export default Congrats;