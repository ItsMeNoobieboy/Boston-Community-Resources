<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/opportunities">Opportunities</router-link></li>
      <li><router-link to="/volunteer">Volunteer</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </nav>
  <router-view />
    <!-- <footer>
    An Immigrant Family Services Institute (ISFI) service.
    Information based on your location: {{ latitude }}°, {{ longitude }}°
  </footer> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup(){
  }
});
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  position: relative;
  background-color: lightgray;
}
div {
padding-bottom: 2vh;
}
nav {
  background-color: #eee;
  padding: 5px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.2vw;
}
nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
nav li {
  margin: 0px 10px;
}
nav a {
  text-decoration: none;
  color: black;
}
.router-link-exact-active {
  font-weight: bold;
  color: rgb(55, 125, 247);
}
/* it brock :(
  footer{
  background-color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2vh;
  text-align: center;
  color: rgb(55, 125, 247);
  border-top: 2px solid black;
  /* make the footer never go above the bottom of the page * /
  position: absolute;
  bottom: 0;
  width: 100%;
} */
</style>
