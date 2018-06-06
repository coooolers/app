import React from 'react';
import * as Progress from 'react-native-progress';
import {Character} from "../../modules/characters/models";
import PropTypes from 'prop-types';

export default class XpBar extends React.Component {
    static propTypes = {
        character: PropTypes.object.isRequired
    };

    render() {
        const {character, ...customBarProps} = this.props;
        const defaultBarProps = {
            width: null,
            height: 12,
            borderRadius: 0,
            borderColor: "#000000",
            borderWidth: 1,
            unfilledColor: "#ffffff",
            color: "#674ea7"
        };
        const barProps = Object.assign({}, defaultBarProps, customBarProps);
        const xpProgress = Character.percentOfLevelComplete(character);


        return (
            <Progress.Bar
                progress={xpProgress}
                {...barProps}
            />
        );
    }
}