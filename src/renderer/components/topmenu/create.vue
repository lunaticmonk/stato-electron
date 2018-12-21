<template>
    <div class="ui very padded segment" id="create_org">
        <!-- <router-link to="/dashboard">Back</router-link> -->
		<div class="ui header">Create organization</div>
        <topmenu></topmenu>
        <div class="ui message" style="display: none" id="create_org_message">
            <i class="close icon"></i>
            <div class="header"></div>
            <p></p>
        </div>
		<div class="ui form padded">
			<div class="field">
				<label>name</label>
				<input type="text" placeholder="Sugar Labs" name="organization_name"/>
			</div>
			<div class="field">
				<label>url</label>
				<input type="text" placeholder="https://sugarlabs.com" name="url"/>
			</div>
			<div class="ui submit button" v-on:click="submit">Submit</div>
		</div>
	</div>
</template>

<script>
require("dotenv").config();
import axios from "axios";
import Store from "electron-store";
import topmenu from './topmenu';

const store = new Store();

export default {
    name: "create-org",
    components: {
        topmenu
    },
	methods: {
		async submit(event) {
			event.preventDefault();
			const user = store.get("user");
			const userId = user.uuid;
            console.log(`Creating org. passing admin uuid: ${userId}`);

			const data = {
				name: document.querySelector('input[name="organization_name"]').value,
				url: document.querySelector('input[name="url"]').value,
				admin: userId
			};
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const result = await axios.post(
				`${process.env.API_BASE}/admin/organizations/create`,
				data,
				config
			);
			const { data: resultData } = result;
			if (!resultData.success) {
				// org could not be created
				console.log(`error while creating an org: ${resultData.message}`);
				$("#create_org_message").css("display", "block");
				$("#create_org_message").addClass("negative");
				$("#create_org_message .header").html("Error");
				$("#create_org_message p").html(resultData.data.message);

				setTimeout(() => {
					$("#create_org_message").css("display", "none");
				}, 2000);
			} else {
				console.log(resultData.data);
				// org created. next.
				console.log(`Org created: ${resultData.data}`);
				$("#create_org_message").css("display", "block");
				$("#create_org_message").addClass("positive");
				$("#create_org_message .header").html("Success");
				$("#create_org_message p").html(
					resultData.message +
						". Please check the Manage section to manage the organization."
				);

				setTimeout(() => {
					$("#create_org_message").css("display", "none");
					this.$router.push({ path: "/manage" });
				}, 2000);
			}
		}
	}
};
</script>

