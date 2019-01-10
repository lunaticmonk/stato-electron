<template>
<div id="landing">
  <div class="ui hidden divider"></div>
    <div class="ui raised very padded text container segment bg-primary">
      <h2 class="ui header">Login</h2>
      <div class="ui form success">
        <div class="field">
          <label>email</label>
          <input type="email" placeholder="joe@schmoe.com" name="email"/>
        </div>
        <div class="field">
          <label>password</label>
          <input type="password" placeholder="*********" name="password"/>
        </div>
        <div class="ui error message" style="display: none" id="form_error_success">
          <div class="header">Error</div>
          <p></p>
        </div>
        <div class="ui submit button bg-primary-dark" v-on:click="submit">Submit</div>
        <p>Don't have an account. Sign up <router-link to="/signup">here</router-link></p>
        <!-- <p v-on:click="clearSavedStates" class="ui button">Clear saved states</p> -->
      </div>
    </div>
</div>
</template>

<script>
import CustomHeader from "./CustomHeader";
import axios from "axios";
import Store from "electron-store";
import { getUserState } from "../utils";

const store = new Store();

require("dotenv").config();

export default {
	name: "landing-page",
	components: { CustomHeader },
	methods: {
		clearSavedStates() {
			store.set("allUsersStates", []);
		},
		async submit(event) {
			event.preventDefault();
			const data = {
				email: document.querySelector('input[name="email"]').value,
				password: document.querySelector('input[name="password"]').value
			};

			// getItem from store here.
			// TODO:// remove below config since it is not used.
			const config = {
				headers: { "x-access-token": store.get("x-access-token") }
			};
			const result = await axios.post(`${process.env.API_BASE}/signin`, data);
			const { data: resultData } = result;
			console.log(resultData);
			if (!resultData.success) {
				document
					.querySelector("#form_error_success")
					.setAttribute("style", "display: block");
				document.querySelector("#form_error_success p").innerHTML =
					resultData.message;
			} else {
				//   redirect user to dasshboard to create/join organization.
				const currentUserSavedState = getUserState(resultData.data.user.uuid);
				console.log(
					`redirecting to the dashboard with state: ${JSON.stringify(
						currentUserSavedState
					)}`
				);
				if (currentUserSavedState && currentUserSavedState.currentUserStatuses) {
					console.log(`---------------------`);
					console.log(`currentUserSavedState !null and setting the values`);
					console.log(`${currentUserSavedState.lastOrganization}`);
					console.log(`${currentUserSavedState.currentUserStatuses}`);
					console.log(`---------------------`);
					store.set(
						"currentOrganizationId",
						currentUserSavedState.lastOrganization
					);
					store.set(
						"currentUserStatuses",
						currentUserSavedState.currentUserStatuses
					);
				}

				store.set("x-access-token", resultData.data.accessToken);
				store.set("user", resultData.data.user);
				this.$router.push({ path: "/" });
			}
		}
	}
};
</script>

<style>
</style>
