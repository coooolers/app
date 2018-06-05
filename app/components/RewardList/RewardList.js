import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {REWARD_TYPES} from "../../modules/path/constants";
import RewardIcon from "../../modules/path/components/RewardIcon/RewardIcon";

export default class RewardList extends Component {
    static propTypes = {
        rewardConfig: Proptypes.object.isRequired,
        hasEarned: Proptypes.bool.isRequired,
        size: Proptypes.number
    };

    renderReward = (key, value) => {
        const rewardIconProps = {
            key,
            type: key,
            value,
            hasEarned: this.props.hasEarned,
            size: this.props.size || 25,
            containerStyles: {
                marginLeft: 10
            }
        };

        return <RewardIcon {...rewardIconProps}/>
    };

    render() {
        const {rewardConfig} = this.props;
        let content = [];

        if (rewardConfig[REWARD_TYPES.WORKOUT]) {
            content.push(this.renderReward(REWARD_TYPES.WORKOUT, rewardConfig[REWARD_TYPES.WORKOUT]));
        }

        if (rewardConfig[REWARD_TYPES.EXERCISE]) {
            content.push(this.renderReward(REWARD_TYPES.EXERCISE, rewardConfig[REWARD_TYPES.EXERCISE]));
        }

        if (rewardConfig[REWARD_TYPES.TERM]) {
            content.push(this.renderReward(REWARD_TYPES.TERM, rewardConfig[REWARD_TYPES.TERM]));
        }

        if (rewardConfig[REWARD_TYPES.XP]) {
            content.push(this.renderReward(REWARD_TYPES.XP, rewardConfig[REWARD_TYPES.XP]));
        }

        return content.map(c => c);
    }
}