import React from 'react';
import {View, Text, TouchableOpacity, DatePickerIOS, Modal} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import moment from 'moment';
import Button from "../../components/Button/Button";
import PropTypes from 'prop-types';

export default class NotificationTimePicker extends React.Component {
    defaultMinuteInterval = 15;

    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        initialDate: PropTypes.any
    };

    constructor(props) {
        super(props);

        this.state = {
            notificationDate: props.initialDate ? new Date(props.initialDate) : moment().hour(18).minutes(0).seconds(0).toDate(), // 6:00 PM,
            datePickerIsOpen: false,
            minuteInterval: this.defaultMinuteInterval
        };
    }

    onNotificationDateChange = (notificationDate) => {
        this.setState({notificationDate});
    };

    onConfirmDatePress = () => {
        this.setState({datePickerIsOpen: false});
        this.props.onSelect(this.state.notificationDate);
    };

    onDateInputPress = () => {
        this.setState({datePickerIsOpen: true});
    };

    onModalShow = () => {
        // update interval after date picker has mounted
        this.setState({minuteInterval: this.defaultMinuteInterval});
    };

    render() {
        const {notificationDate, datePickerIsOpen, minuteInterval} = this.state;

        return (
            <View>
                <TouchableOpacity onPress={this.onDateInputPress}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>{moment(notificationDate).format('h:mm A')}</Text>
                        <FontAwesome style={styles.timeLabelIcon}>{Icons.chevronDown}</FontAwesome>
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={datePickerIsOpen}
                    onShow={this.onModalShow}
                >
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Button title={"CONFIRM"}
                                    raised={false}
                                    onPress={this.onConfirmDatePress}
                                    containerViewStyle={{padding: 0, margin: 0, borderRadius: 0, width: '100%'}}
                                    buttonStyle={{width: '100%', margin: 0, borderRadius: 0}}
                            />
                            <DatePickerIOS
                                mode={"time"}
                                minuteInterval={minuteInterval}
                                date={notificationDate}
                                onDateChange={this.onNotificationDateChange}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}