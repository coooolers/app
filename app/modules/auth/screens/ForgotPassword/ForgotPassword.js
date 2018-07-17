import React from 'react';
import {connect} from 'react-redux';
import {View, Alert} from 'react-native';
import Form from "../../../../components/Form";
import {resetPassword} from "../../actions";
import styles from "./styles";

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
                "Password Reminder Sent",
                "Check your email for the link we sent you. Use that link reset your password."
            );
            this.props.navigation.goBack();
        }, this.onError)
    };

    onError = (error) => {
        let errObj = Object.assign({}, DEFAULT_ERROR);

        if (error.hasOwnProperty("message")) {
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
