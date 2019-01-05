<template>
    <div class="ui very padded segment" style="background-color: #8f9bff">
        <!-- <router-link to="/dashboard">Back</router-link> -->
        <div class="ui header" style="color: #0043ca">Manage Organizations</div>
        <topmenu></topmenu>
        <div v-for="(organization, index) in organizations" v-bind:key="index">
            <div class="ui segment" style="background-color: #536dfe">
                <p>{{ organization.name }}</p>
                <p>{{ organization.url }}</p>
                <button class="ui button" v-on:click="showOrganizationDetail(organization)">View Details</button>
            </div>
        </div>
    </div>
</template>

<script>
require("dotenv").config();
import axios from "axios";
import Store from "electron-store";
import topmenu from "./topmenu";

const store = new Store();

export default {
	name: "manage-org",
	components: {
		topmenu
	},
	async mounted() {
		this.organizations = await this.getData();
	},
	data() {
		return {
			organizations: null
		};
	},
	methods: {
		async getData() {
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const result = await axios.get(
				`${process.env.API_BASE}/admin/organizations`,
				config
			);
			const { data: resultData } = result;
			if (!resultData.success) {
				console.log(`>>> Error: ${resultData.message}`);
			}
			console.log(`>>> Success loading orgs`);
			return resultData.data;
		},

		showOrganizationDetail(organization) {
			this.$router.push({
                name: "organization",
				params: { uuid: organization.uuid, organizationName: organization.name }
			});
		}
	}
};
</script>
