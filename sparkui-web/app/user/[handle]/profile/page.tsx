import React from 'react'

interface UserProfilePageProps {
    params: {
        handle: string
    }
}

const ProfilePage: React.FC<UserProfilePageProps> = ({ params }) => {
    return (
        <div className='profile-page'>
            <h1>Profile Page</h1>
            <p>Handle: {params.handle}</p>
        </div>
    )
}

export default ProfilePage
