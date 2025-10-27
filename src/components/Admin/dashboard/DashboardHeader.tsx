import React from 'react'
import type { SchoolData } from '../../../types/partner-school.types'

interface DashboardHeaderProps {
    user: SchoolData
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
    const currentDate = new Date()
    console.log(currentDate)
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin ({user.name ? user.name : ''})</h1>
            <p className="text-gray-600 mt-1">{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
    )
}
