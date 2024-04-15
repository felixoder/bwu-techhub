import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import {Link} from 'react-router-dom'
import OAuth from './OAuth';

export default function SignIn() {


  return (
    <div className='min-h-screen mt-20 mx-auto'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              BWU-CSE
            </span>
            TechHub
            
          </Link>
          <p className='text-sm mt-5'>
            For Security purpose you should authenticate with your University mail id
           
          </p><p className='text-sm mt-5 text-blue-500 font-semibold'>
           This is not an official product of Brainware University. Rather I, Debayan had built this project to help the CSE department of our beloved University
           
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <OAuth/>

          </form>
          
        
        </div>
      </div>
    </div>
  );
}