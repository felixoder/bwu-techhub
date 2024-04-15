import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { name, email, photoURL } = resultsFromGoogle.user;

      // Check if the email consists of "@brainwareuniversity.ac.in"
      if (email.endsWith('@brainwareuniversity.ac.in')) {
        let displayName = name;
        if (!displayName) {
          // Generate a display name from the email
          displayName = email.split('@')[0];
        }
  
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: displayName, email, googlePhotoUrl: photoURL }),
        });
  
        const data = await res.json();
        if (res.ok) {
          dispatch(signInSuccess(data));
          toast.success('You are now in our family');
          navigate('/update');
        }
      }
      else{
        toast.error("The mail Id should be from Brainware university")
      }

     
    } catch (error) {
      console.log(error);
      toast.error('Oups better luck next time!');
    }
  };

  return (
    <>
      <Toaster />
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogleClick}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
    </>
  );
}