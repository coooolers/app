import React from 'react';
import PropTypes from 'prop-types'
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {isEmpty, validate} from '../../modules/auth/utils/validate';
import styles from "./styles"
import FormInput from "../FormInput/FormInput";
import FormValidationMessage from "../FormValidationMessage";

class Form extends React.Component {
    static propTypes = {
        buttonTitle: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.object
    };

    static defaultProps = {
        onForgotPassword: null,
    };

    constructor(props) {
        super(props);
        const {fields, error} = props;

        const fieldsState = {};
        fields.forEach((field) => {
            let {key, type, value} = field;
            fieldsState[key] = {type: type, value: value};
        });

        this.state = Object.assign({}, fieldsState, {error});
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.error && nextProps.error !== prevProps.error) {
            this.setState({error: nextProps.error});
        }
    }

    onSubmit = () => {
        const data = this.state;
        const result = validate(data);

        if (result.success) {
            this.props.onSubmit(this.extractData(data));
        } else {
            this.setState({error: result.error});
        }
    };

    extractData = (data) => {
        const retData = {};

        Object.keys(data).forEach(function (key) {
            if (key !== "error") {
                let {value} = data[key];
                retData[key] = value;
            }
        });

        return retData;
    };

    onChange = (key, text) => {
        const state = this.state;
        state[key]['value'] = text;
        this.setState(state);
    };

    renderField = (field, index) => {
        const {key, placeholder, autoFocus, secureTextEntry, autoCapitalize} = field;

        return (
            <View key={key} style={{marginTop: 10, marginBottom: 10, width: '100%'}}>
                <FormInput placeholder={placeholder}
                           autoFocus={autoFocus}
                           autoCapitalize={autoCapitalize}
                           onChangeText={(text) => this.onChange(key, text)}
                           secureTextEntry={secureTextEntry}
                           value={this.state[key]['value']}
                           containerStyle={{
                               width: '100%'
                           }}/>
                <FormValidationMessage>{this.state.error[key]}</FormValidationMessage>
            </View>
        );
    };

    renderGeneralErrorMessage = () => {
        if (!isEmpty(this.state.error['general'])) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{this.state.error['general']}</Text>
                </View>
            );
        }
    };

    render() {
        const {fields, buttonTitle, onForgotPassword, isFetching} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {this.renderGeneralErrorMessage()}
                    {fields.map(this.renderField)}


                    <Button
                        raised
                        title={buttonTitle}
                        disabled={isFetching}
                        containerViewStyle={styles.containerView}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.onSubmit}/>
                    {
                        this.props.onForgotPassword !== null &&
                        <Text style={styles.forgotText} onPress={onForgotPassword}>
                            Forgot password?</Text>
                    }

                </View>
            </View>
        );
    }
}


export default Form;