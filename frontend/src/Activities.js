import {ActivityRowCell, RowCell, ParticipationCheckbox, TotalRow} from "./TableElements";
import {calcActivityExpenses, calcTotalUsersFinance} from './Calculations';


function ActivityRow(props) {
    let checkboxes = [];
    for (const userID of props.partyUsersID) {
        const userHasItemsPurchased = props.activityItems.some(item => item.bought_by === userID);
        checkboxes.push(<ParticipationCheckbox key={props.activityID.toString() + userID.toString()}
                                               handleCheckboxClick={props.handleCheckboxClick}
                                               activityID={props.activityID}
                                               userID={userID}
                                               userHasItemsPurchased={userHasItemsPurchased}
                                               defaultChecked={props.activityUsers.includes(userID)}/>);
    }
    return (
        <tr>
            <ActivityRowCell key={props.activityName}
                             activityID={props.activityID}
                             value={props.activityName}
                             handleActivityClick={props.handleActivityClick}/>
            {checkboxes}
            <RowCell key={props.activityID} value={props.activityExpense}/>
        </tr>
    );
}

function Activities(props) {
    const partyUsersID = props.users.map(user => user.user_id);
    const activitiesExpenses = calcActivityExpenses(props.activities, props.items);
    const totalUsersFinance = calcTotalUsersFinance(props.users, props.activities, props.items, activitiesExpenses);
    const usersExpenses = totalUsersFinance.expenses;
    const usersDebt = totalUsersFinance.debt;

    let activitiesRows = [];

    for (const activity of props.activities) {
        const activityID = activity.activity_id;
        const activityName = activity.activity_name;
        const activityUsers = activity.users_id;
        // code repetition
        const activityItems = props.items.filter(item => activity.items_id.includes(item.item_id));

        activitiesRows.push(<ActivityRow key={activityID}
                                         activity={activity}
                                         activityID={activityID}
                                         activityName={activityName}
                                         activityUsers={activityUsers}
                                         activityItems={activityItems}
                                         activityExpense={activitiesExpenses[activityID]}
                                         partyUsersID={partyUsersID}
                                         handleActivityClick={props.handleActivityClick}
                                         handleCheckboxClick={props.handleCheckboxClick}
        />);
    }

    activitiesRows.push(<TotalRow key={-1} rowName={'Total'} expenses={usersExpenses}/>);
    activitiesRows.push(<TotalRow key={-2} rowName={'Debt'} expenses={usersDebt}/>);

    return activitiesRows;
}

export default Activities;