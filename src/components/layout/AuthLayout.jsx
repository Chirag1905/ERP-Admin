import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import CompanyLogo from '../common/CompanyLogo'
import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandTwitterFilled, IconBrandYoutubeFilled } from '@tabler/icons-react'
import TechveinLogo from '../../assets/images/Techvein_logo.png'; // or the correct file extension

<img src={TechveinLogo} className="text-primary w-[116px] h-auto" />
export default function AuthLayout() {
    return (
        <div className='admin-wrapper min-h-svh py-6 px-4 flex items-center justify-center bg-body-color before:fixed before:w-[450px] before:h-full before:end-[18%] before:top-0 after:fixed after:w-[30px] after:h-full after:end-[18%] after:top-0 after:bg-black-50'>
            <div className='flex gap-15 w-full relative z-[1]'>
                <div className='items-center justify-center w-full lg:flex hidden'>
                    <div className='max-w-[400px]'>
                        <div className='mb-4'>
                            <img src={TechveinLogo} className="text-primary w-[116px] h-auto ml-4" />
                            <span
                                className="text-primary font-bold text-4xl w-[116px] h-auto text-center bg-transparent border-b border-transparent hover:border-gray-400 focus:outline-none focus:border-white transition-colors placeholder-gray-400"
                            >
                                Techvein Admin
                            </span>
                        </div>
                        <p className='mb-12 text-[32px]/[40px] font-medium'>
                            Build digital products with:
                        </p>
                        <div className='mb-8'>
                            <p className='text-[24px]/[30px] mb-2'>
                                All-in-one tool
                            </p>
                            <p>
                                Amazing Features to make your life easier & work efficient
                            </p>
                        </div>
                        <div className='mb-12'>
                            <p className='text-[24px]/[30px] mb-2'>
                                Easily add & manage your services
                            </p>
                            <p>
                                It brings together your tasks, projects, timelines, files and more
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-4 mb-4'>
                            <Link to="#" className='transition-all hover:text-primary'>
                                Home
                            </Link>
                            <Link to="#" className='transition-all hover:text-primary'>
                                About Us
                            </Link>
                            <Link to="#" className='transition-all hover:text-primary'>
                                FAQs
                            </Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            <Link to="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandFacebookFilled width="18" height="18" />
                            </Link>
                            <Link to="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandTwitterFilled width="18" height="18" />
                            </Link>
                            <Link to="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandGithubFilled width="18" height="18" />
                            </Link>
                            <Link to="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandYoutubeFilled width="18" height="18" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <div className='bg-card-color rounded-xl sm:p-4 p-2 max-w-[500px] w-full shadow-shadow-sm'>
                        <div className='sm:max-h-[calc(100svh-48px-32px)] max-h-[calc(100svh-48px-16px)] sm:p-4 p-3 overflow-auto cus-scrollbar'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
