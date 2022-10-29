<template>
  <div class="about">
    <h1>About Us</h1>
      <p class="blurb"> Our goal is to match new immigrants in the Boston area with resources to help get them settled 
        in their new communities. Our system relies on volunteer users submitting exciting opportunities, a simple process 
        which takes only minutes, and then pairs those listings with nearby immigrants. This takes very little time and requires 
        no money of the volunteer, but can greatly enhance the lives of the immigrant families. If you have any resources to add, pleaase visit the Volunteer tab to get started. If you are an immigrant and would like to access resources for your new community, please visit the Opportunities tab.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  title: 'About - Boston Community Resources',
  setup() {
    
  },
})
</script>

<style>
.about {
  /* color: rgb(55,125,247); */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
