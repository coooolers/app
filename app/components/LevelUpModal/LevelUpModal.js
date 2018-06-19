import React from 'react';
import {View, Modal, Image, Text, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import styles from "./styles";
import LevelUpImage from "../../assets/images/level-up-panel.png";

export default class LevelUpModal extends React.Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        character: PropTypes.object.isRequired
    };

    close = () => {
        this.setState({isOpen: false});
    };

    render() {
        return (
            <Modal
                visible={this.state.isOpen}
                transparent={true}
                animationType={"fade"}
            >
                <TouchableWithoutFeedback onPress={this.close}>
                    <View style={styles.container}>
                        <Image source={LevelUpImage} style={styles.panelImage}/>
                        <View style={styles.panelContent}>
                            <Image source={{uri: this.props.character.imageUrl}} style={styles.characterImage}/>
                        </View>
                        <Text style={styles.closeText}>Tap to close</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}