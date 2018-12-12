<template>
  <div id="signup">
  <div class="ui hidden divider"></div>
    <div class="ui raised very padded text container segment">
      <h2 class="ui header">Sign up</h2>
      <div class="ui form success" id="signupform">
        <div class="field">
          <label>email</label>
          <input type="email" placeholder="joe@doe.com" name="email"/>
        </div>
        <div class="field">
          <label>password</label>
          <input type="password" placeholder="*********" name="password"/>
        </div>
        <div class="field">
          <label>first name</label>
          <input type="text" placeholder="Faizal" name="first_name"/>
        </div>
        <div class="field">
          <label>last name</label>
          <input type="text" placeholder="Khan" name="last_name"/>
        </div>
        <div class="ui error message" style="display: none" id="form_error_success">
          <div class="header">Error</div>
          <p></p>
        </div>
        <div class="ui submit button" v-on:click="submit">Submit</div>
        <p>Already have an account?. Log in <router-link to="/">here</router-link></p>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
require("dotenv").config();

export default {
  name: "signup-page",
  methods: {
    async submit(event) {
      event.preventDefault();
      const data = {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
        first_name: document.querySelector('input[name="first_name"]').value,
        last_name: document.querySelector('input[name="last_name"]').value
      };
      const result = await axios.post(`${process.env.API_BASE}/signup`, data);
      const { data: resultData } = result;
      if (!resultData.success) {
        document
          .querySelector("#form_error_success")
          .setAttribute("style", "display: block");
        document.querySelector("#form_error_success p").innerHTML =
          resultData.message;
      } else {
        //   redirect user to dasshboard to create/join organization.
        // store the accessToken.
        localStorage.setItem('x-access-token', resultData.token);
        this.$router.push({ path: "dashboard" });
      }
    }
  }
};
</script>

<style>
</style>
