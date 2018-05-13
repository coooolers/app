import React from 'react';
import {FormLabel as ReactNativeFormLabel} from 'react-native-elements';

import styles from "./styles";

export default class FormLabel extends React.Component {
    render() {
        return (
            <ReactNativeFormLabel {...this.props}
                                  labelStyle={styles.labelStyle}/>
        );
    }
}