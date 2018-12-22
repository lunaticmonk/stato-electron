<template>
<div class="ui very padded segment">
	<div class="ui header">Dashboard</div>
	<topmenu></topmenu>
</div>
</template>

<script>
import topmenu from "./topmenu/topmenu";

export default {
	name: "signup-page",
	components: {
		topmenu
	}
};
</script>
