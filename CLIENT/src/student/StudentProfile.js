import React from 'react'
import Breadcrumb from './BreadCrumb'

const StudentProfile = () => {
    return (
        <div>
            <Breadcrumb props={window.location.pathname} />
            <p>profile</p>
        </div>
    )
}

export default StudentProfile
