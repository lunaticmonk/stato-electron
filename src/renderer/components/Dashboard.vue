<template>
<div class="ui very padded segment" v-if="newMember">
	<div class="ui header">Dashboard</div>
	<topmenu></topmenu>
	<div class="ui grid stackable">
		<p class="sixteen wide column">No organizations found.</p>
		<p class="sixteen wide column">
			Please join an organization with the invite key obtained from the organization admin.
		</p>
		<div class="eight wide column"><button class="ui small button" v-on:click="logout">Logout</button></div>
	</div>
</div>
<div class="ui very padded segment" v-else>
	<div class="ui grid">
		<div class="ui header six wide column">Dashboard</div>
		<div class="ui five wide column right floated">
			<button class="ui small button bg-primary-dark" v-on:click="logout">Logout</button>
		</div>
	</div>
	<topmenu></topmenu>

	<div class="ui segment">
		<h4>Status | Organization</h4>
		<select class="ui dropdown" @change="updateStatus"  v-model="currentOrganizationStatus.status">
			<option value="">Status</option>
			<option value="online">online</option>
			<option value="inactive">inactive</option>
			<option value="working">working</option>
			<option value="detox">detox</option>
		</select>
		<select class="ui dropdown" @change="switchCurrentOrganization" v-model="currentOrganization">
			<option disabled>Organization</option>
			<option v-for="(organization, index) in organizations" v-bind:key="index" :value="organization.uuid">
				{{ organization.name }}
			</option>
		</select>
	</div>

	<!-- search bar. change layout of whole page -->
	<div class="ui segment bg-primary">
		<div class="ui icon input" style="width: 100%;">
			<input type="text" placeholder="Search members..." v-on:change="searchMembers">
			<i class="search icon"></i>
		</div>
	</div>

	<!-- member list -->
	<div class="ui header">Members <span data-tooltip="Refresh" class="right floated"><i class="refresh icon" id="refreshButton" v-on:click="refreshMembers" style="cursor: pointer;"></i></span></div>
	<div v-for="(member, index) in members" v-bind:key="index" class="ui segment">
		<div class="ui grid">
			<span class="ten wide column">{{ member.first_name }} {{ member.last_name }}</span>
			<span class="five wide column right floated">
				<!-- TODO:// Add a function to get formatted date and time. -->
				<span v-bind:class="getLabelClass(member.status)" v-bind:data-tooltip="moment(member.statusUpdatedAt).format('Do MMM YYYY HH:MM:SS')" v-bind:data-position="'left center'">{{ member.status }}
				</span>
			</span>
		</div>
	</div>
</div>

</template>

<script>
import topmenu from "./topmenu/topmenu";
import axios from "axios";
import Store from "electron-store";
import { updateUserState } from "../utils";

const store = new Store();

export default {
	name: "dashboard",
	components: {
		topmenu
	},
	data() {
		return {
			organizations: null,
			members: null,
			currentOrganization: null,
			currentOrganizationStatus: {},
			newMember: false
		};
	},
	async mounted() {
		this.organizations = await this.getOrganizations();
		this.newMember = this.organizations.length > 0 ? false : true;

		/**
		 * show the dashboard only in case of old user.
		 * dont show dashboard until the user has joined any organization.
		 *
		 */
		if (!this.newMember) {
			this.currentOrganization = store.get("currentOrganizationId")
				? store.get("currentOrganizationId")
				: this.organizations[0].uuid;
			store.set("currentOrganizationId", this.currentOrganization);
			this.members = await this.getOrganizationMembers();
			this.setStatusAccToOrganization();
		}
	},
	methods: {
		logout() {
			const currentUser = store.get("user");
			updateUserState(currentUser.uuid);
			store.set("x-access-token", "");
			store.set("user", {});
			store.set("currentOrganizationId", "");
			store.set("currentUserStatuses", []);
			this.$router.push({ path: "/" });
		},
		setStatusAccToOrganization() {
			const currentUserStatuses = store.get("currentUserStatuses")
				? store.get("currentUserStatuses")
				: [];
			console.log(currentUserStatuses);
			// check if only one org. default to that.
			let currentOrganizationStatus = currentUserStatuses.find(userStatus => {
				return userStatus.organizationId === this.currentOrganization;
			});
			this.currentOrganizationStatus = currentOrganizationStatus
				? currentOrganizationStatus
				: {};
		},
		getLabelClass(status) {
			const statusClassMapping = {
				online: "bg-green",
				detox: "bg-blue",
				inactive: "bg-yellow",
				working: "bg-red"
			};

			return `ui label ${statusClassMapping[status]}`;
		},
		async refreshMembers() {
			this.members = await this.getOrganizationMembers();
		},
		async switchCurrentOrganization(event) {
			store.set("currentOrganizationId", event.target.value);
			this.members = await this.getOrganizationMembers();
			this.setStatusAccToOrganization();
		},
		async getOrganizations() {
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const result = await axios.get(
				`${process.env.API_BASE}/organizations/me`,
				config
			);
			const { data: resultData } = result;
			if (!resultData.success) {
				console.log(`Error loading user organizations.`);
				return [];
			}
			console.log(`Success loading user organizations.`);
			return resultData.data;
		},
		async getOrganizationMembers() {
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const currentOrganizationId = store.get("currentOrganizationId");
			if (currentOrganizationId === null) {
				return [];
			}
			const result = await axios.get(
				`${
					process.env.API_BASE
				}/organizations/${currentOrganizationId}/members`,
				config
			);
			const { data: resultData } = result;
			if (!resultData.success) {
				console.log(`Error loading organization members.`);
				return [];
			}
			console.log(`Success loading organization members.`);
			return resultData.data;
		},
		async searchMembers(event) {
			const query = event.target.value;
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const currentOrganizationId = store.get("currentOrganizationId");
			const result = await axios.get(
				`${
					process.env.API_BASE
				}/organizations/${currentOrganizationId}/members?name=${query}`,
				config
			);
			const { data: resultData } = result;
			this.members = resultData.data;
		},
		async updateStatus(event) {
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};

			const currentUser = store.get("user");
			const currentUserId = currentUser.uuid;
			const currentOrganizationId = store.get("currentOrganizationId");
			const status = event.target.value;

			const data = {
				user_id: currentUserId,
				organization_id: currentOrganizationId,
				status
			};
			const result = await axios.post(
				`${process.env.API_BASE}/status/update`,
				data,
				config
			);
			const { data: resultData } = result;

			/**
			 * Update store with the org-status mapping.
			 *
			 */

			let currentUserStatuses = store.get("currentUserStatuses");

			if (resultData.success) {
				/**
				 * clicking the refresh button implicitly
				 * not a good way to do it.
				 * will only show self updated status. no long polling if other users update their status.
				 *
				 * TODO:// long polling for member status.
				 *
				 */
				document.querySelector("#refreshButton").click();

				if (currentUserStatuses === undefined) {
					store.set("currentUserStatuses", []);
				}

				let currentOrganizationStatus = currentUserStatuses.find(userStatus => {
					return userStatus.organizationId === currentOrganizationId;
				});

				if (currentOrganizationStatus !== undefined) {
					let indexOfCurrentOrganizationStatus = currentUserStatuses.indexOf(
						currentOrganizationStatus
					);
					currentUserStatuses[indexOfCurrentOrganizationStatus] = {
						organizationId: currentOrganizationId,
						status: resultData.data.status
					};
				} else {
					currentUserStatuses.push({
						organizationId: currentOrganizationId,
						status: resultData.data.status
					});
				}
				store.set("currentUserStatuses", currentUserStatuses);
				console.log(
					`>>> Updated store: ${JSON.stringify(
						store.get("currentUserStatuses")
					)}`
				);
			}
		}
	}
};
</script>