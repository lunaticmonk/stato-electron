<template>
    <div class="ui very padded segment">
		<!-- put organization name beneath -->
		<!-- also will need the back router-link here rather than topmenu -->
        <!-- <div class="ui header">Manage Organization</div> -->
        <router-link to="/manage">Back</router-link>
        <!-- <topmenu></topmenu> -->
		<div>
			<div class="ui header">
				Organization Members
			</div>
			<div v-for="(member, index) in members" v-bind:key="index" class="ui segment">
				<div>
					{{ member.first_name }} {{ member.last_name }}
					<span><button class="ui mini red button right floated">remove</button></span>
				</div>
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
	name: "organization",
	components: {
		topmenu
	},
	async mounted() {
		this.members = await this.getOrganizationMembers();

	},
	data() {
		return {
			members: null
		};
	},
	methods: {
		async getOrganizationMembers() {
			const organizationId = this.$route.params.uuid;
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const result = await axios.get(
				`${
					process.env.API_BASE
				}/organizations/${organizationId}/members`,
				config
			);
			const { data: resultData } = result;
			if (resultData.success) {
				return resultData.data;
			}
			return [];
		}
	}
};
</script>
