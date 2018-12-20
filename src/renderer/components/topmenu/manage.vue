<template>
    <div class="ui very padded segment">
        <router-link to="/dashboard">Back</router-link>
        <div class="ui header">Manage Organizations</div>
        <div v-for="(organization, index) in organizations" v-bind:key="index">
            <div class="ui segment">
                <p>{{ organization.name }}</p>
                <p>{{ organization.url }}</p>
            </div>
        </div>
    </div>
</template>

<script>
require("dotenv").config();
import axios from "axios";
import Store from "electron-store";

const store = new Store();

export default {
	name: "manage-org",
	async mounted() {
		await this.getData();
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
			console.log(`>>> Success: ${JSON.stringify(resultData)}`);
			this.organizations = resultData.data;
		}
	}
};
</script>
