import hasPermission from "./utils/hasPermission";
import requestPermission from "./utils/requestPermission";
import getToken from "./utils/getToken";
import send from "./utils/send";
import scheduleDailyReminder from "./utils/scheduleDailyReminder";
import cancelDailyReminder from "./utils/cancelDailyReminder";

export default {
    hasPermission,
    requestPermission,
    getToken,
    send,
    scheduleDailyReminder,
    cancelDailyReminder
}