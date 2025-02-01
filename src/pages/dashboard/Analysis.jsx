import React from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import {
  IconBriefcase,
  IconCash,
  IconCornerRightUp,
  IconCreditCard,
  IconUserScan,
} from '@tabler/icons-react';
import { avatar1, avatar2, avatar3 } from '../../assets/images';
import WelcomeHeader from '../../components/common/WelcomeHeader';

export default function Analysis() {
  const breadcrumbItem = [
    {
      name: "Dashboard",
    },
  ];

  const dashboardCards = [
    {
      id: 1,
      title: "Total Multischool Groups",
      image: avatar1,
      description: "21 mutual connections Sr. ReatJs Developer at Facebook",
    },
    {
      id: 2,
      title: "My Schools",
      image: avatar2,
      description: "5 mutual connections Web Designer at Google",
    },
    {
      id: 3,
      title: "All Schools",
      image: avatar3,
      description: "9 mutual connections Laravel Developer at Linkedin",
    }
  ];

  return (
    <div>
      <Breadcrumb breadcrumbItem={breadcrumbItem} />
      <WelcomeHeader report />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {dashboardCards?.map((card) => (
          <div key={card?.id} className="card bg-card-color rounded-xl p-4 relative">
            <div className='flex items-center justify-between gap-5 mb-2'>
              <p>{card?.title}</p>
              {card?.title === "Total Multischool Groups" && <IconUserScan className='stroke-primary stroke-[1.5] w-[32px] h-[32px]' />}
              {card?.title === "My Schools" && <IconCreditCard className='stroke-primary stroke-[1.5] w-[32px] h-[32px]' />}
              {card?.title === "All Schools" && <IconCash className='stroke-primary stroke-[1.5] w-[32px] h-[32px]' />}
            </div>
            <div className='flex items-end gap-1 mb-4'>
              <span className='inline-block text-[24px]/[30px] font-medium'>
                {card?.title === "Total Multischool Groups" && "4"}
                {card?.title === "My Schools" && "100"}
                {card?.title === "All Schools" && "110"}
              </span>
              <IconCornerRightUp className='stroke-font-color-100 w-[18px] h-[18px]' />
              <span className='text-font-color-100 text-[14px]/[20px]'>
                {card?.title === "Total Multischool Groups" && "13%"}
                {card?.title === "My Schools" && "13%"}
                {card?.title === "All Schools" && "78%"}
              </span>
            </div>
            <div className='progress overflow-hidden h-[2px] bg-border-color rounded-full'>
              <div className={`progress-bar ${card?.title === "Total Multischool Groups" ? "w-[85%] bg-secondary" :
                card?.title === "My Schools" ? "w-[13%] bg-primary" :
                  card?.title === "All Schools" ? "w-[70%] bg-success" : ""
                } h-full`}></div>
            </div>
            <div className='py-3 text-font-color-100 text-[14px]/[20px]'>
              Show all
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-stretch gap-6 mt-10">
        <div className="flex-1 bg-card-color rounded-xl p-6 flex flex-col">
          <p className="text-lg font-semibold mb-4">Daily Stats</p>
          <div className="flex flex-wrap justify-between gap-y-4 w-full">
            <div className="flex flex-col">
              <span className="text-font-color-100 text-[16px]/[20px]">New Multischool Groups</span>
              <span className="text-[24px]/[30px] font-medium">0</span>
            </div>
            <div className="flex flex-col">
              <span className="text-font-color-100 text-[16px]/[20px]">New Multischool Schools</span>
              <span className="text-[24px]/[30px] font-medium">0</span>
            </div>
            <div className="flex flex-col">
              <span className="text-font-color-100 text-[16px]/[20px]">New Schools</span>
              <span className="text-[24px]/[30px] font-medium">0</span>
            </div>
            <div className="flex flex-col">
              <span className="text-font-color-100 text-[16px]/[20px]">Expiring Schools</span>
              <span className="text-[24px]/[30px] font-medium">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}