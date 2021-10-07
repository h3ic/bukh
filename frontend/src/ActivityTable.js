import Items from "./Items";
import {UsersRow} from "./TableElements";


function ActivityTable(props) {

    const selectedActivity = props.selectedActivity;
    const activityUsers = props.users.filter(user => selectedActivity.users_id.includes(user.user_id));
    const activityItems = props.items.filter(item => selectedActivity.items_id.includes(item.item_id));

    return (
        <div className="activity-table">
            <h2>{selectedActivity && selectedActivity.activity_name}</h2>
            <table>
                <thead>
                <UsersRow users={activityUsers}/>
                </thead>
                <tbody>
                <Items activity={props.selectedActivity}
                       users={activityUsers}
                       items={activityItems}
                       handleCheckboxClick={props.handlePurchaseClick}/>
                </tbody>
            </table>
        </div>
    )
}

export default ActivityTable;