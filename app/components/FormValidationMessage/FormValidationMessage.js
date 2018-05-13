import React from 'react';
import {FormValidationMessage as ReactNativeFormValidationMessage} from 'react-native-elements';

import styles from "./styles";

export default class FormValidationMessage extends React.Component {
    render() {

        const hasError = !!this.props.children;

        if (hasError) {
            return (
                <ReactNativeFormValidationMessage {...this.props}
                                                  labelStyle={styles.labelStyle}/>
            );
        } else {
            return null;
        }
    }
}