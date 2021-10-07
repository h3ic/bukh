import Activities from "./Activities";
import {UsersRow} from "./TableElements";


function PartyTable(props) {

    return (
        <div className="party-table">
            <h1>{props.party.name}</h1>
            <table>
                <thead>
                <UsersRow users={props.users}/>
                </thead>
                <tbody>
                <Activities activities={props.activities}
                            items={props.items}
                            users={props.users}
                            handleActivityClick={props.handleActivityClick}
                            handleCheckboxClick={props.handleParticipationClick}/>
                </tbody>
            </table>
        </div>
    );
}

export default PartyTable;