import React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";


class ProfileNavigation extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Profile"
        }
    };

    goToNotifications = () => {
        this.props.navigation.push("ProfileNotifications");
    };

    goToAccount = () => {
        this.props.navigation.push("ProfileAccount");
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.goToNotifications}>
                    <View style={[styles.rowContainer, {borderTopWidth: 1}]}>
                        <Text style={styles.rowTitle}>Notifications</Text>
                        <MaterialCommunityIcon name="chevron-right" style={styles.rowIcon}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.goToAccount}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.rowTitle}>Account</Text>
                        <MaterialCommunityIcon name="chevron-right" style={styles.rowIcon}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    };
}

export default connect(mapStateToProps)(ProfileNavigation);