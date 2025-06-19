import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Logo */}
          <div>
              <img src="/loglogo.png" alt="" className='w-1/6 ' />
          </div>

                {/* Main Content */}
                <div
                    className=" rounded-3xl shadow-2xl overflow-hidden bg-cover"
                    style={{ backgroundImage: "url('/bg5.png')" }}
                >
                    <div className="flex flex-col lg:flex-row min-h-[600px] pt-8 lg:pt-0">
                        {/* Left Section - Conference Image */}
                        <div className="lg:w-1/2 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r "></div>

                            <img
                                src="Logban.jpg"
                                alt="Conference Image"
                                className=" w-[85%] h-[85%]  object-cover rounded-3xl"
                            />
                        </div>

                        {/* Right Section - Login Form */}
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-md mx-auto w-full">
                                {/* Logo and Title */}
                                <div className="mb-8">
                                    <img src="/loglogo.png" alt="" className='w-1/2 ' />

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Journey Begins</h3>
                                        <p className="text-gray-600">Log in with your email</p>
                                    </div>
                                </div>

                                {/* Login Form */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Username
                                        </div>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-trasparent backdrop-blur-sm"
                                        />
                                    </div>

                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-transparent backdrop-blur-sm"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-500"
                                            />
                                            <span className="ml-2 text-sm text-black">Remember me</span>
                                        </div>
                                        <button className="text-sm text-black hover:text-gray-800">
                                            Forgot password ?
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => console.log('Login clicked')}
                                        className="w-full bg-amber-100 hover:bg-amber-200 text-black font-semibold py-3 px-4 rounded-full transition-colors duration-200 border border-amber-200"
                                    >
                                        LOG IN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}