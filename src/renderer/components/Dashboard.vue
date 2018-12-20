<template>
<div class="ui raised container very padded text segment">
	<h2 class="ui header">Dashboard</h2>
	<!-- <router-link to="/">Back</router-link> -->
	<div class="ui four item menu">
		<a class="active item" v-on:click="handleRouting" name="create">Create</a>
		<a class="item" v-on:click="handleRouting">Join</a>
		<a class="item" v-on:click="handleRouting" name="manage">Manage</a>
		<a class="item" v-on:click="handleRouting">Home</a>
	</div>


</div>
</template>

<script>
export default {
	name: "signup-page",
	methods: {
		handleRouting(event) {
			const { name } = event.target;
			switch (name) {
				case "create":
					this.$router.push({ path: "/create" });
					break;
				case "manage":
					this.$router.push({ path: "/manage" });
					break;
				default:
					this.$router.push({ path: "/dashboard" });
			}
		}
	}
};
</script>
