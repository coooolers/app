import React from 'react';
import {View, Text, Switch, AppState} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import {updateUser} from "../../actions";
import FontAwesome, {Icons} from 'react-native-fontawesome';
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
            notificationsEnabled: props.user.notificationsEnabled
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
            notificationsEnabled: hasPermission && user.notificationsEnabled
        });
    };

    onNotificationDateSelect = async (notificationDate) => {
        const {user} = this.props;
        const {notificationsEnabled} = this.state;
        const hasPermission = await Notifications.hasPermission();

        if (hasPermission) {
            user.notificationsEnabled = notificationsEnabled;
        } else {
            try {
                user.notificationsEnabled = await Notifications.requestPermission();
                this.setState({notificationsEnabled: true});
            } catch (error) {
                user.notificationsEnabled = false;
            }
        }

        this.setState({notificationDate: notificationDate});
        this.props.dispatch(updateUser(user));
    };

    onSwitchValueChange = async (value) => {
        const {user} = this.props;
        const hasPermission = await Notifications.hasPermission();

        user.notificationsEnabled = value && hasPermission;

        console.log(value, hasPermission, this.state.notificationDate);
        user.notificationDate = user.notificationsEnabled ? this.state.notificationDate : null;

        if (user.notificationsEnabled) {
            Notifications.scheduleDailyReminder(user.notificationDate);
        } else {
            Notifications.cancelDailyReminder();
        }

        this.setState({notificationsEnabled: user.notificationsEnabled});

        this.props.dispatch(updateUser(user));
    };

    render() {
        const disabledText = this.state.hasPermission ? null :
            <Text style={styles.disabledText}>Enable notifications in your app settings</Text>;

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <FontAwesome style={styles.icon}>{Icons.bellO}</FontAwesome>
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
                                    onValueChange={this.onSwitchValueChange}
                                    disabled={!this.state.hasPermission}/>
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