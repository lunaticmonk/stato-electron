<template>
  <div id="signup">
  <div class="ui hidden divider"></div>
    <div class="ui raised very padded text container segment">
      <h2 class="ui header">Sign up</h2>
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
        <p>Don't have an account. Log in <router-link to="/">here</router-link></p>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "signup-page",
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style>
</style>
