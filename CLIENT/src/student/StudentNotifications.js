import React from 'react'
import Breadcrumb from './BreadCrumb'


const StudentNotifications = () => {
    return (
        <div>
            <Breadcrumb props={window.location.pathname} />
            <h1>This is Notifications page</h1>
        </div>
    )
}

export default StudentNotifications
