import React from 'react';
import {ScrollView, View, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import styles from "./styles";
import Form from "../../../../components/Form";
import {getUser, signOut} from "../../../auth/actions";
import {updateUser} from "../../actions";

const DEFAULT_ERROR = {
    general: "",
    name: "",
    email: "",
    phone: ""
};

class Account extends React.Component {
    state = {
        error: DEFAULT_ERROR,
        isFetching: false,
        isReady: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Account"
        }
    };

    constructor(props) {
        super(props);

        this.fields = [
            {
                key: 'name',
                placeholder: "Name",
                autoFocus: false,
                secureTextEntry: false,
                autoCapitalize: 'none',
                value: props.user.name,
                type: "text"
            },
            {
                key: 'email',
                placeholder: "Email",
                autoFocus: false,
                secureTextEntry: false,
                autoCapitalize: 'none',
                value: props.user.email,
                type: "email"
            },
            {
                key: 'phone',
                placeholder: "Phone",
                autoFocus: false,
                secureTextEntry: false,
                autoCapitalize: 'none',
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
        this.props.navigation.navigate('Auth');
        this.props.dispatch(signOut());
    };

    onProfileSubmit = (data) => {
        this.setState({error: DEFAULT_ERROR, isFetching: true});

        const user = Object.assign({}, this.props.user, data);

        this.props.dispatch(updateUser(user)).then(() => {
            this.setState({isFetching: false});
            this.dropdown.alertWithType('success', 'Account saved!', "");
        }, this.onProfileError);
    };

    onProfileError = (error) => {
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
        if (!this.state.isReady) {
            return null;
        }

        return (
            <ScrollView style={styles.container}>
                <DropdownAlert ref={ref => this.dropdown = ref} zIndex={1000}/>
                <View style={styles.content}>
                    <Form fields={this.fields}
                          onSubmit={this.onProfileSubmit}
                          buttonTitle={"Save"}
                          isFetching={this.state.isFetching}
                          error={this.state.error}/>
                    <RNButton title={"Log Out"} onPress={this.onSignOut}/>
                </View>
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