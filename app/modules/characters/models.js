import {round} from "../../components/Util";
import LevelConfig from "../levelConfig/utils/LevelConfig";

export class Character {
    constructor(uid, user, name="My Character", imageUrl) {
        this.addedByUser = user.uid;
        this.imageUrl = imageUrl;
        this.level = 1;
        this.name = name;
        this.xp = 0;
        this.xpTotal = 0;
        this.uid = uid;
        this.created = new Date().toISOString();
    }

    static addXp(character, xpToAdded) {
        const levelConfig = LevelConfig.getForLevel(character.level);
        const isMaxLevel = !LevelConfig.getForLevel(character.level + 1);

        if (isMaxLevel) {
            return character;
        }

        const newCurrentXp = character.xp + xpToAdded;
        const xpNeededToLevelUp = levelConfig.xpNeeded;

        if (newCurrentXp >= xpNeededToLevelUp) {
            character.xp = newCurrentXp - xpNeededToLevelUp;
            character.xpTotal += xpToAdded;
            character.level += 1;
            return character;
        } else {
            character.xp += xpToAdded;
            character.xpTotal += xpToAdded;
            return character;
        }
    }

    static percentOfLevelComplete(character) {
        const levelConfig = LevelConfig.getForLevel(character.level);
        const xpNeededToLevelUp = levelConfig.xpNeeded;
        return round(character.xp / xpNeededToLevelUp, 2);
    }

    toJSON() {
        return {
            addedByUser: this.addedByUser,
            imageUrl: this.imageUrl,
            level: this.level,
            name: this.name,
            xp: this.xp,
            xpTotal: this.xpTotal,
            uid: this.uid,
            created: this.created
        }
    }
}