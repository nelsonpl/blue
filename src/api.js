
import firebase from "firebase";

export default {
  post(model) {
    firebase.firestore()
    .collection('persons')
    .add(model)
    .catch((reason)=>{
    })
    .then((value) => {
    }, (reason) => {
    })
    .finally(()=>{
    });;
  },
  get() {
  },
  getAll(fnc) {

    var query = firebase.firestore().collection('persons').limit(50);

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
    .collection('persons')
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