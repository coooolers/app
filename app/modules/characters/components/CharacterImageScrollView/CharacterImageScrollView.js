import React from 'react';
import {ScrollView, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {database} from "../../../../config/firebase";
import PropTypes from 'prop-types';
import styles from "./styles";

export default class CharacterImageScrollView extends React.Component {
    static propTypes = {
        character: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired
    };

    state = {
        isReady: false,
        imageUrls: []
    };

    componentWillMount() {
        return Promise.all([
            database.ref('characterImages').once('value')
        ]).then((response) => {
            this.setState({
                isReady: true,
                imageUrls: response[0].val()
            });
        });
    }

    renderImage = (url) => {
        const {character} = this.props;
        const checkMark = url === character.imageUrl ?
            <MaterialCommunityIcon name="check-circle" style={styles.checkmark}/> : null;

        return <TouchableOpacity key={url} onPress={() => this.props.onSelect(url)}>
            <Image source={{uri: url}} style={styles.image}/>
            {checkMark}
        </TouchableOpacity>
    };

    render() {
        const {imageUrls} = this.state;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <ScrollView bounces={false} style={styles.container} horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                {imageUrls.map(this.renderImage)}
            </ScrollView>
        );
    }
}