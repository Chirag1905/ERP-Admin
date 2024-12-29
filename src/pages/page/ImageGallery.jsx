import React from 'react'
import Breadcrumb from '../../components/common/Breadcrumb'
import WelcomeHeader from '../../components/common/WelcomeHeader'
import { SlideshowLightbox } from 'lightbox.js-react'
import {
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
} from '../../assets/images'

export default function ImageGallery() {

    const breadcrumbItem = [
        {
            name: "More Pages",
        },
        {
            name: "Image Gallery",
        },
    ]

    const galleryPhotos = [
        {
            image: gallery1,
        },
        {
            image: gallery2,
        },
        {
            image: gallery3,
        },
        {
            image: gallery4,
        },
        {
            image: gallery5,
        },
        {
            image: gallery6,
        },
        {
            image: gallery7,
        },
        {
            image: gallery8,
        },
        {
            image: gallery9,
        },
        {
            image: gallery10,
        },
        {
            image: gallery11,
        },
        {
            image: gallery12,
        },
    ]

    return (
        <div>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <WelcomeHeader income />
            <div className='card rounded-xl bg-card-color p-1'>
                <SlideshowLightbox showThumbnails onOpen={() => { document.body.classList.add("overflow-hidden") }} onClose={() => { document.body.classList.remove("overflow-hidden") }} className="grid xxl:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 gap-1 group">
                    {galleryPhotos.map((item, key) => (
                        <img key={key} src={item.image} alt='gallery' className="rounded-md w-full relative transition-all group-hover:grayscale group-hover:brightness-50 hover:!grayscale-0 hover:!brightness-100" />
                    ))}
                </SlideshowLightbox>
            </div>
        </div>
    )
}
