import React from 'react';
import {Text, View} from 'react-native';
import {Button as RNEButton} from 'react-native-elements';
import styles from "./styles";
import * as Progress from 'react-native-progress';
import {getPathStepProgress} from "../../../../components/Util";
import PropTypes from 'prop-types';


export default class RecentPathPanel extends React.Component {
    static propTypes = {
        path: PropTypes.object.isRequired,
        pathProgress: PropTypes.object.isRequired,
        onBeginPress: PropTypes.func.isRequired,
    };

    onBeginPress = (path, step) => {
        this.props.onBeginPress(path, step);
    };

    render() {
        const {path, pathProgress} = this.props;
        const pathStepProgress = getPathStepProgress(path, pathProgress);

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.status}>
                        Step {pathStepProgress.current} of {pathStepProgress.total}
                    </Text>
                    <Text style={styles.title}>{path.name}</Text>
                    <RNEButton
                        title={"Begin"}
                        icon={{
                            type: 'material-community-icons',
                            name: 'play-arrow',
                            size: 20,
                            color: '#555'
                        }}
                        raised
                        textStyle={styles.buttonTitle}
                        buttonStyle={styles.button}
                        containerViewStyle={styles.buttonContainer}
                        onPress={() => this.onBeginPress(path, pathStepProgress.step)}
                    />
                </View>
                <View style={styles.progress}>
                    <Progress.Bar
                        progress={pathStepProgress.progress}
                        width={null}
                        height={6}
                        borderRadius={0}
                        borderWidth={0}
                        unfilledColor={"rgba(255,255,255,0.5)"}
                        color={"#b82244"}
                    />
                </View>
            </View>
        );
    }
}