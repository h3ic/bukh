function UserCell(props) {
    return <th>{props.value.toString()}</th>
}

export function UsersRow(props) {
    const users = props.users;
    return (
        <tr>
            <th>X</th>
            {users.map(user => <UserCell key={user.user_id} value={user.username}/>)}
            <th><i>Expenses</i></th>
        </tr>
    );
}

export function TotalRow(props) {
    const usersExpensesEntries = Object.entries(props.expenses);
    return (
        <tr>
            <th><i>{'Total' && props.rowName}</i></th>
            {usersExpensesEntries.map(expense => <RowCell key={expense[0]} value={expense[1]}/>)}
        </tr>
    );
}

export function HeaderRowCell(props) {
    return <th>{props.value.toString()}</th>
}

export function ActivityRowCell(props) {
    const handleClick = () => {
        props.handleActivityClick(props.activityID);
    }
    return <th>
        <button className="activity-button" onClick={handleClick}>{props.value.toString()}</button>
    </th>
}

export function RowCell(props) {
    return <td>{props.value.toString()}</td>
}

/**
 * Returns a checkbox used in PartyTable
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function ParticipationCheckbox(props) {
    const handleClick = (e) => {
        // options for refactoring right away?
        if (props.userHasItemsPurchased) {
            alert('Cannot remove user from activity: user has items purchased')
            e.preventDefault();
            return;
        }
        props.handleCheckboxClick(e, props.activityID, props.userID);
    }
    return <td><input className="check-button"
                      type="checkbox"
                      defaultChecked={props.defaultChecked}
                      onClick={handleClick}/></td>
}

/**
 * Returns a radio button used in ActivityTable
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function PurchaseRadioButton(props) {
    const handleClick = () => {
        props.handleCheckboxClick(props.itemID, props.userID);
    }
    return <td><input className="check-button"
                      type="radio"
                      name={props.itemID}
                      defaultChecked={props.defaultChecked}
                      onClick={handleClick}/></td>
}