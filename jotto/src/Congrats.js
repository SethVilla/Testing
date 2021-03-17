import React from 'react';

/**
 * Functional react component for congrats message
 * @param {object} props
 * @returns {JSX.Element}
 */
export const Congrats = (props) => {
        if (props.success){
            return (
                <div data-test="component-congrats">
                    <span data-test="congrats-message">
                        Congratulations! you guessed the word!
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