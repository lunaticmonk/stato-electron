<template>
    <div class="ui very padded segment">
        <router-link to="/manage">Back</router-link>
		<div class="ui hidden divider"></div>
		<div>

			<div class="ui segment">
				<div class="ui header underline">
					{{ this.$route.params.organizationName }}
				</div>
				<p>Invite key: <code>{{ this.$route.params.inviteKey }}</code></p>
			</div>
			<div class="ui message" id="delete_member_message" style="display:none;">
				<p></p>
			</div>
			<div class="ui small header">Members</div>
			<div v-for="(member, index) in members" v-bind:key="index" class="ui segment">
				<div>
					{{ member.first_name }} {{ member.last_name }}
					<span><button class="ui mini bg-red button right floated" v-on:click="removeUserFromOrganization(member)">remove</button></span>
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
				`${process.env.API_BASE}/organizations/${organizationId}/members`,
				config
			);
			const { data: resultData } = result;
			if (resultData.success) {
				return resultData.data;
			}
			return [];
		},
		async removeUserFromOrganization(member) {
			const organizationId = this.$route.params.uuid;
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const data = {
				user_id: member.uuid,
				organization_id: organizationId
			};
			const result = await axios({
				url: `${process.env.API_BASE}/status/remove`,
				data,
				method: "delete",
				headers: config.headers
			});
			const { data: resultData } = result;

			if (resultData.success) {
				$("#delete_member_message")
					.addClass("success")
					.css("display", "block");
				$("#delete_member_message p").html(resultData.message);

				// updating the binded model.
				this.members = await this.getOrganizationMembers(organizationId);

				// success message for 2s.
				setTimeout(() => {
					$("#delete_member_message")
						.removeClass("success")
						.css("display", "none");
				}, 2000);
			} else {
				$("#delete_member_message")
					.addClass("error")
					.css("display", "block");
				$("#delete_member_message p").html(resultData.message);

				// error message for 2s.
				setTimeout(() => {
					$("#delete_member_message")
						.removeClass("errors")
						.css("display", "none");
				}, 2000);
			}
		}
	}
};
</script>
