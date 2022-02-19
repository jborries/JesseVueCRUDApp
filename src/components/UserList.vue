<template>
   <!--Could have kept this as part of this page, but for consistency, moved it into its own component and called the component here
   in order to pass data in between the parent and child--> 
  <!--@receiveSearchData="searchContacts"-->
  <SearchPage 
   @receiveSearchData="searchContacts"
   @resetList="populateContactList" 
  />
  
  <!--Learned something new above - when passing variables to the component, you don't need to add it like a funciton parameter function(var1, var2). 
  Vue takes care of this and wraps the variables into the object.-->
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name<span>
            <i v-show="lastNameOrderState == 'asc'" class="bi bi-sort-alpha-down-alt" 
            @click="sortStuff('lastName')" ></i>
            <i v-show="lastNameOrderState == 'desc'" class="bi-sort-alpha-down"
            @click="sortStuff('lastName')"></i>
          </span></th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">City<span>
            <i v-show="cityOrderDirection == 'asc'" class="bi bi-sort-alpha-down-alt"
            @click="sortStuff('city')"></i>
            <i v-show="cityOrderDirection == 'desc'" class="bi bi-sort-alpha-down"
            @click="sortStuff('city')"></i>
          </span></th>
          <th scope="col">State<span>
            <i v-show="stateOrderDirection == 'asc'" class="bi bi-sort-alpha-down-alt"
            @click="sortStuff('state')"></i>
            <i v-show="stateOrderDirection == 'desc'" class="bi bi-sort-alpha-down" 
            @click="sortStuff('state')"></i>
          </span></th>
          <!--From a UI/UX standpoint, it might have been better to go with the up/down arrows <i class=bi bi-arrow-down-up"></i>, 
          but I like these composite arrows which visually show you which direction you'll be sorting if you click the icon-->
          <th scope="col">Postal Code</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>

        <!--Originally, couldn't get the data to populate...with the VUE reactive state, it wraps the data in an object of unorganized data,
        and not an array. Took a while to figure that out. Had to add a property (people) to the reactive object state (users) to make it 
        an organized array and accessible by the dom elements -->
        <tr v-for="{ id, firstName, lastName, email, address, city, state, postalCode, phoneNumber } in users.people" :key="id">
          <td>{{ firstName }}</td>
          <td>{{ lastName }}</td>
          <td>{{ email }}</td>
          <td>{{ address }}</td>
          <td>{{ city }}</td>
          <td>{{ state }}</td>
          <td>{{ postalCode }}</td>
          <td>{{ phoneNumber }} </td>
          <td>

            <router-link :to="`/edit/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                Edit
              </button>
            </router-link>
             <button class="btn btn-danger btn-sm" @click="showModal(id, firstName, lastName)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <Modal
    v-show="isModalVisible"
    :userObject="userObjectToPass"
    @close="closeModal"
  />
  <br>
  <p>Things I'd implement if I had more time: </p>
  <p>Scrubbing the data</p>
  <p>Finding a better way to search multiple params in Firestore</p>
  <p>I think the switching "A-Z" and "Z-A" toggles are slick, but they're awfully small and I want to make them larger</p>
  <p>A more friendly UX/UI layout</p>
</template>

<script>
import { useLoadUsers, deleteUser } from '@/firebase'
import Modal from './DeleteConfirmationModal.vue'
import { reactive } from '@vue/reactivity';
import SearchPage from './SearchPage.vue';

export default {
  name: 'UserList',
  setup() {
    const users = reactive({ people: [] }) 
    return { 
      users, 
      deleteUser 
    }
  },
  
  props: {
    lastName: String
    },
  components: {
    Modal,
    SearchPage
  },
  data() {
    return {
      isModalVisible: false,
      userObjectToPass: Object,
      lastNameOrderState: 'desc',
      cityOrderDirection: "desc",
      stateOrderDirection: "desc"
    };
  },
  mounted() {
      //This will start the process of initializing our values and populating the contact list
      //This is more in line with Vue version 2 patterns. This initialization and the populateContactList can probably be moved to setup()
      let column = "lastName"
      let order = "desc" 
      this.populateContactList(column, order);
  },
  methods: {
    //I'm utilizing Firebases api to sort instead of writing some javascript that will sort the array after I receive it
    populateContactList(column, order){
      let searchColumn = ''
      let searchKeyword = ''
      this.users.people = useLoadUsers(column, order, searchColumn, searchKeyword)
      this.searchObjectToPass = this.users.people
    },
    showModal(id, firstName, lastName) {
      this.isModalVisible = true;
      //Opting to pass some additional parameters so I can use them in the modal.
      this.userObjectToPass = {id, firstName, lastName};
      //this.userObjectToPass = this.users.people
    },
    closeModal() {
      this.isModalVisible = false;
    },
    deleteRecord(id){
      deleteUser(id)
      console.log('Bye Bye!') //Adding some console debugging for my sanity
    },
    sortStuff(column){
      let order = ''
      let searchColumn = ''
      let searchKeyword = ''
      if (column == 'lastName'){
        //console.log("lastNameOrderState" + " " + this.lastNameOrderState)  //For Debugging
        order = (this.lastNameOrderState == "desc") ? "asc" : "desc" //Using ternary operator to cut down on spaghetti logic
        this.lastNameOrderState = order
        //console.log("lastNameOrderState" + " " + this.lastNameOrderState)   //For Debugging
      }
      if (column == 'city'){
        order = (this.cityOrderDirection == "desc") ? "asc" : "desc" //Using ternary operator to cut down on spaghetti logic
        this.cityOrderDirection = order
      }
      if (column == 'state'){
        order = (this.stateOrderDirection == "desc") ? "asc" : "desc" //Using ternary operator to cut down on spaghetti logic
        this.stateOrderDirection = order
      }
      this.users.people = useLoadUsers(column, order, searchColumn, searchKeyword)
    },    
    //Moving this to the Search page?
    searchContacts(searchColumn, searchKeyword) {
      let column = 'lastName'
      let order = 'desc'
      console.log("searchColumn in searchContacts Function is " + searchColumn)
      console.log("searchKeyword in searchContacts Function is " + searchKeyword)
      //this.users.people = searchFirestoreContacts(column, searchKeyword)
      this.users.people = useLoadUsers(column, order, searchColumn, searchKeyword)
      console.log("Just finished loading the search contacts")
    } 
    
  }
}
</script>

<style>
.bi-arrow-down-up::before {
  margin-left: 7px;
}

.bi-sort-alpha-down-alt::before {
  color: green;
  margin-left: 7px;
}

.bi-sort-alpha-down {
color: green;
margin-left: 7px;
}
</style>
