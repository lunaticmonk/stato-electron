<template>
<div id="landing">
  <div class="ui hidden divider"></div>
    <div class="ui raised very padded text container segment">
      <h2 class="ui header">Login</h2>
      <div class="ui form success">
        <div class="field">
          <label>username</label>
          <input type="email" placeholder="joe@schmoe.com" />
        </div>
        <div class="field">
          <label>password</label>
          <input type="password" placeholder="*********" />
        </div>
        <!-- <div class="ui success message">
          <div class="header">Form Completed</div>
          <p>You're all signed up for the newsletter.</p>
        </div> -->
        <div class="ui submit button">Submit</div>
        <p>Don't have an account. Sign up <router-link to="/signup">here</router-link></p>
      </div>
    </div>
</div>
</template>

<script>
import CustomHeader from "./CustomHeader";

export default {
  name: "landing-page",
  components: { CustomHeader },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style>
</style>
