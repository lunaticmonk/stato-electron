<template>
<div class="ui very padded segment">
	<div class="ui grid">
		<div class="ui header six wide column">Dashboard</div>
		<div class="ui six wide column">
			<select class="ui dropdown" @change="switchCurrentOrganization" v-model="currentOrganization">
				<option disabled>Organization</option>
				<option v-for="(organization, index) in organizations" v-bind:key="index" :value="organization.uuid">
					{{ organization.name }}
				</option>
			</select>
		</div>
	</div>
	<topmenu></topmenu>

	<div class="ui segment">
		<h4>Your status: </h4>
		<select class="ui dropdown" @change="updateStatus"  v-model="currentOrganizationStatus.status">
			<option value="">Status</option>
			<option value="online">online</option>
			<option value="inactive">inactive</option>
			<option value="working">working</option>
			<option value="detox">detox</option>
		</select>
	</div>

	<!-- search bar. change layout of whole page -->
	<div class="ui segment">
		<div class="ui icon input" style="width: 100%;">
			<input type="text" placeholder="Search members..." v-on:change="searchMembers">
			<i class="search icon"></i>
		</div>
		<div class="results"></div>
	</div>

	<!-- member list -->
	<div class="ui header">Members</div>
	<div v-for="(member, index) in members" v-bind:key="index" class="ui segment">
		<div class="ui grid">
			<span class="ten wide column">{{ member.first_name }} {{ member.last_name }}</span>
			<span class="five wide column right floated">
				<span v-bind:class="getLabelClass(member.status)">{{ member.status }}
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
			currentOrganization: "",
			currentOrganizationStatus: {}
		};
	},
	async mounted() {
		this.organizations = await this.getOrganizations();
		this.members = await this.getOrganizationMembers();
		this.currentOrganization = store.get("currentOrganizationId");
		this.setStatusAccToOrganization();
	},
	methods: {
		setStatusAccToOrganization() {
			const currentUserStatuses = store.get("currentUserStatuses");
			let currentOrganizationStatus = currentUserStatuses.find(userStatus => {
				return userStatus.organizationId === this.currentOrganization;
			});
			this.currentOrganizationStatus = currentOrganizationStatus;
		},
		getLabelClass(status) {
			const statusClassMapping = {
				online: "green",
				detox: "blue",
				inactive: "yellow",
				working: "red"
			};

			return `ui label ${statusClassMapping[status]}`;
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
