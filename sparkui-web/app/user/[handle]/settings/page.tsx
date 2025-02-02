import React from 'react'

interface UserSettingsPageProps {
    params: {
        handle: string
    }
}

const ProfilePage: React.FC<UserSettingsPageProps> = ({ params }) => {
    return (
        <div className='profile-page'>
            <h1>Settings Page</h1>
            <p>Handle: {params.handle}</p>
        </div>
    )
}

export default ProfilePage
