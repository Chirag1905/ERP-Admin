import React, { useEffect, useState } from 'react'
import WelcomeHeader from '../../../components/common/WelcomeHeader'
import Breadcrumb from '../../../components/common/Breadcrumb'
import CampaignBody from './CampaignBody'

export default function Campaign() {

    const breadcrumbItem = [
        {
            name: "App",
        },
        {
            name: "My Campaigns",
        },
    ]

    const [campaignsModal, setCampaignsModal] = useState(false)
    const openCampaignsModal = () => {
        setCampaignsModal(!campaignsModal)
    }
    useEffect(() => {
        document.body.classList[campaignsModal ? "add" : "remove"]("overflow-hidden")
    }, [campaignsModal])

    return (
        <>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <WelcomeHeader income />
            <CampaignBody openCampaignsModal={openCampaignsModal} campaignsModal={campaignsModal} />
        </>
    )
}
