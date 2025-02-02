import React from 'react'

interface AppLayoutProps {
    children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div>
            <h1>App Layout</h1>
            {children}
        </div>
    )
}

export default AppLayout
