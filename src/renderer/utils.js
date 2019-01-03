"use strict";

import Store from 'electron-store';

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
    console.log(`>>> Updated the store after joining: ${JSON.stringify(store.get('currentUserStatuses'))}`);
}

export {
    updateUserOrgStatus
};