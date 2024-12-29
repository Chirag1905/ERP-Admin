import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import {
  IconDiamondFilled,
} from '@tabler/icons-react'

export default function References() {

  const breadcrumbItem = [
    {
      link: "Documentation",
      url: "/documentation",
    },
    {
      name: "References",
    },
  ]

  return (
    <>
      <Breadcrumb breadcrumbItem={breadcrumbItem} />
      <div className='card bg-card-color rounded-xl md:p-6 p-4'>
        <div className='flex items-center gap-10 mb-30'>
          <IconDiamondFilled />
          <p className='text-[20px]/[24px] font-medium'>
            References
          </p>
        </div>
        <div className='overflow-auto'>
          <table className='w-full min-w-[374px] table-striped text-[16px]/[24px]'>
            <tbody>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  Google font
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://fonts.google.com/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://fonts.google.com/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  ReactJS
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://reactjs.org/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://reactjs.org/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  Tailwind CSS
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://tailwindcss.com/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://tailwindcss.com/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  NPM
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://www.npmjs.com/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://www.npmjs.com/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  Swiper
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://swiperjs.com/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://swiperjs.com/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  Apex Charts
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://apexcharts.com/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://apexcharts.com/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  Tabler Icons
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://tabler.io/icons" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://tabler.io/icons
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  Pexels
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://www.pexels.com/" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://www.pexels.com/
                  </Link>
                </td>
              </tr>
              <tr>
                <td width={200} className='p-3 border-t border-border'>
                  React Data Table
                </td>
                <td className='p-3 border-t border-border'>
                  <Link to="https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--docs" target='_blank' className='text-blue transition-all duration-300 hover:text-primary'>
                    https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--docs
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
