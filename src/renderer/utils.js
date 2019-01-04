"use strict";

import Store from "electron-store";

const store = new Store();

function updateUserOrgStatus(organizationId, status) {
	const currentUserStatuses = store.get("currentUserStatuses");

	if (currentUserStatuses === undefined) {
		store.set("currentUserStatuses", []);
	}

	let currentOrganizationStatus = currentUserStatuses.find(userStatus => {
		return userStatus.organizationId === organizationId;
	});

	if (currentOrganizationStatus !== undefined) {
		let indexOfCurrentOrganizationStatus = currentUserStatuses.indexOf(
			currentOrganizationStatus
		);
		currentUserStatuses[indexOfCurrentOrganizationStatus] = {
			organizationId,
			status
		};
	} else {
		currentUserStatuses.push({
			organizationId,
			status
		});
	}
	store.set("currentUserStatuses", currentUserStatuses);
	console.log(
		`>>> Updated the store after joining: ${JSON.stringify(
			store.get("currentUserStatuses")
		)}`
	);
}

function updateUserState(userId) {
	const lastOrganization = store.get("currentOrganizationId");
    const currentUserStatuses = store.get("currentUserStatuses");

	const allUsersStates = store.get("allUsersStates");

	if (allUsersStates === undefined) {
		store.set("allUsersStates", []);
	}

	let currentUserState = allUsersStates.find(userState => {
		return userState.uuid === userId;
	});

	if (currentUserState !== undefined) {
		let indexOfCurrentUserState = allUsersStates.indexOf(currentUserState);
		allUsersStates[indexOfCurrentUserState] = {
			uuid: userId,
			lastOrganization,
			currentUserStatuses
		};
	} else {
		allUsersStates.push({
			uuid: userId,
			lastOrganization,
			currentUserStatuses
		});
	}
    store.set("allUsersStates", allUsersStates);
    console.log(`--------- logging out --------------`);
    console.log(`${JSON.stringify(allUsersStates)}`);
    console.log(`-----------------------`);
}

function getUserState(userId) {
	const allUsersStates = store.get("allUsersStates");
	if (allUsersStates !== undefined && allUsersStates.length > 0) {
		let currentUserState = allUsersStates.find(userState => {
			return userState.uuid === userId;
		});
		console.log(`>>>> Returning: ${JSON.stringify(currentUserState)}`);
		return currentUserState;
	} else {
		store.set("allUserStates", []);
		console.log(`>>>> Returning empty array`);
		return [];
	}
}

export { updateUserOrgStatus, updateUserState, getUserState };
