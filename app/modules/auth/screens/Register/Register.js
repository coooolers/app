import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Form from "../../../../components/Form";
import {registerWithEmailAndPassword} from "../../actions";
import styles from "./styles";

const fields = [
    {
        key: 'email',
        placeholder: "Email Address",
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
    },
    {
        key: 'confirm_password',
        placeholder: "Confirm Password",
        autoCapitalize: 'none',
        autoFocus: false,
        secureTextEntry: true,
        defaultValue: "",
        type: "confirm_password"
    }
];

const DEFAULT_ERROR = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
};

class Register extends React.Component {
    state = {
        error: DEFAULT_ERROR,
        isFetching: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Register"
        }
    };

    onSubmit = (data) => {
        this.setState({error: DEFAULT_ERROR, isFetching: true});

        const {email, password} = data;
        this.props.dispatch(registerWithEmailAndPassword(email, password)).then(() => {
            this.setState({isFetching: false});
        }, this.onError);
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
                      buttonTitle={"SIGN UP"}
                      isFetching={this.state.isFetching}
                      error={this.state.error}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Register);