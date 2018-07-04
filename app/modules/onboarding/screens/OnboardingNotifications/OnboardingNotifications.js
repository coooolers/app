import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, DatePickerIOS, Modal} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import {updateUser} from "../../actions";
import Notifications from "../../../../modules/notifications";
import moment from 'moment';
import Button from "../../../../components/Button/Button";
import {color} from "../../../../styles/theme";
import Reporting from "../../../reporting";

class OnboardingNotifications extends React.Component {
    defaultDate = moment().hour(18).minutes(0).seconds(0).toDate(); // 6:00 PM

    state = {
        notificationDate: this.defaultDate,
        datePickerIsOpen: false,
        minuteInterval: null,
        notificationsEnabled: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        }
    };

    onNotificationDateChange = (notificationDate) => {
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
        this.setState({notificationsEnabled: true});

        try {
            await Notifications.requestPermission();
            Reporting.track("onboarding_notification_accepted");
            Notifications.scheduleDailyReminder(this.state.notificationDate);
            await this.finishOnboarding();
        } catch (error) {
            Reporting.track("onboarding_notification_cancelled", {message: error.message});
            await this.finishOnboarding();
        }
    };

    onSetupLaterPress = async () => {
        Reporting.track("onboarding_notification_skipped");
        await this.finishOnboarding();
    };

    onDateInputPress = () => {
        this.setState({datePickerIsOpen: true});
    };

    render() {
        const {notificationDate, datePickerIsOpen} = this.state;
        const {screenConfig} = this.props;
        const datePicker = datePickerIsOpen ? <DatePickerIOS
            mode={"time"}
            minuteInterval={this.state.minuteInterval}
            date={this.state.notificationDate}
            onDateChange={this.onNotificationDateChange}
        /> : null;

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <FontAwesome style={styles.icon}>{Icons.bellO}</FontAwesome>
                    <Text style={styles.title}>{screenConfig.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.dailyAtLabel}>Remind me daily at </Text>
                        <TouchableOpacity onPress={this.onDateInputPress}>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeLabel}>{moment(notificationDate).format('h:mm A')}</Text>
                                <FontAwesome style={styles.timeLabelIcon}>{Icons.chevronDown}</FontAwesome>
                            </View>
                        </TouchableOpacity>
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
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={datePickerIsOpen}
                    onShow={() => this.setState({minuteInterval: 15})} // update interval after date picker has mounted
                >
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 10,
                        backgroundColor: 'rgba(0,0,0,0.4)'
                    }}>
                        <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: color.brandLight
                        }}>
                            <Button title={"CONFIRM"}
                                    raised={false}
                                    onPress={() => this.setState({datePickerIsOpen: false})}
                                    containerViewStyle={{padding: 0, margin: 0, borderRadius: 0, width: '100%'}}
                                    buttonStyle={{width: '100%', margin: 0, borderRadius: 0}}
                            />
                            {datePicker}
                        </View>
                    </View>
                </Modal>
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