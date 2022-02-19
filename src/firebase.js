import firebase from 'firebase'
import { ref } from 'vue'

//In a production/enterprise app, these would of course be obsfurcated and the actual values injected during the pipeline build.
const config = {
  apiKey: "AIzaSyAYrgkTTzQm6pxvGBPuG6HnLYv4JVKYty8",
  authDomain: "jesse-crud-application.firebaseapp.com",
  databaseURL: "https://jesse-crud-application-default-rtdb.firebaseio.com",
  projectId: "jesse-crud-application",
  storageBucket: "jesse-crud-application.appspot.com",
  messagingSenderId: "886897434384",
  appId: "1:886897434384:web:6dab11032d8be2777a4f95"
}

const firebaseApp = firebase.initializeApp(config)  

//The original Firebase NoSQL db, called "RealTime Database", has it's own set of documentation, but operates in a similar way. 
//When troubleshooting, it can be easy to confuse the two sets of documentation if you aren't paying attention. ::Sigh::
const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const sort = (param, direction) => {
  usersCollection.orderBy(param, direction)
  console.log(usersCollection)
}

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get()
  //const que = usersCollection.where('firstName', '==', 'jesse')
  //console.log("Blammo" + que[0] + que[1] + que[2])
 // const user = await que.get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

//Encountered an issue using this new Vue 3 where the DOM wouldn't update after I made the call to get an updated list of users.
//Part of the issue is that .value doesn't watch for mutations (per stackoverflow) and setup() composition api has some limitations. 
//Went back to using a more familiar pattern of mounting an initial loading call and setting up a standalone method that calls 
//this 'useLoadUsers'.
    //.where(searchColumn, ">=", 'A')
    //.where('state', "==", 'NY')
    //.where('city', '>', '')
    //.where(searchColumn, '==', searchKeyword)
//Firebase won't let me link multiple queries like the above, damnit

export const useLoadUsers = (column, order, searchColumn, searchKeyword) => {
  const users = ref([]) 
  var getOptions = {
   source: 'server'
   //In trying to resolve the dom update issue, setting the call to always pull from the server, not the cache
   //other option is 'cache' or 'default'
 }
 if (searchColumn != '' && searchKeyword != ''){
  //searchColumn = "lastName"
  //searchKeyword = true
  //column = 'lastName'
  //order = 'desc'
    const keywordSearch = usersCollection
    .where(searchColumn, "==", searchKeyword).orderBy(column, order).onSnapshot(getOptions, snapshot => {
      users.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })) 
     // searchKeyword = '' //clear out search params
     // searchColumn = ''
    }, (error) => {
      console.log(error)
    })
    keywordSearch
    //searchKeyword = '' //clear out search params just in case
    //searchColumn = ''
    return users
  }

  //All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on 'lastName' and 'city'
  //So, we can't perform inequality filters on multiple fields in a query. Sucks. 
  //But it makes querying efficient. The alternative is to take the data, then query it on the client side.
  //Firestore is great for numbers 
  //Querying Firestore is not as robust as SQL
  
  
  else {
    //original
    //onSnapshot is a listener that allows the page to update when changes are made. It's part of their reactive system
    //const close = usersCollection.orderBy(column, order).onSnapshot(getOptions, snapshot => {
      const close = usersCollection.orderBy(column, order).onSnapshot(getOptions, snapshot => {
        users.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })) 
        //During my research, part of the issue is that .Value does not watch for mutations
        //users.value.sort();
      }, (error) => {
        console.log(error)
      })
      close
    return users
  }
  
}

//Another fun Firebase gotcha - it forces you to create an index in Firestore before it will do any sorting. There's a convenient
//console error that let's you know what to do, but I didn't encounter this in the tutorial or docs.

//Going to add search per the Firebase documents using the standard 'where' statement that you would use in a stored proc.
//was going to set these to variables that are passed in. Default would be lastName
//.where(param, operator, value)
//.where("lastName", '==', "Stanz")



