import React from 'react';
import {ScrollView, Alert, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import styles from "./styles";
import Form from "../../../../components/Form";
import {getUser, signOut} from "../../../auth/actions";
import {updateUser} from "../../actions";

const error = {
    general: "",
    name: "",
    email: "",
    phone: ""
};

class Account extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Account"
        }
    };
    state = {
        error,
        isFetching: false,
        isReady: false
    };

    constructor(props) {
        super(props);

        console.log(props);

        this.fields = [
            {
                key: 'name',
                label: "Name",
                placeholder: "Name",
                autoFocus: false,
                secureTextEntry: false,
                value: props.user.name,
                type: "text"
            },
            {
                key: 'email',
                label: "Email",
                placeholder: "Email",
                autoFocus: false,
                secureTextEntry: false,
                value: props.user.email,
                type: "email"
            },
            {
                key: 'phone',
                label: "Phone",
                placeholder: "Phone",
                autoFocus: false,
                secureTextEntry: false,
                value: props.user.phone,
                type: "phone"
            }
        ];
    }

    componentWillMount() {
        this.props.dispatch(getUser(this.props.user)).then(() => {
            this.setState({
                isReady: true
            });
        });
    }

    onSignOut = () => {
        this.props.dispatch(signOut()).catch(this.onSignOutError);
    };

    onSignOutError = (error) => {
        Alert.alert('Oops!', error.message);
    };

    onProfileSubmit = (data) => {
        this.setState({
            error, //clear out error messages
            isFetching: true
        });

        const user = Object.assign({}, this.props.user, data);

        this.props.dispatch(updateUser(user)).then(() => {
            this.setState({isFetching: false});
            this.dropdown.alertWithType('success', 'Account saved!', "");
        }, this.onProfileError);
    };

    onProfileError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({
            error: errObj,
            isFetching: false
        });
    };

    render() {
        const {isReady, isFetching, error} = this.state;

        if (!isReady) {
            return null;
        }

        return (
            <ScrollView style={styles.container}>
                <DropdownAlert ref={ref => this.dropdown = ref} zIndex={1000}/>
                <Form fields={this.fields}
                      showLabel={true}
                      isFetching={isFetching}
                      onSubmit={this.onProfileSubmit}
                      buttonTitle={"Save"}
                      error={error}/>
                <RNButton title={"Log Out"} onPress={this.onSignOut}/>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        signOut,
        updateUser,
        getUser
    };
}

export default connect(mapStateToProps)(Account);