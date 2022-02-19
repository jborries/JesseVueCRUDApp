<template>
<div class="card mt-4">
<!--originally had this wrapped in a form tag. Because I have the form set to reactive on the userCreate and Edit pages (which both caused mutations to the data),
a new populate table query would fire to get ALL the users. The screen would flash for a second with the filtered results, then do a full load again.-->
<table class="table m-0">
  <thead>
    
    <tr>
      
      <th colspan="3" scope="col" style="text-align: center">CHOOSE A FIELD TO SEARCH</th>
      <!--Learned something new, colspan "merges" cells (or extends a cell out) similar to how excel does a cell merge-->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <select v-model="searchColumn" id="search" class="form-control">
          <option class="form-control" value="" disabled selected>Click here to choose a field to search on:</option>
          <option class="form-control" value="lastName">Last Name</option>
          <option class="form-control" value="city">City</option>
          <option class="form-control" value="state">State</option>
        </select>
      </td>
      <td>
        <input v-model="searchKeyword" id="searchTextField" class="form-control" maxlength="20" placeholder="Type in your search keyword"/>
      </td>
      <td>

        <button class="btn btn-success" style="" @click="sendSearchData()">
            Search Contacts
        </button>
        <button class="btn btn-warning" style="margin-left: 10px;" @click="resetList()">
          <!--CSS hell above. Trying to space out the buttons without making the bootstrap column adjust wider on its own-->
            Reset the Page
        </button>
        <a href="https://www.youtube.com/watch?v=eBGIQ7ZuuiU" target="_blank">
        <button class="btn btn-primary" style="margin-left: 10px;" @click="resetList()" link>
          <!--CSS hell above. Trying to space out the buttons without making the bootstrap column adjust wider on its own-->
            Feeling Lucky?
        </button>
        </a>

        <!--Alternatively for the reset link above, could have just reloading the page -->
      </td>
    </tr>
  </tbody>
</table>

</div>


<!-- Was going to use this form plus the reactive page, but it caused a ton of issues when I mutated the list
<form @submit.prevent="onSubmit">
    <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Last Name</th>
          <th scope="col">City</th>
          <th scope="col">State</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td><input v-model="form.lastName" id="searchLastName" class="form-control" maxlength="20"/></td>
          <td><input v-model="form.city" id="searchCity" class="form-control"/></td>
          <td><input v-model="form.state" id="searchState" class="form-control" maxlength="2" placeholder="Two Character Format"/></td>
          <td>
            This button had a type="submit" originally in order for it to hit the onSubmit
            
            <button class="btn btn-success mt-3" @click="sendSearchData('lastName', 'Jones')">
            Search
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</form>
-->

</template>

<script>

export default {
    name: 'SearchPage',
    setup() {

    },
    data() {
      return {
        searchColumn: '',
        searchKeyword: ''
      }
    },
    components: {
     // UserList
    },
    props: {
      //searchObject: Object 
      //searchColumn: '',
      //searchKeyword: '' 
     // searchColumn: String,
     // searchKeyword: String,
    },
    methods: {
    sendSearchData() {
        let _searchColumn = this.searchColumn
        let _searchKeyword = this.searchKeyword
        console.log("sendSearchData was hit")
        //console.log("searchColumn is " + var1)
       // console.log("searchKeyword is " + var2)
        this.$emit('receiveSearchData', _searchColumn, _searchKeyword); //Emit sends data to the parent page
    },
    resetList() {
      console.log("hit resetList()")
      let column = "lastName"
      let order = "desc" 
      this.$emit('resetList', column, order)     
    }
   
   /*searchContacts(column, searchKeyword) {
      this.users.people = searchFirestoreContacts(column, searchKeyword)
        }    
    }
    */
  }
}
</script>
