<template>
<div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="background:transparent">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Warning!</h5>
            <!-- Using a home grown cancel button instead of a bootstrap cancel button so we can emit to the parent page-->
                <button
                type="button"
                class="btn-close"
                @click="close"
                >
                x
                </button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this contact?
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" @click="deleteThisUser(userObject.id)">
                    Delete {{ userObject.firstName }} {{userObject.lastName}} ?
                </button>
                <!-- Using a home grown cancel button instead of a bootstrap cancel button so we can emit to the parent page-->
                <button
                type="button"
                class="btn btn-green"
                @click="close"
                >
                Don't Delete Them!
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { deleteUser } from '@/firebase'

  export default {
    name: 'Modal',
    props: {
        //Holds the id of the user we passed in from the parent, UserList.vue, page
        //If I pass the entire user object instead of just the userID, I can utilize the first and last name as a confirmation
        //userId: Number
        userObject: Object
    },
    methods: {
      close() {
        this.$emit('close');
      },
      //calls the delete function in firebase.js
      deleteThisUser: function(id) {
        //this.$emit('deleteThisUserEvent', id);
        deleteUser(id)
        this.$emit('close');
      }
    }
  }
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>