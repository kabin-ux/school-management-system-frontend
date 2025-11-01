import React, { useState } from 'react'
import { useResetSuperAdminPassword } from '../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    const navigate = useNavigate();
    const resetPasswordMutation = useResetSuperAdminPassword();

    const handleNewPassword = (token: string, id: string, password: string) => {
        resetPasswordMutation.mutate({ token, id, password, confirmPassword }, {
            onSuccess: () => navigate('/super-admin-login')
        })
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none mb-4"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none mb-4"
                />
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => navigate('/super-admin-login')}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleNewPassword(token ? token : '', id ? id : '', password)}
                        className="px-4 py-2 rounded-lg bg-[#E6F242] text-white font-semibold hover:bg-[#dbe465]"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    )
}
