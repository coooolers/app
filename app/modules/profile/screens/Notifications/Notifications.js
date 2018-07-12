import React from 'react';
import {View, Text, Switch, AppState} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import {updateUser} from "../../actions";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NotificationTimePicker from "../../../../components/NotificationTimePicker";
import Notifications from "../../../../modules/notifications";
import moment from "moment/moment";

class NotificationsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Notifications"
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            notificationDate: props.user.notificationDate || moment().hour(18).minutes(0).seconds(0).toDate(),
            notificationsEnabled: props.user.notificationsEnabled,
            displayAppSettingsError: false
        }
    }

    async componentWillMount() {
        this.checkForPermissions();

        AppState.addEventListener('change', async (appState) => {
            if (appState === 'active') {
                this.checkForPermissions();
            }
        });
    }

    checkForPermissions = async () => {
        const {user} = this.props;
        const hasPermission = await Notifications.hasPermission();

        this.setState({
            hasPermission,
            notificationsEnabled: hasPermission && user.notificationsEnabled,
            displayAppSettingsError: !hasPermission && user.notificationsEnabled
        });
    };

    onNotificationDateSelect = async (notificationDate) => {
        const {user} = this.props;
        const hasPermission = await Notifications.hasPermission();

        if (hasPermission) {
            user.notificationDate = notificationDate;
        } else {
            try {
                await Notifications.requestPermission();
                user.notificationsEnabled = true;
                user.notificationDate = notificationDate;
            } catch (error) {
                user.notificationsEnabled = false;
            }
        }

        this.setState({
            notificationsEnabled: hasPermission && user.notificationsEnabled,
            notificationDate: user.notificationDate
        });

        this.props.dispatch(updateUser(user));
    };

    onSwitchValueChange = async (value) => {
        const {user} = this.props;
        const hasPermission = await Notifications.hasPermission();
        let displayAppSettingsError = false;

        if (value === true && hasPermission) {
            user.notificationsEnabled = true;
            user.notificationDate = this.state.notificationDate;
            user.pushToken = await Notifications.getToken();
        } else if (value === true && !hasPermission) {
            try {
                await Notifications.requestPermission();
                user.notificationsEnabled = true;
                user.notificationDate = this.state.notificationDate;
                user.pushToken = await Notifications.getToken();
            } catch (error) {
                user.notificationsEnabled = false;
                displayAppSettingsError = true;
            }
        } else if (value === false) {
            user.notificationsEnabled = false;
        }

        if (user.notificationsEnabled) {
            Notifications.scheduleDailyReminder(user.notificationDate);
        } else {
            Notifications.cancelDailyReminder();
        }

        this.setState({
            notificationsEnabled: user.notificationsEnabled,
            displayAppSettingsError
        });

        this.props.dispatch(updateUser(user));
    };

    render() {
        const disabledText = this.state.displayAppSettingsError ?
            <Text style={styles.disabledText}>Enable notifications in your app settings</Text> : null;

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <MaterialCommunityIcon name="bell-ring-outline" style={styles.icon}/>
                    <Text style={styles.title}>
                        We use notifications to send you reminders that help you build healthy habits.
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.dailyAtLabel}>Remind me daily at </Text>
                        <NotificationTimePicker initialDate={this.state.notificationDate}
                                                onSelect={this.onNotificationDateSelect}/>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomContent}>
                        <Text style={styles.remindMeLabel}>Remind me</Text>
                        <View>
                            <Switch value={this.state.notificationsEnabled}
                                    onValueChange={this.onSwitchValueChange}/>
                        </View>
                    </View>
                    {disabledText}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    };
}

export default connect(mapStateToProps)(NotificationsScreen);