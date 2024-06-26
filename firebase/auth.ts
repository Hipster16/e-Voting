import auth from '@/firebase/firebaseConfig'
import { sendSignInLinkToEmail } from 'firebase/auth';

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url:'/',
    // This must be true.
    handleCodeInApp: true
  };

