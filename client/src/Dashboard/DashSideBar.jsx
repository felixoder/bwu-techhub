import { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUser, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { Link, useLocation , useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdEmojiEvents } from "react-icons/md";
import { RiMiniProgramFill } from "react-icons/ri";
import { SiEventstore } from "react-icons/si";
import { BsBrilliance } from "react-icons/bs";
import { SiGooglenews } from "react-icons/si";
import { LuNewspaper } from "react-icons/lu";
import {MdFeedback} from 'react-icons/md'
import {VscFeedback } from 'react-icons/vsc'

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();




  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        navigate('/sign-in')
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    currentUser && (

<Sidebar className=' fixed z-100'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item 
              
                icon={HiChartPie}
                as='div'>
                  Dashboard
                </Sidebar.Item>
              </Link>
            )
          }
          {currentUser && (
            <Link to='/profile'>
            <Sidebar.Item  icon={HiUser} label={currentUser.isAdmin ? 'Admin':'User'} labelColor='dark' as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          )}
          
          {currentUser && (
            <>
             <Link to='/view-hackathons'>
              <Sidebar.Item  icon={RiMiniProgramFill} as='div'>
                View Hackathons
              </Sidebar.Item>
            </Link>
            <Link to='/view-events'>
            <Sidebar.Item  icon={SiEventstore } as='div'>
              View-Events
            </Sidebar.Item>
          </Link><Link to='/view-newsletters'>
            <Sidebar.Item  icon={LuNewspaper  } as='div'>
              View-NewsLetters
            </Sidebar.Item>
          </Link><Link to='/create-feedback'>
            <Sidebar.Item  icon={MdFeedback   } as='div'>
              Create Feedback
            </Sidebar.Item>
          </Link>
            
            </>
           
          )} { currentUser.isAdmin && (
            <>
               <Link to='/create-hackathons'>
              <Sidebar.Item  icon={HiOutlineUserGroup} as='div'>
                Create-Hackathons
              </Sidebar.Item>
            </Link>
            <Link to='/create-events'>
              <Sidebar.Item  icon={MdEmojiEvents} as='div'>
                Create-Events
              </Sidebar.Item>
            </Link><Link to='/create-newsletters'>
              <Sidebar.Item  icon={SiGooglenews} as='div'>
                Create-Newsletters
              </Sidebar.Item>
            </Link><Link to='/create-toppers'>
              <Sidebar.Item  icon={BsBrilliance} as='div'>
                Add-Toppers
              </Sidebar.Item>
            </Link>
            <Link to='/view-feedback'>
            <Sidebar.Item  icon={VscFeedback    } as='div'>
              View Feedback
            </Sidebar.Item>
          </Link>
            </>
         
          )}
          {currentUser && (
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
            Sign-Out
          </Sidebar.Item>

          )}
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    )
    
  );
}
