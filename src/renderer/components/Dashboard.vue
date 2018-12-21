<template>
<div class="ui very padded segment">
	<h2 class="ui header">Dashboard</h2>
	<topmenu></topmenu>
</div>
</template>

<script>
import topmenu from './topmenu/topmenu';

export default {
	name: "signup-page",
	components: {
		topmenu
	}
};
</script>
