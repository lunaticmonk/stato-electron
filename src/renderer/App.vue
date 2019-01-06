<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
	name: "stato"
};
</script>

<style>
/* CSS */
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

* {
	color: #665f5f !important;
	font-family: "Ubuntu", sans-serif;
}

.ui.header {
	font-family: "Ubuntu", sans-serif !important;
}

.ui.button {
	font-weight: lighter !important;
	font-family: "Ubuntu", sans-serif !important;
	-webkit-box-shadow: 2px 2px 20px 2px rgba(141, 132, 138, 0.5) !important;
	-moz-box-shadow: 2px 2px 20px 2px rgba(141, 132, 138, 0.5) !important;
	box-shadow: 2px 2px 20px 2px rgba(141, 132, 138, 0.5) !important;
}

.ui.menu {
	background-color: #f8f0f8 !important;
	-webkit-box-shadow: 2px 2px 10px 2px rgba(2, 2, 10, 0.5) !important;
	-moz-box-shadow: 2px 2px 10px 2px rgba(2, 2, 10, 0.5) !important;
	box-shadow: 2px 2px 10px 0px rgba(2, 2, 10, 0.5) !important;
	border: none !important;
}

.ui.menu .item {
	font-weight: bold !important;
	color: #623358 !important;
}

.ui.segment {
	-webkit-box-shadow: 2px 2px 10px 2px rgba(2, 2, 10, 0.5) !important;
	-moz-box-shadow: 2px 2px 10px 2px rgba(2, 2, 10, 0.5) !important;
	box-shadow: 2px 2px 10px 2px rgba(2, 2, 10, 0.5) !important;
	border: none !important;
}

.ui.label {
	width: 80px;
	text-align: center;
	font-size: 0.9em !important;
	color: #665f5f !important;
}

.ui.label.bg-green {
	background-color: rgba(92, 220, 116, 0.46);
}

.ui.label.bg-yellow {
	background-color: rgba(220, 174, 92, 0.46);
}

.ui.label.bg-red {
	background-color: rgba(220, 92, 92, 0.46);
}

.ui.label.bg-blue {
	background-color: rgba(92, 92, 220, 0.46);
}

.bg-primary {
	background-color: #f8f0f8 !important;
}

.bg-primary-dark {
	background-color: #4d3f48 !important;
	color: #fff !important;
}

.bg-red {
	background-color: rgba(220, 92, 92, 0.46) !important;
}
</style>
