import React from 'react';
import {FormInput as ReactNativeFormInput} from 'react-native-elements';
import styles from "./styles";

export default class FormInput extends React.Component {
    render() {
        const containerStyle = [styles.containerStyle, this.props.containerStyle];
        return (
            <ReactNativeFormInput {...this.props}
                                  containerStyle={containerStyle}/>
        );
    }
}