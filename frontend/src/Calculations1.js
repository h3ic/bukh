// separate logic and make uniform total/debt rows
// async?
function ActivityExpenses(props) {
    const activities = props.activities;
    // const items = props.items;
    const users = props.users;

    let activityExpenses = Object.fromEntries(activities.map(activity => [activity, 0]));
    let totalUserExpenses = Object.fromEntries(users.map(userID => [userID, 0]));

    for (const activity of activities) {

        let activityExpensesPerUser = Object.fromEntries(activity.users_id.map(userID => [userID, 0]));

        for (const item of activity.items) {
            activityExpenses[activity.activity_id] += item.item_price;
        }
        // totalexpensesperuser
        const partialExpense = activityExpenses[activity.activity_id] / activity.users_id.length;
        for (const userID of activity.users_id) {
            totalUserExpenses[userID] += partialExpense;
    }
    return activityExpenses;
}

    // single activity expense function

function TotalExpensesPerUser(props) {
    const activities = props.activities;
    const partyUsers = props.users;

    const partyUsersID = partyUsers && partyUsers.map(user => user.user_id);
    let totalUserExpenses = Object.fromEntries(partyUsersID.map(userID => [userID, 0]));

    for (const activity of activities) {
        // import activityExpenses
        const activityExpenses = {
            "kk": 100,
            "cc": 200
        }
        // const partialExpense = activityExpense / activityUsers.length;
    }
}

// like inside an activity?
function ActivityExpensesPerUser() {
}

function DebtPerUser() {

}
