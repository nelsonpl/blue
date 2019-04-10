
import firebase from "firebase";

export default {
  post(model) {
    firebase.firestore().collection('persons').add(model);
  },
  get() {
  },
  getAll(fnc) {

    var query = firebase.firestore()
      .collection('persons')
      .limit(50);

    query.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        var entity = change.doc.data();
        entity.id = change.doc.id;
        fnc(entity);
      });
    });
  },
  del(id){
    console.log(id);
    firebase.firestore().collection('persons').doc(id).delete()
    .catch((error)=>{
      console.log('catch: ' + error);
    })
    .then(()=>{
      console.log('then');
    })
    .finally(()=>{
      console.log('finally');
    });
  }
};