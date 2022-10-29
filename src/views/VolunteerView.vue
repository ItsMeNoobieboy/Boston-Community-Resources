<template>
    <div class="volunteer">
        <h1>Help Us Help Families!</h1>
        <p class="blurb">The volunteer process is very simple. Simply complete the form below to contribue to our database of ideas
		 and opportunities for recent immigrants. The longitude and latitude allow us to match your entries to specific groups.
		  Submissions should be local resources to help immigrants integrate into their new home. If you are available to meet with a new immigrant to help introduce them to the community, consider selecting "Contact" under Resource Type- your contact information will be shared with new immigrants in your area. Thank you. </p>
		<form @submit.prevent="sendData()">
			<label>Resource Type</label>
			<select v-model="resource">
				<option>Event</option>
				<option>Local Store</option>
				<option>Organization</option>
                <option>Contact</option>
				<option>Other</option>
			</select>
			<label data-desc="Name">Resource Name:</label>
			<input />
			<label data-desc="Latitude" data-validation="int">Resource Latitude:</label>
			<input />
			<label data-desc="Longitude" data-validation="int">Resource Longitude:</label>
			<input />
      		<label v-if="resource != 'Other'" data-desc="Description">Brief Blurb About resource:</label>
			<input v-if="resource != 'Other'"/>
			<label v-if="resource == 'Other'" data-desc="Explanation">Explanation of resource:</label>
			<input v-if="resource == 'Other'"/>
          	<label v-if="resource != 'Contact'" data-desc="Contact" data-validation="optional">Contact information (optional- for questions about this resource):</label>
			<input v-if="resource != 'Contact'"/>
			<div v-if="resource == 'Event'">
				<label data-desc="date">Date and time:</label>
				<input />
			</div>
			<div v-if="resource == 'Local Store'">
				<label data-desc="Store Name">Store Name:</label>
				<input />
				<label data-desc="Store Address">Store Address:</label>
				<input />
                <label data-desc="Store Website" data-validation="optional">Store Website:</label>
				<input />
			</div>
			<div v-if="resource == 'Organization'">
				<label data-desc="Org. Name">Organization Name:</label>
				<input />
				<label data-desc="Org. Adress">Organization Address:</label>
				<input />
                <label data-desc="Org. Website" data-validation="optional">Organization Website:</label>
				<input />
			</div>
            <div v-if="resource === 'Contact'">
                <label data-desc="Email" data-validation="optional">Email (optional)</label>
                <input />
                <label data-desc="Phone" data-validation="optional">Phone (optional)</label>
                <input />
            </div>
            <div v-if="resource == 'Event'">
                <label data-desc="Website" data-validation="optional">Event website</label>
                <input />
            </div>
			<div class="submit_button">
				<button class="submit">Submit</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity'
export default {
	title: 'Volunteer - Boston Community Resources',
    setup() {
		var resource = ref("Event");
		const backendURL = "http://localhost:3000"
		var sendingData = false;
		
		const sendData = () => {
			if (sendingData) {
				return;
			}
			sendingData = true;
			let labels:any = document.querySelectorAll("label");
			let inputs:any = document.querySelectorAll("input, textarea");
			
			// make sure all fields are filled out
			for (let i = 0; i < inputs.length; i++) {
				if (inputs[i].value == "" && labels[i].dataset.validation == undefined) {
					alert("Please fill out all fields");
					return;
				}
			}

			let data:any = {};
			for (let i = 1; i < labels.length; i++) {
				data[labels[i].dataset.desc] = inputs[i-1].value;
			}
			data.resourceType = resource.value;

			fetch(backendURL + "/volunteer/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			.then(_ => {
				sendingData = false;
				location.reload()
			});
		}

		return { resource, sendData };
	}
}
</script>

<style>
.blurb {
	font-size: 1vw;
	font-family: Tahoma, Verdana, sans-serif;
	width: 70%;
	text-align: center;
    color: black
}
form {
	background-color: rgb(231, 231, 231);
	border-radius: 10px;
	padding: 10px;
	width: 50%;
	margin-top: 30px;
}
.volunteer{
	display: flex;
	flex-direction: column;
	align-items: center;
}
label {
	color: rgb(55, 125, 247);
	display: inline-block;
	margin: 25px 0 15px;
	font-size: 0.6em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
input, select, textarea {
	display: block;
	padding: 10px 6px;
	width: 100%;
	box-sizing: border-box;
	border: none;
	border-bottom: 1px solid #555;
	color: #555;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	resize: vertical;
	background-color: rgb(231, 231, 231);
}

.submit_button{
	display: flex;
	justify-content: center;
}

.submit {
	background-color: rgb(55, 125, 247);
	color: white;
	border: none;
	border-radius: 8px;
	padding: 10px;
	margin-top: 20px;
}
</style>