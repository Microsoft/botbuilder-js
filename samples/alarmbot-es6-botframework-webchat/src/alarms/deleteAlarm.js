import {renderAlarms} from './showAlarms';

export function begin(context) {
    // Delete any existing topic
    context.state.conversation.topic = undefined;

    // Render list of topics to user
    const count = renderAlarms(context);
    if (count > 0) {
        // Set topic and prompt user for alarm to delete.
        context.state.conversation.topic = 'deleteAlarm';
        context.reply(`Which alarm would you like to delete?`);
    }
    return Promise.resolve();
}

export function routeReply(context) {
    // Validate users reply and delete alarm
    let deleted = false;
    const title = context.activity.text.trim();
    const list = context.state.user.alarms || [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].title.toLowerCase() === title.toLowerCase()) {
            context.replyWith('deleteAlarm', list.splice(i, 1)[0]);
            deleted = true;
            break;
        }
    }

    // Notify user of deletion or re-prompt
    if (deleted) {
        context.reply(`Deleted the "${title}" alarm.`);
        context.state.conversation.topic = undefined;
    } else {
        context.reply(`An alarm named "${title}" doesn't exist. Which alarm would you like to delete? Say "cancel" to quit.`)
    }

    return Promise.resolve();
}
