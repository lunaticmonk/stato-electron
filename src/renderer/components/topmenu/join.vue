<template>
    <div class="ui very padded segment">
        <div class="ui header">Join Organization</div>
        <topmenu></topmenu>

		<div class="ui segment bg-primary">
			<div class="ui message" style="display: none" id="join_org_message">
				<i class="close icon"></i>
				<div class="header"></div>
				<p></p>
			</div>

			<div class="ui form padded">
				<div class="field">
					<label>invite key</label>
					<input type="text" placeholder="607a83a0-86ef-4f4e-ad43-7e5fff7c09d8" name="organization_invite_key"/>
				</div>
				<div class="ui submit button bg-primary-dark" v-on:click="submit">Submit</div>
			</div>
		</div>
    </div>
</template>

<script>
require("dotenv").config();
import axios from "axios";
import Store from "electron-store";
import topmenu from "./topmenu";
import { updateUserOrgStatus } from '../../utils';

const store = new Store();

export default {
	name: "join-org",
	components: {
		topmenu
	},
	async mounted() {},
	data() {
		return {
			organizations: null
		};
	},
	methods: {
		async submit() {
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const user = store.get("user");
			const data = {
				uuid: user.uuid,
				invite_key: $("input[name='organization_invite_key']").val()
			};
			const result = await axios.post(
				`${process.env.API_BASE}/organizations/join`,
				data,
				config
			);
			const { data: resultData } = result;
			if (resultData.success) {
                // here result data is sending user password too.
                // modify the api to return user public info only.

                console.log(resultData);

				store.set('currentOrganizationId', resultData.data.organization_id);
				updateUserOrgStatus(resultData.data.organization_id, "online");

				$("#join_org_message")
					.css("display", "block")
					.addClass("success");
				$("#join_org_message p").html(resultData.message);
				setTimeout(() => {
					$("#join_org_message")
						.removeClass("success")
						.css("display", "none");
				}, 2000);
			} else {
				$("#join_org_message")
					.css("display", "block")
					.addClass("error");
				$("#join_org_message p").html(resultData.message);
				setTimeout(() => {
					$("#join_org_message")
						.removeClass("error")
						.css("display", "none");
				}, 2000);
			}
		}
	}
};
</script>
