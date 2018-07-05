import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import {updateUser} from "../../actions";
import Notifications from "../../../../modules/notifications";
import moment from 'moment';
import Button from "../../../../components/Button/Button";
import Reporting from "../../../reporting";
import NotificationTimePicker from "../../../../components/NotificationTimePicker";

class OnboardingNotifications extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            notificationDate: moment().hour(18).minutes(0).seconds(0).toDate(), // 6:00 PM,
            notificationsEnabled: false
        };
    }

    onNotificationDateSelect = (notificationDate) => {
        this.setState({notificationDate});
    };

    finishOnboarding = async () => {
        const {user} = this.props;
        const {notificationsEnabled, notificationDate} = this.state;
        user.hasCompletedOnboarding = true;
        user.notificationsEnabled = notificationsEnabled;
        user.notificationDate = notificationsEnabled ? notificationDate : null;
        user.pushToken = await Notifications.getToken();

        this.props.dispatch(updateUser(user)).then(() => {
            this.props.navigation.navigate('Main');
        });
    };

    onEnableNotificationsPress = async () => {
        try {
            await Notifications.requestPermission();
            this.setState({notificationsEnabled: true});
            Reporting.track("onboarding_notification_accepted");
            Notifications.scheduleDailyReminder(this.state.notificationDate);
            await this.finishOnboarding();
        } catch (error) {
            this.setState({notificationsEnabled: false});
            Reporting.track("onboarding_notification_cancelled", {message: error.message});
            await this.finishOnboarding();
        }
    };

    onSetupLaterPress = async () => {
        Reporting.track("onboarding_notification_skipped");
        await this.finishOnboarding();
    };

    render() {
        const {screenConfig} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <FontAwesome style={styles.icon}>{Icons.bellO}</FontAwesome>
                    <Text style={styles.title}>{screenConfig.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.dailyAtLabel}>Remind me daily at </Text>
                        <NotificationTimePicker onSelect={this.onNotificationDateSelect}/>
                    </View>
                    <Button title={screenConfig.buttonText}
                            onPress={this.onEnableNotificationsPress}
                            containerViewStyle={{
                                width: 250,
                                marginTop: 40
                            }}
                    />
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={this.onSetupLaterPress}>
                        <Text style={styles.notNowLabel}>{screenConfig.setupLaterText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        screenConfig: state.screensReducer.screens.OnboardingNotifications
    }
}

export default connect(mapStateToProps)(OnboardingNotifications);