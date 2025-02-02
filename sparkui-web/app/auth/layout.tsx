import React from 'react'

interface AuthLayout {
    children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayout> = ({ children }) => {
    return (
        <div>
            <h1>Auth Layout</h1>
            {children}
        </div>
    )
}

export default AuthLayout
