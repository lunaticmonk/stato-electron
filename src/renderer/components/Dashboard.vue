<template>
<div class="ui very padded segment">
	<div class="ui header">Dashboard</div>
	<topmenu></topmenu>

	<select class="ui dropdown">
		<option value="">Organization</option>
		<option v-for="(organization, index) in organizations" v-bind:key="index" :value="organization.uuid">
			{{ organization.name }}
        </option>
	</select>
</div>
</template>

<script>
import topmenu from "./topmenu/topmenu";
import axios from "axios";
import Store from "electron-store";

const store = new Store();

export default {
	name: "signup-page",
	components: {
		topmenu
	},
	async mounted() {
        this.organizations = await this.getOrganizations();
    },
	data() {
		return {
			organizations: null
		};
    },
	methods: {
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
				/**
				 * Error. returning empty array.
				 */
				console.log(`Error loading user organizations.`);
				return [];
			}
			/**
			 * Success. returning data.
			 */
			console.log(`Success loading user organizations.`);
            return resultData.data;
		}
	}
};
</script>
