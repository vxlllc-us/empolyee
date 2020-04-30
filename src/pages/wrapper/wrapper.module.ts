import * as firebase from "firebase";
import "firebase/firestore";
import { store, setSession } from "../../lib";
import * as wrapperModule from "../wrapper/wrapper.module";

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID
} = process.env;

export async function setup() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: REACT_APP_API_KEY,
      authDomain: REACT_APP_AUTH_DOMAIN,
      databaseUrl: REACT_APP_DATABASE_URL,
      projectId: REACT_APP_PROJECT_ID,
      storageBucket: REACT_APP_STORAGE_BUCKET,
      messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
      appId: REACT_APP_APP_ID
    });
  }
}

export async function sessionListener(): Promise<void> {
  if (!firebase.apps.length) {
    wrapperModule.setup();
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch(
        setSession({
          active: true,
          user
        })
      );
    } else {
      store.dispatch(
        setSession({
          active: false,
          user: null
        })
      );
    }
  });
}
