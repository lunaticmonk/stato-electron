<template>
    <div class="ui four item menu">
		<a class="item" v-on:click="handleRouting">Home</a>
		<a class="item" v-on:click="handleRouting" name="create">Create</a>
		<a class="item" v-on:click="handleRouting" name="manage">Manage</a>
		<a class="item" v-on:click="handleRouting">Join</a>
	</div>
</template>

<script>
export default {
	name: "topmenu",
	methods: {
		handleRouting(event) {
			const { name } = event.target;
			switch (name) {
				case "create":
					$(event.target).addClass("active");
					this.$router.push({ path: "/create" });
					break;
				case "manage":
					$(event.target).addClass("active");
					this.$router.push({ path: "/manage" });
					break;
				default:
					this.$router.push({ path: "/dashboard" });
			}
		}
	}
};
</script>

