import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/common/Breadcrumb'
import WelcomeHeader from '../../components/common/WelcomeHeader'
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar6,
  modal_connection,
  modal_event,
  modal_joblisting,
  modal_ordertracking,
} from '../../assets/images'
import {
  IconEdit,
  IconCircleCheckFilled,
  IconClockHour9,
  IconMapPin,
  IconPlus,
  IconLogin2,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export default function InstitutionManagement() {

  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ]

  const [connectionRequestModal, setConnectionRequestModal] = useState(false)
  const ConnectionRequestModal = () => {
    setConnectionRequestModal(!connectionRequestModal)
  }
  useEffect(() => {
    document.body.classList[connectionRequestModal ? "add" : "remove"]("overflow-hidden")
  }, [connectionRequestModal])

  const [createEventModal, setCreateEventModal] = useState(false)
  const openCreateEventModal = () => {
    setCreateEventModal(!createEventModal)
  }
  useEffect(() => {
    document.body.classList[createEventModal ? "add" : "remove"]("overflow-hidden")
  }, [createEventModal])

  const schools = [
    {
      id: 1,
      name: 'ABC High School',
      logo: avatar1,
      location: 'New York, USA',
      students: 300,
      teachers: 20,
    },
    {
      id: 2,
      name: 'XYZ College',
      logo: avatar2,
      location: 'Los Angeles, USA',
      students: 400,
      teachers: 25,
    },
    {
      id: 3,
      name: 'DEF Academy',
      logo: avatar3,
      location: 'Chicago, USA',
      students: 250,
      teachers: 15,
    },
    {
      id: 4,
      name: 'GHI University',
      logo: avatar4,
      location: 'San Francisco, USA',
      students: 350,
      teachers: 22,
    },
  ]
  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb breadcrumbItem={breadcrumbItem} />
        <button
          onClick={openCreateEventModal}
          className="flex gap-1 btn btn-light-primary"
        >
          <IconPlus />
          <span className="md:block hidden">New School</span>
        </button>
      </div>

      {/* <WelcomeHeader /> */}
      <div className='py-10 md:px-10 mt-2 px-[7px] bg-card-color rounded-lg'>
        <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
          <div className='flex justify-between items-start gap-4'>
            <div>
              <h5 className='text-[20px]/[30px] font-medium'>
                Schools Listing
              </h5>
              {/* <p className="text-font-color-100 small">If you are going to use a passage of Lorem Ipsum, you need</p> */}
            </div>
            {createEventModal &&
              <>
                <div className={`fixed p-15 w-full max-w-[800px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[6]`}>
                  <div className='py-10 md:px-10 px-[7px] bg-card-color rounded-lg shadow-shadow-lg'>
                    <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
                      <div className='text-[24px]/[30px] font-medium mb-2'>
                        Create Event
                      </div>
                      <div className='text-font-color-100 mb-6'>
                        All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary
                      </div>
                      <div className='form-control mb-15'>
                        <label htmlFor='campaignsTitle' className='form-label'>
                          Campaigns Title
                        </label>
                        <input type='text' id='campaignsTitle' placeholder='Campaigns Title' className='form-input' />
                      </div>
                      <div className="form-control mb-15 flex flex-col">
                        <label className='form-label'>Campaigns Description</label>
                        <textarea className="form-textarea" placeholder="Leave a comment here" rows="3"></textarea>
                      </div>
                      <div className='grid sm:grid-cols-3 grid-cols-1 gap-10 mb-1'>
                        <div className="form-control">
                          <label htmlFor='campaignsDate' className='form-label'>Date</label>
                          <input type="date" id='campaignsDate' className="form-input" placeholder="Select Date" />
                        </div>
                        <div className="form-control">
                          <label htmlFor='campaignsTime' className='form-label'>Time</label>
                          <input type="time" id='campaignsTime' className="form-input" placeholder="Select Time" />
                        </div>
                        <div className='form-control'>
                          <label htmlFor='campaignsDuration' className='form-label'>
                            Duration
                          </label>
                          <input type='text' id='campaignsDuration' placeholder='1h 45m' className='form-input' />
                        </div>
                      </div>
                      <p className="text-[14px]/[20px] text-font-color-100 flex gap-5 mb-15">
                        <IconCircleCheckFilled className='w-[16px] h-[16px] min-w-[16px] mt-[2px]' />
                        This event will take place on the july 14, 2022 form 02:30 PM untill 05:15 PM
                      </p>
                      <div className='grid sm:grid-cols-2 grid-cols-1 gap-10 mb-15'>
                        <div className='form-control'>
                          <label htmlFor='campaignsLocation' className='form-label'>
                            Location
                          </label>
                          <input type='text' id='campaignsLocation' placeholder='Location' className='form-input' />
                        </div>
                        <div className='form-control'>
                          <label htmlFor='campaignsLocation' className='form-label'>
                            Add guests
                          </label>
                          <div className="form-control flex">
                            <input type="text" className="form-input !rounded-r-none" placeholder="Recipient's username" />
                            <button className="btn btn-outline-secondary !border-border-color !rounded-l-none" type="button">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='form-control mb-15 flex gap-2 items-center'>
                        <label className='form-label'>
                          Participate :
                        </label>
                        <Link to="#">
                          <img src={avatar1} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
                        </Link>
                        <Link to="#">
                          <img src={avatar2} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
                        </Link>
                        <Link to="#">
                          <img src={avatar3} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
                        </Link>
                        <Link to="#">
                          <img src={avatar4} width="26" height="26" alt='chat profile' className='w-[26px] h-[26px] min-w-[26px] border border-body-color rounded-md saturate-50 hover:saturate-100' />
                        </Link>
                      </div>
                      <div className='form-control mb-15'>
                        <label className='form-label'>
                          Set reminder
                        </label>
                        <div className='relative w-full flex'>
                          <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
                            <div className="form-radio">
                              <input
                                type="radio"
                                id="campaignsEmail"
                                name="campaignsReminder"
                                className="form-radio-input"
                              />
                              <label className="form-radio-label" htmlFor="campaignsEmail">Email</label>
                            </div>
                            <div className="form-radio">
                              <input
                                type="radio"
                                id="campaignsStack"
                                name="campaignsReminder"
                                className="form-radio-input"
                              />
                              <label className="form-radio-label" htmlFor="campaignsStack">Stack</label>
                            </div>
                          </div>
                          <input type='text' className='form-input !rounded-s-none' />
                        </div>
                      </div>
                      <div className='flex items-stretch gap-5'>
                        <button onClick={openCreateEventModal} className='btn btn-secondary'>
                          Close
                        </button>
                        <button className='btn btn-primary'>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div onClick={openCreateEventModal} className={`contents-[] fixed z-[5] w-full h-full left-0 top-0 bg-black-50 backdrop-blur-[5px]`}></div>
              </>
            }
          </div>
          <ul className="flex flex-col md:gap-8 gap-6 mt-6">
            {schools?.length > 0 && schools?.map((item, index) => (
              <li className="flex sm:items-center sm:gap-4 gap-2 sm:flex-row flex-col" key={index}>
                <img src={item?.logo || ""} alt="user profile" className='rounded-md w-[36px] h-[36px] min-w-[36px]' />
                <div className='flex-grow'>
                  <h6 className="font-medium">{item?.name || ""}</h6>
                  {/* <p className="text-font-color-100 small">21 mutual connections Sr. ReatJs Developer at Facebook</p> */}
                </div>
                <div className="flex items-stretch gap-2">
                  <button className="btn btn-light-primary">
                    <IconEdit className='w-[18px] h-[18px] min-w-[18px]' />
                    <span className='md:block hidden'>Edit</span>
                  </button>
                  <button className="btn btn-light-danger">
                    <IconLogin2 className='w-[18px] h-[18px] min-w-[18px]' />
                    <span className='md:block hidden'>Login</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
