<template>
<div class="ui very padded segment">
	<div class="ui grid">
		<div class="ui header eight wide column">Dashboard</div>
		<div class="ui six wide column">
			<select class="ui dropdown" @change="switchCurrentOrganization">
				<option value="">Organization</option>
				<option v-for="(organization, index) in organizations" v-bind:key="index" :value="organization.uuid">
					{{ organization.name }}
				</option>
			</select>
		</div>
	</div>
	<topmenu></topmenu>

	<!-- search bar. change layout of whole page -->
	<div class="ui category search">
		<div class="ui icon input">
			<input class="prompt" type="text" placeholder="Search members..." v-on:change="searchMembers">
			<i class="search icon"></i>
		</div>
		<div class="results"></div>
	</div>

	<!-- member list -->
	<div v-for="(member, index) in members" v-bind:key="index" class="ui segment">
		<div class="ui grid">
			<span class="ten wide column">{{ member.first_name }} {{ member.last_name }}</span>
			<span class="four wide column right floated"><span class="ui label green">{{ member.status }}</span></span>
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
			members: null
		};
	},
	async mounted() {
		this.organizations = await this.getOrganizations();
		this.members = await this.getOrganizationMembers();
	},
	methods: {
		async switchCurrentOrganization(event) {
			console.log(event.target.value);
			store.set('currentOrganizationId', event.target.value);
			this.members = await this.getOrganizationMembers();
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
				`${process.env.API_BASE}/organizations/${currentOrganizationId}/members`,
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
				`${process.env.API_BASE}/organizations/${currentOrganizationId}/members?name=${query}`,
				config
			);
			const { data: resultData } = result;
			this.members = resultData.data;
		}
	}
};
</script>
