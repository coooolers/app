import React from 'react';
import * as Progress from 'react-native-progress';
import {Character} from "../../modules/characters/models";
import PropTypes from 'prop-types';

export default class XpBar extends React.Component {
    state = {
        progress: 0,
        animated: true
    };
    static propTypes = {
        character: PropTypes.object.isRequired,
        onLevelUp: PropTypes.func
    };

    componentWillMount() {
        const {character} = this.props;

        this.setState({
            progress: Character.percentOfLevelComplete(character)
        });
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.character && nextProps.character !== prevProps.character) {
            const nextXpProgress = Character.percentOfLevelComplete(nextProps.character);

            this.animateBar(nextXpProgress);
        }
    }

    animateBar = (newProgress) => {
        const didLevelUp = this.state.progress > newProgress;

        if (didLevelUp) {
            this.setState({progress: 1});
            this.props.onLevelUp && this.props.onLevelUp();

            setTimeout(() => {
                this.setState({progress: 0, animated: false});

                setTimeout(() => {
                    this.setState({progress: newProgress, animated: true});
                }, 250);
            }, 1500);
        } else {
            this.setState({progress: newProgress});
        }
    };

    render() {
        const {progress, animated} = this.state;
        const {
            character, // ignore character prop
            ...customBarProps
        } = this.props;
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

        return (
            <Progress.Bar
                progress={progress}
                animated={animated}
                {...barProps}
            />
        );
    }
}