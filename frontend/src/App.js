import React, {useEffect, useState} from "react";
import './App.css';
import PartyTable from "./PartyTable"
import ActivityTable from "./ActivityTable"

function App() {
    const [currParty, setCurrParty] = useState([]);
    const [currUsers, setCurrUsers] = useState([]);
    const [currActivities, setCurrActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState();
    const [currItems, setCurrItems] = useState([]);

    const loadCurrParty = () => {
        fetch('/get_recent_party')
            .then(res => res.json())
            .then(json => setCurrParty(json))
            .catch(ex => console.log(ex));
    }

    useEffect(() => {
        loadCurrParty();
        getCurrUsers();
        getCurrActivities();
        getCurrItems();
    }, []);

    const getCurrUsers = () => {
        fetch('/get_users')
            .then(res => res.json())
            .then(json => setCurrUsers(json.party_users));
    }

    const getCurrActivities = () => {
        fetch('/get_activities')
            .then(res => res.json())
            .then(json => setCurrActivities(json.activities));
    }

    const getCurrItems = () => {
        fetch('/get_items')
            .then(res => res.json())
            .then(json => setCurrItems(json.items));
    }

    const updateActivityTable = (activityID) => {
        const activity = currActivities.find(activity => activity.activity_id === activityID);
        setSelectedActivity(activity);
    }

    const handleParticipationClick = (e, activityID, userID) => {
        setCurrActivities(prevState => prevState.map(activity => {
            if (activity.activity_id === activityID) {
                const updatedUsersID = [...activity.users_id];
                e.target.checked ?
                    updatedUsersID.push(userID) :
                    updatedUsersID.splice(updatedUsersID.indexOf(userID), 1);

                // make current activity adopt changes
                if (selectedActivity && selectedActivity.activity_id === activityID) {
                    setSelectedActivity({
                            ...activity,
                            users_id: updatedUsersID
                        }
                    );
                }
                return {
                    ...activity,
                    users_id: updatedUsersID
                };
            } else return activity;
        }));
    }

    const handlePurchaseClick = (itemID, userID) => {
        setCurrItems(prevState => prevState.map(item => {
            if (item.item_id === itemID) {
                return {
                    ...item,
                    bought_by: userID
                };
            } else return item;
        }));
    }

    return (
        <div className="App">
            <div className="tables-container">
                <PartyTable users={currUsers}
                            activities={currActivities}
                            items={currItems}
                            party={currParty}
                            handleActivityClick={updateActivityTable}
                            handleParticipationClick={handleParticipationClick}/>
                {selectedActivity ? <ActivityTable users={currUsers}
                                                   selectedActivity={selectedActivity}
                                                   items={currItems}
                                                   handlePurchaseClick={handlePurchaseClick}/> :
                    <div>
                        <br/>
                        <p>select an activity</p>
                    </div>
                }
            </div>
        </div>

    );
}

export default App;