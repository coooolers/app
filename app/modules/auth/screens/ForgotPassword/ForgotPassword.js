import React from 'react';
import {connect} from 'react-redux';
import {View, Alert} from 'react-native';
import Form from "../../../../components/Form";
import {resetPassword} from "../../actions";
import styles from "./styles";
import {AUTH_USER_NOT_FOUND_ERROR_CODE} from "../../constants";

const fields = [
    {
        key: 'email',
        placeholder: "Email",
        autoFocus: false,
        secureTextEntry: false,
        autoCapitalize: 'none',
        defaultValue: "",
        type: "email"
    }
];

const DEFAULT_ERROR = {
    general: "",
    email: ""
};

class ForgotPassword extends React.Component {
    state = {
        error: DEFAULT_ERROR
    };

    static navigationOptions = ({ngation}) => {
        return {
            title: "Forgot Password"
        }
    };

    onSubmit = (data) => {
        this.setState({error: DEFAULT_ERROR, isFetching: true});

        this.props.resetPassword(data, () => {
            this.setState({isFetching: false});
            Alert.alert(
                "It's on the way!",
                "We just sent you a password reset email. It should show up in your inbox any second now."
            );
            this.props.navigation.goBack();
        }, this.onError)
    };

    onError = (error) => {
        let errObj = Object.assign({}, DEFAULT_ERROR);

        if (error.code = AUTH_USER_NOT_FOUND_ERROR_CODE) {
            errObj["general"] = "Sorry, we can't find a user with that email. Double check that your information is correct and please try again.";
        } else if (error.hasOwnProperty("message")) {
            errObj["general"] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key) => errObj[key] = error[key]);
        }

        this.setState({
            error: errObj,
            isFetching: false
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Form fields={fields}
                      onSubmit={this.onSubmit}
                      buttonTitle={"SUBMIT"}
                      isFetching={this.state.isFetching}
                      error={this.state.error}/>
            </View>
        );
    }
}

export default connect(null, {resetPassword})(ForgotPassword);
