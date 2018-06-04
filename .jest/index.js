import ExerciseConfig from "../app/modules/exercises/utils/ExerciseConfig";
import LevelConfig from "../app/modules/levelConfig/utils/LevelConfig";

import exerciseConfigMock from "./mocks/exerciseConfig";
import pathMock from "./mocks/path";
import levelConfigMock from "./mocks/levelConfig";

global.exerciseConfig = exerciseConfigMock;
global.path = pathMock;
global.levelConfig = levelConfigMock;

ExerciseConfig.load(global.exerciseConfig);
LevelConfig.load(global.levelConfig);