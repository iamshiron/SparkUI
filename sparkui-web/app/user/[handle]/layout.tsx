interface UserLayoutProps {
    params: {
        handle: string
    }
    children: React.ReactNode
}

const UserLayout: React.FC<UserLayoutProps> = ({ params, children }) => {
    return (
        <div className='user-layout'>
            <h1>User Layout</h1>
            <div className='user-layout__header'>
                <p>Handle: {params.handle}</p>
            </div>
            <div className='user-layout__content'>{children}</div>
        </div>
    )
}

export default UserLayout
