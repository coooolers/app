import React from 'react';
import {View, Image, Text, Animated} from 'react-native';
import styles from "./styles";
import LevelConfig from "../../../levelConfig/utils/LevelConfig";
import RewardList from "../../../../components/RewardList";
import PropTypes from 'prop-types';
import XpBar from "../../../../components/XpBar";

export default class CharacterPanel extends React.Component {
    static propTypes = {
        character: PropTypes.object.isRequired,
        animateRewardConfig: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            animatingReward: new Animated.Value(0), // bottom
            rewardConfig: null
        };
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.animateRewardConfig && prevProps.animateRewardConfig !== nextProps.animateRewardConfig) {
            this.setState({rewardConfig: nextProps.animateRewardConfig});
            this.animateRewardNotification();
        }
    }

    renderRewardNotification = () => {
        const {animatingReward, rewardConfig} = this.state;

        if (rewardConfig) {
            return (
                <Animated.View style={[
                    styles.rewardNotificationContainer, {
                        transform: [{
                            translateY: animatingReward
                        }]
                    }]}>
                    <View style={styles.rewardNotificationContent}>
                        <RewardList rewardConfig={rewardConfig} hasEarned={false} size={18}/>
                    </View>
                </Animated.View>
            )
        }
    };

    animateRewardNotification = () => {
        const duration = 300;
        const animateIn = Animated.timing(this.state.animatingReward, {toValue: -75, duration: duration});
        const animateOut = Animated.timing(this.state.animatingReward, {toValue: 0, duration: duration});

        animateIn.start();

        setTimeout(() => animateOut.start(), 3000);
    };

    render() {
        const {character} = this.props;

        return (
            <View style={styles.container}>
                {this.renderRewardNotification()}
                <View style={styles.content}>
                    <Image style={styles.image} source={{uri: character.imageUrl}}/>
                    <View style={styles.xpContainer}>
                        <Text style={styles.nameText}>{character.name} ({character.level})</Text>
                        <XpBar character={character}/>
                        <View style={styles.xpTextContainer}>
                            <Text style={styles.xpText}>{character.xp} / {LevelConfig.getForLevel(character.level).xpNeeded}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}