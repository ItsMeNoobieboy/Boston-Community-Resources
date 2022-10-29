<template>
  <div class="home">
    <p class="title">Welcome to Boston</p>
    <router-link to="/opportunities" class="button">Find Opportunities in Your Community</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  title: 'Boston Community Resources',
  setup(){
    
  }
});
</script>

<style>
.home {
  text-align: center;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/city.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.button {
  font-size: 3vw;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 15px;
  background-color: white;
  color: rgb(55, 125, 247);
  padding: 10px;
  transition: 0.5s ease;
  /* underline the text */
  text-decoration: underline;
}
.button:hover {
  font-size: 3.2vw;
  background-color: #eee;
}

.title{
  text-align: center;
  font-size: 7.5vw;
  font-family: Tahoma, Verdana, sans-serif;
  font-weight: bold;
  color:#eee;
  border-radius: 15px;
  padding: 20px;
  background-color: rgb(55,125,247);
}
</style>
