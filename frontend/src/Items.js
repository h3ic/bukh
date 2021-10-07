import {HeaderRowCell, RowCell, PurchaseRadioButton, TotalRow} from "./TableElements";
import {calcActivityUserExpenses} from "./Calculations";


function ItemRow(props) {
    let checkboxes = [];
    for (const userID of props.activityUsersID) {
        checkboxes.push(<PurchaseRadioButton key={props.itemID.toString() + userID.toString()}
                                             handleCheckboxClick={props.handleCheckboxClick}
                                             activityID={props.activityID}
                                             itemID={props.itemID}
                                             userID={userID}
                                             defaultChecked={userID === props.itemBoughtBy}/>);
    }
    return (
        <tr>
            <HeaderRowCell key={props.itemName} value={props.itemName}/>
            {checkboxes}
            <RowCell key={props.itemID} value={props.itemPrice}/>
        </tr>
    );
}


function Items(props) {
    const activityUsersExpenses = calcActivityUserExpenses(props.users, props.items);
    let itemsRows = [];

    for (const item of props.items) {
        const itemID = item.item_id;
        const itemName = item.item_name;
        const itemBoughtBy = item.bought_by;
        const itemPrice = item.item_price;
        itemsRows.push(<ItemRow key={itemID}
                                activityID={props.activity.activity_id}
                                itemID={itemID}
                                itemName={itemName}
                                itemBoughtBy={itemBoughtBy}
                                itemPrice={itemPrice}
                                activityUsersID={props.activity.users_id}
                                handleCheckboxClick={props.handleCheckboxClick}
        />);
    }

    itemsRows.push(<TotalRow key={-1} rowName={'Total'} expenses={activityUsersExpenses}/>)

    return itemsRows;
}

export default Items;