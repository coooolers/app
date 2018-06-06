import React from 'react';
import {View, Image, ImageBackground, Text, Animated} from 'react-native';
import * as Progress from 'react-native-progress';
import MountainImage from "../../../../assets/images/mountains.png";
import styles from "./styles";
import {Character} from "../../../characters/models";
import LevelConfig from "../../../levelConfig/utils/LevelConfig";
import RewardList from "../../../../components/RewardList/RewardList";
import PropTypes from 'prop-types';

export default class CharacterPanel extends React.Component {
    static propTypes = {
        character: PropTypes.object.isRequired,
        animateRewardConfig: PropTypes.object
    };

    state = {
        animatingReward: new Animated.Value(0), // bottom
        rewardConfig: null
    };

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
        const xpProgress = Character.percentOfLevelComplete(character);

        return (
            <View style={styles.container}>
                {this.renderRewardNotification()}
                <ImageBackground source={MountainImage} style={styles.background}>
                    <Image style={styles.image} source={{uri: character.imageUrl}}/>
                    <View style={styles.xpContainer}>
                        <Text>{character.name} ({character.level})</Text>
                        <Progress.Bar
                            progress={xpProgress}
                            width={null}
                            height={12}
                            borderRadius={0}
                            borderColor={"#000000"}
                            borderWidth={1}
                            unfilledColor={"#ffffff"}
                            color={"#674ea7"}
                        />
                        <View style={styles.xpTextContainer}>
                            <Text
                                style={{fontSize: 10}}>{character.xp} / {LevelConfig.getForLevel(character.level).xpNeeded}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}