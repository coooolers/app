export default {
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id tempor sem. Vivamus faucibus erat sed bibendum gravida. Vestibulum pharetra massa gravida nunc feugiat mattis. Sed vel quam enim. Integer ut.",
    "difficulty": 1,
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/images%2Fwokouts%2Fwoman-bicycle-kick.jpg?alt=media&token=a1383899-2873-4bf6-b726-039f970daa7d",
    "name": "Strength Training 101",
    "steps": {
        "exercise-practice": {
            "description": "TODO",
            "name": "Exercise Practice",
            "rewards": [null, {
                "key": "exercise",
                "value": 5
            }, {
                "key": "xp",
                "value": 0
            }],
            "type": "workout",
            "uid": "exercise-practice",
            "workoutRoutine": [null, {
                "key": "squat-bodyweight",
                "quantity": 3
            }, {
                "key": "pushup",
                "quantity": 3
            }, {
                "key": "lunge",
                "quantity": 3
            }, {
                "duration": 10,
                "key": "plank"
            }, {
                "key": "jumping-jack",
                "quantity": 3
            }]
        },
        "introduction": {
            "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
            "description": "Welcome to the introduction to the beginner bodyweight path! Take a moment to listen and learn what you should expect.",
            "name": "Introduction",
            "rewards": [null, {
                "key": "xp",
                "value": 20
            }],
            "type": "audio",
            "uid": "introduction"
        },
        "muscle-fundamentals": {
            "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
            "description": "TODO",
            "name": "Muscle Fundamentals",
            "rewards": [null, {
                "key": "xp",
                "value": 20
            }],
            "type": "audio",
            "uid": "muscle-fundamentals"
        },
        "strength-training": {
            "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
            "description": "Learn what \"Strength Training\" is and why it's so effective at keeping you strong and healthy.",
            "name": "Strength Training",
            "rewards": [null, {
                "key": "term",
                "value": 1
            }, {
                "key": "xp",
                "value": 20
            }],
            "type": "audio",
            "uid": "strength-training"
        },
        "warmup": {
            "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
            "description": "TODO",
            "name": "Warm Up",
            "rewards": [null, {
                "key": "term",
                "value": 1
            }, {
                "key": "xp",
                "value": 20
            }],
            "type": "audio",
            "uid": "warmup"
        },
        "when-to-workout": {
            "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
            "description": "TODO",
            "name": "When To Workout?",
            "rewards": [null, {
                "key": "xp",
                "value": 50
            }],
            "type": "audio",
            "uid": "when-to-workout"
        }
    },
    "stepsOrder": [null, "introduction", "strength-training", "warmup", "muscle-fundamentals", "exercise-practice", "when-to-workout"],
    "uid": "beginner-bodyweight"
};