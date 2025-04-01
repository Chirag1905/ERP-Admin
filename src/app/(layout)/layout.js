'use client';

import Link from 'next/link';
import CompanyLogo from '@/components/common/CompanyLogo';
import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandTwitterFilled, IconBrandYoutubeFilled } from '@tabler/icons-react';

export default function AuthLayout({ children }) {
    return (
        <div className='admin-wrapper min-h-svh py-6 px-4 flex items-center justify-center bg-body-color before:fixed before:w-[450px] before:h-full before:end-[18%] before:top-0 after:fixed after:w-[30px] after:h-full after:end-[18%] after:top-0 after:bg-black-50'>
            <div className='flex gap-15 w-full relative z-[1]'>
                <div className='items-center justify-center w-full lg:flex hidden'>
                    <div className='max-w-[400px]'>
                        <div className='mb-4'>
                            <CompanyLogo className="text-primary w-[116px] h-auto" />
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
                            <Link href="#" className='transition-all hover:text-primary'>
                                Home
                            </Link>
                            <Link href="#" className='transition-all hover:text-primary'>
                                About Us
                            </Link>
                            <Link href="#" className='transition-all hover:text-primary'>
                                FAQs
                            </Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            <Link href="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandFacebookFilled width="18" height="18" />
                            </Link>
                            <Link href="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandTwitterFilled width="18" height="18" />
                            </Link>
                            <Link href="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandGithubFilled width="18" height="18" />
                            </Link>
                            <Link href="#" className='w-[34px] h-[34px] rounded-full bg-border-color flex items-center justify-center text-white transition-all hover:bg-secondary'>
                                <IconBrandYoutubeFilled width="18" height="18" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <div className='bg-card-color rounded-xl sm:p-4 p-2 max-w-[500px] w-full shadow-shadow-sm'>
                        <div className='sm:max-h-[calc(100svh-48px-32px)] max-h-[calc(100svh-48px-16px)] sm:p-4 p-3 overflow-auto cus-scrollbar'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}