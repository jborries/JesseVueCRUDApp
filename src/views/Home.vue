<template>
  <UserCreate />
  <UserList />
</template>

<script>
import UserCreate from '@/components/UserCreate.vue'
import UserList from '@/components/UserList.vue'

export default {
  name: 'Home',
  components: { UserCreate, UserList }
  //CaPiTaLiZaTiOn mAtTeRs - Accidentally capitalized components and it broke everything. That's an hour of my life I'll never get back
}
</script>
