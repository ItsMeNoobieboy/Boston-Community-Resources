<template>
  <div class="opportunities">
    <h1>Welcome to your New Home!</h1>
    <p>Closest opportunites based on your location: {{ latitude }}°, {{ longitude }}°</p>
    <table ref="ranking" class="ranking">
      <tr>
        <th>Resource Type</th>
        <th>Resource Name</th>
        <th>Description</th>
        <th>Distance</th>
        <th>More Info</th>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { noopDirectiveTransform } from '@vue/compiler-core';
import { ref } from 'vue';

export default {
  title: 'Opportunties - Boston Community Resources',
  setup(){
    var longitude = ref(localStorage.getItem('longitude') || "");
    var latitude = ref(localStorage.getItem('latitude') || "");
    var ranking = ref();
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        longitude.value = String(e.coords.longitude);
        latitude.value = String(e.coords.latitude);
        localStorage.setItem("latitude", latitude.value);
        localStorage.setItem("longitude", longitude.value);
      });
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }

    fetch("http://localhost:3000/opportunities?" + new URLSearchParams({latitude: latitude.value, longitude: longitude.value}).toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      data.forEach((element:any) => {
        let row = document.createElement("tr");
        let type = document.createElement("td");
        type.classList.add("type");
        let name = document.createElement("td");
        let desc = document.createElement("td");
        let distance = document.createElement("td");
        distance.classList.add("distance");
        let more = document.createElement("td");
        more.classList.add("more");
        type.innerText = element.resourceType;
        name.innerText = element.Name;
        desc.innerText = element.Description || element.Explanation;
        distance.innerText = String(Math.round(element.distance)) + " kilometers";
        more.innerHTML = "&#9660;";
        row.appendChild(type);
        row.appendChild(name);
        row.appendChild(desc);
        row.appendChild(distance);
        row.appendChild(more);

        let moreMenuOpen = false;

        more.addEventListener("click", () => {
          if(!more || !more.parentElement || !more.parentElement.parentElement) return;
          if(moreMenuOpen){
            moreMenuOpen = false;
            more.innerHTML = "&#9660;";
            // delete the element after the more's parent
            more.parentElement.parentElement.children[Array.from(more.parentElement.parentElement.children).indexOf(more.parentElement)+1].remove();
            return;
          }
          moreMenuOpen = true;
          more.innerHTML = "&#9650;"
          let insert = document.createElement("td");
          insert.colSpan = 5;
          insert.classList.add("moreMenu");
          // insert's innerText should be all properties on the element combined with commas and colons
          insert.innerText = Object.keys(element).map((key) => key + ": " + element[key]).join("\n");
          more.parentElement.after(insert)
        });

        ranking.value.appendChild(row);
      });
    });

    return {
      longitude,
      latitude,
      ranking
    }
  }
}
</script>

<style>
.moreMenu{
  text-align: center;
  widows: 100%;
}
.opportunities {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
table, th, td {
  border-collapse: collapse;
  border: 1px solid black;
}

table {
  width: 90%;
}

th {
  color: rgb(55, 125, 247);
  padding: 8px;
}

.type {
  width: 10%;
}

.more {
  width: 7%;
}

.distance {
  width: 10%;
}
</style>

