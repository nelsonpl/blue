
import firebase from "firebase";

export default {
  post(model) {
    
    var userUid = firebase.auth().currentUser.uid;

    model.userUid = userUid;

    if(model.id == null){
        firebase.firestore().collection('task').add(model)
          .catch((reason)=>{})
          .then((value) => {}, (reason) => {})
          .finally(()=>{});
    }
    else {
      firebase.firestore().collection('task').doc(model.id).update(model)
        .catch((reason)=>{})
        .then((value) => {}, (reason) => {})
        .finally(()=>{});
    }
  },
  get() {
  },
  getAll(fnc) {

    var userUid = firebase.auth().currentUser.uid;

    var query = firebase.firestore().collection('task').where('userUid', '==', userUid).limit(50);

    var unsubscribe = query.onSnapshot(
      //onNext 
      (snapshot) => {
          snapshot.docChanges().forEach(function (change) {
            var entity = change.doc.data();
            entity.id = change.doc.id;
            fnc(entity);
        });
      },
      //onError
      (error) =>{ 
      },
      //onCompletion
      () => { });

      // setTimeout(()=>{  
      //   unsubscribe();
      // }, 60000);
    

  },
  del(id){
    firebase.firestore()
    .collection('task')
    .doc(id)
    .delete()
    .catch((reason)=>{
    })
    .then((value) => {
    }, (reason) => {
    })
    .finally(()=>{
    });
  }
};