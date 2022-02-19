<template>
  <div class="card card-body mt-4">
  <!--PUTTING THIS IN AN ACCORDION TO MAKE THE UX A BIT CLEANER-->
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <!--Css Hell - It's "Collapsed" with a 'd' for the initial state, not "Collapse", which is the toggle -->
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        <strong>Click Here To Create A Contact</strong>
      </button>
    </h2>
    <!--Also have to remove 'show' to get it to collapse -->
    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">

        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>First Name</label>
            <input v-model="form.firstName" id="firstName" class="form-control" required maxlength="20" />
          </div>
          <div class="form-group mt-3">
            <label>Last Name</label>
            <input v-model="form.lastName" class="form-control" requried maxlength="20"/>
          </div>
          <div class="form-group mt-3">
            <label>Email</label>
            <input v-model="form.email" class="form-control" type="email" required />
          </div>
          <div class="form-group mt-3">
            <label>Street Address</label>
            <input v-model="form.address" class="form-control" requried maxlength="80" />
          </div>
          <div class="form-group mt-3">
            <label>City</label>
            <input v-model="form.city" class="form-control" requried />
          </div>
          <div class="form-group mt-3">
            <label>State</label>
            <input v-model="form.state" class="form-control" requried maxlength="2" placeholder="Two Character Format"/>
          </div>
          <div class="form-group mt-3">
            <label>Postal Code</label>
            <input v-model="form.postalCode" class="form-control" placeholder="5 Digit Postal Code Please" requried maxlength="5" pattern="[0-9]*"/>
          </div>
          <div class="form-group mt-3">
            <label>Phone Number</label>
            <input v-model="form.phoneNumber" type="tel" class="form-control" placeholder="111-222-3333 Format" maxlength="10" requried />
          </div>
          <button type="submit" class="btn btn-success mt-3">
            Create User
          </button>
          <button type="submit" class="btn btn-success mt-3" style="float: right" @click="clearForm()">
          Nope, Clear Form
          </button>
        </form>     
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>  

import { createUser } from '@/firebase'
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', postalCode: '',  phoneNumber: '' })

    const onSubmit = async () => {
      //Send the form data to the createUser firebase function
      await createUser({ ...form })

      //I'd call the clearForm() method directly, but in exploring the setup() composition api, it turns out you can't call a method directly from here     
      form.firstName = ''
      form.lastName = ''
      form.email = ''
      form.address = ''
      form.city = ''
      form.state = ''
      form.postalCode = ''
      form.phoneNumber = ''
    }

    return { form, onSubmit }
  },
  methods: {
    clearForm () {
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.email = ''
      this.form.address = ''
      this.form.city = ''
      this.form.state = ''
      this.form.postalCode = ''
      this.form.phoneNumber = ''
      //To access this reactive state, have to use 'this'
    }
  }
}

</script>

