<template>
  <div class="card card-body mt-4">
    <h3>Edit users</h3>
    <form @submit.prevent="update">

      <div class="form-group">
        <label>First Name</label>
        <input v-model="form.firstName" class="form-control" required maxlength="20" />
      </div>

      <div class="form-group mt-3">
        <label>Last Name</label>
        <input v-model="form.lastName" class="form-control" requried maxlength="20" />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>
        <input
          v-model="form.email"
          class="form-control"
          type="email"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label>Street Address</label>
        <input v-model="form.address" class="form-control" requried maxlength="80"/>
      </div>

      <div class="form-group mt-3">
        <label>City</label>
        <input v-model="form.city" class="form-control" requried />
      </div>

       <div class="form-group mt-3">
        <label>State</label>
        <input v-model="form.state" class="form-control" requried maxlength="2"/>
      </div>

      <div class="form-group mt-3">
        <label>Postal Code</label>
        <input v-model="form.postalCode" class="form-control" placeholder="5 Digit Postal Code Please" requried maxlength="5" pattern="[0-9]*"/>
      </div>

      <div class="form-group mt-3">
        <label>Phone Number</label>
        <input v-model="form.phoneNumber" type="number" class="form-control" placeholder="111-222-3333" maxlength="10" requried />
      </div>

      <button type="submit" class="btn btn-primary  mt-3">
        Update
      </button>
      <router-link :to="`/`">
        <button class="btn btn-primary  mt-3" style="float: right">
          Back
        </button>
      </router-link>

    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/firebase'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)

    const form = reactive({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', postalCode: '', phoneNumber: '' })
    onMounted(async () => {
      const user = await getUser(userId.value)
      console.log(user, userId.value)
      form.firstName = user.firstName
      form.lastName = user.lastName
      form.email = user.email
      form.address = user.address
      form.city = user.city
      form.state = user.state
      form.postalCode = user.postalCode
      form.phoneNumber = user.phoneNumber
    })

    const update = async () => {
      await updateUser(userId.value, { ...form })
      router.push('/')
      form.firstName = ''
      form.lastName = ''
      form.email = ''
      form.address = ''
      form.city = ''
      form.state = ''
      form.postalCode = ''
      form.phoneNumber = ''
    }

    return { form, update }
  }
}
</script>
