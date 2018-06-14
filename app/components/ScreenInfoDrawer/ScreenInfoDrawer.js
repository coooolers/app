import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';
import styles from "./styles";
import {connect} from "react-redux";
import {updateUser} from "../../modules/profile/actions";
import _ from "lodash";


class ScreenInfoDrawer extends React.Component {
    state = {
        isOpen: false
    };
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    componentWillMount() {
        this.setState({
            isOpen: !this.userHasLearned()
        })
    }

    userHasLearned = () => {
        const {user, uid} = this.props;
        return _(user.appPiecesLearned).includes(uid);
    };

    close = () => {
        const {user, uid} = this.props;
        user.appPiecesLearned = user.appPiecesLearned || [];
        user.appPiecesLearned.push(uid);
        user.appPiecesLearned = _(user.appPiecesLearned).uniq().sort().value();

        this.props.dispatch(updateUser(user));
        this.setState({isOpen: false});
    };

    render() {
        return (
            <Modal
                visible={this.state.isOpen}
                transparent={true}
                animationType={"none"}
                >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.text}>{this.props.text}</Text>
                        <View style={styles.divider}/>
                        <TouchableOpacity onPress={this.close}>
                            <Text style={styles.done}>GOT IT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    };
}

export default connect(mapStateToProps)(ScreenInfoDrawer);