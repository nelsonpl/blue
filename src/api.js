
import firebase from "firebase";

export default {
  post(model) {
    firebase.firestore()
    .collection('persons')
    .add(model)
    .catch((reason)=>{
      console.log('add - catch: ' + reason);
    })
    .then((value) => {
      console.log('add - then value: ' + value.path);
    }, (reason) => {
      console.log('add - then reason: ' + reason);
    })
    .finally(()=>{
      console.log('add - finally');
    });;
  },
  get() {
  },
  getAll(fnc) {

    var query = firebase.firestore().collection('persons').limit(50);

    var unsubscribe = query.onSnapshot(
      //onNext 
      (snapshot) => {
        console.log('onNext'); 
          snapshot.docChanges().forEach(function (change) {
            var entity = change.doc.data();
            console.log(entity); 
            entity.id = change.doc.id;
            fnc(entity);
        });
      },
      //onError
      (error) =>{ console.error('query - error' + error); },
      //onCompletion
      () =>{ console.log('query - completion'); });

      // setTimeout(()=>{  
      //   console.info('unsubscribe');
      //   unsubscribe();
      // }, 60000);
    

  },
  del(id){
    firebase.firestore()
    .collection('persons')
    .doc(id)
    .delete()
    .catch((reason)=>{
      console.log('del - catch: ' + reason);
    })
    .then((value) => {
      console.log('del - then value: ' + value);
    }, (reason) => {
      console.log('del - then reason: ' + reason);
    })
    .finally(()=>{
      console.log('del - finally');
    });
  }
};