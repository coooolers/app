import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Form from "../../../../components/Form";
import {login} from "../../actions";
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
    },
    {
        key: 'password',
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        autoCapitalize: 'none',
        defaultValue: "",
        type: "password"
    }
];

const DEFAULT_ERROR = {
    general: "",
    email: "",
    password: ""
};

class Login extends React.Component {
    state = {
        error: DEFAULT_ERROR,
        isFetching: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Login"
        }
    };

    onForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    onSubmit = (data) => {
        this.setState({error: DEFAULT_ERROR, isFetching: true});

        const {email, password} = data;
        this.props.dispatch(login(email, password)).then(() => {
            this.setState({isFetching: false});
            this.props.navigation.navigate("AuthLoading");
        }, this.onError);
    };

    onError = (error) => {
        let errObj = Object.assign({}, DEFAULT_ERROR);

        if (error.code = AUTH_USER_NOT_FOUND_ERROR_CODE) {
            errObj["general"] = "Sorry, we can't find a user with this information. Please double check that your information is correct and try again.";
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
                      buttonTitle={"LOG IN"}
                      isFetching={this.state.isFetching}
                      error={this.state.error}
                      onForgotPassword={this.onForgotPassword}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Login);