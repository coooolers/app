import React from 'react';
import {Text, ScrollView, View, TouchableWithoutFeedback} from 'react-native';
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from 'react-native-progress';
import {getPathStepProgress, isPathIncomplete} from "../../../../components/Util";
import PropTypes from 'prop-types';

export default class PathScrollView extends React.Component {
    static propTypes = {
        paths: PropTypes.array.isRequired,
        pathProgress: PropTypes.object.isRequired,
        onPathPress: PropTypes.func.isRequired,
        onNewPathPress: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.setState({
            filteredPaths: this.getFilteredPaths()
        });
    }

    getFilteredPaths = () => {
        const {paths, pathProgress} = this.props;

        const inCompletePaths = paths.filter(p => isPathIncomplete(p, pathProgress));
        return inCompletePaths.filter(path => {
            return path.uid === "welcome" || pathProgress[path.uid];
        });
    };

    onPathPress = (path, step) => {
        this.props.onPathPress(path, step);
    };

    onNewPathPress = () => {
        this.props.onNewPathPress();
    };

    renderPath = (path) => {
        const {pathProgress} = this.props;
        const pathStepProgress = getPathStepProgress(path, pathProgress);

        return (
            <TouchableWithoutFeedback key={path.uid}
                                      onPress={() => this.onPathPress(path, pathStepProgress.step)}>
                <View style={styles.pathBox}>
                    <View style={{flex: 1}}>
                        <Text style={styles.pathBoxTitle}>{path.name}</Text>
                    </View>
                    <Text style={styles.pathBoxStatus}>
                        {pathStepProgress.current - 1} of {pathStepProgress.total}
                    </Text>
                    <Progress.Bar
                        progress={pathStepProgress.progress}
                        width={null}
                        height={3}
                        borderRadius={0}
                        borderWidth={1}
                        borderColor={'#999'}
                        unfilledColor={"rgba(255,255,255,0.5)"}
                        color={"#b82244"}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    };

    render() {
        const {filteredPaths} = this.state;

        return (
            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.container}>
                {filteredPaths.map(this.renderPath)}
                <TouchableWithoutFeedback onPress={this.onNewPathPress}>
                    <View style={[styles.pathBox, styles.newPathBox]}>
                        <Text style={styles.newPathBoxTitle}>Discover a new path</Text>
                        <MaterialCommunityIcons name="plus-circle-outline" style={styles.newPathBoxIcon}/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}