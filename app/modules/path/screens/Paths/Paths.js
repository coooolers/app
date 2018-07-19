import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import PathItem from "../../components/PathItem/PathItem";
import ScreenInfoDrawer from "../../../../components/ScreenInfoDrawer";
import {fetchPaths} from "../../actions";
import {fetchPathCategories} from "../../../pathCategories/actions";

class PathsScreen extends React.Component {
    state = {
        isReady: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: null,
            title: "Paths"
        }
    };

    componentWillMount() {
        Promise.all([
            this.props.dispatch(fetchPaths()),
            this.props.dispatch(fetchPathCategories())
        ]).then(() => {
            this.setState({isReady: true});
        });
    }

    goToPath = (path) => {
        this.props.navigation.navigate("Path", {path});
    };

    renderCategory = (categoryUid) => {
        const {paths, pathCategories} = this.props;
        const category = pathCategories.byId[categoryUid];

        return (
            <View key={categoryUid} style={styles.category}>
                <Text style={styles.categoryTitle}>{category.title.toUpperCase()}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        category.pathOrder.map(pathUuid => {
                            const path = paths.byId[pathUuid];
                            return (
                                <PathItem
                                    key={path.uid}
                                    onPress={this.goToPath}
                                    path={path}
                                    pathProgress={this.props.pathProgress}/>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.categoryDivider}/>
            </View>
        )
    };

    render() {
        const {isReady} = this.state;
        const {pathCategories, screenConfig} = this.props;

        if (!isReady) return null;

        return (
            <View style={styles.container}>
                <ScreenInfoDrawer uid={"paths"}
                                  title={screenConfig.infoDrawerTitle}
                                  text={screenConfig.infoDrawerText}/>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {pathCategories.order.map(this.renderCategory)}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        paths: state.pathsReducer,
        pathCategories: state.pathCategoriesReducer,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {},
        screenConfig: state.screensReducer.screens.Paths
    };
}

export default connect(mapStateToProps)(PathsScreen);