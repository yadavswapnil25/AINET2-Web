import React from 'react';
import { Edit, Download, Star, Award } from 'lucide-react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Aman Shaikh</h3>
                <p className="text-gray-600">45amanshaikh@gmail.com</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Personal Info:</h4>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-28">Name :</span>
                    <span className="text-gray-900">Aman Shaikh</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Mobile No :</span>
                    <span className="text-gray-900">7350786629</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Email :</span>
                    <span className="text-gray-900">45amanshaikh@gmail.com</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Gender :</span>
                    <span className="text-gray-900">Male</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">DOB :</span>
                    <span className="text-gray-900">16-NOV-2000</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Password :</span>
                    <span className="text-gray-900">••••••••</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Address :</span>
                    <span className="text-gray-900">AINET Block 2, 1-Ganga Villa, St. Kabir Ward, Bhandara, M.S., India, PIN 441904</span>
                  </div>
                </div>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">History</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Dear Aman Shaikh</h4>
                <p className="text-gray-600 text-sm mb-4">Welcome to your member history</p>
                
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-40">Name :</span>
                    <span className="text-gray-900">Aman Shaikh</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Membership ID :</span>
                    <span className="text-gray-900">MH000103</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">AINET member on :</span>
                    <span className="text-gray-900">22-June-2020</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Renewed membership on :</span>
                    <span className="text-gray-900">23-July-2021</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Expire membership on :</span>
                    <span className="text-gray-900">28-September-2022</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Membership Status :</span>
                    <span className="text-red-600 font-medium">INACTIVE</span>
                  </div>
                </div>
                
                <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                  Renew Now
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-6">You last visited this site on: 20/06/2023</p>
            </div>

            {/* Inbox Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Inbox</h3>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs text-gray-500 mt-1">📧</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Apply Now: AINET Scholarships, Grants & Sponsorships for Members!</p>
                      <p className="text-xs text-gray-500">06/06/2025  10:00AM                    10h Ago</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 ml-5">Dear Aman, AINET is pleased to offer exclusive scholarships, travel grants...</p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs text-gray-500 mt-1">📧</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Apply Now: AINET Scholarships, Grants & Sponsorships for Members!</p>
                      <p className="text-xs text-gray-500">06/06/2025  10:00AM                    10h Ago</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 ml-5">Dear Aman, AINET is pleased to offer exclusive scholarships, travel grants...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Membership Kit */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership Kit</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Membership ID Card */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Membership ID Card</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="bg-blue-500 h-2 mb-4"></div>
                    <div className="flex items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-lg">ainet</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">ASSOCIATION OF INDIAN<br />NETWORK FOR ENGLISH<br />TEACHERS</p>
                        <div className="w-16 h-16 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-2">
                          <span className="text-xs">QR</span>
                        </div>
                        <p className="text-xs text-blue-600">www.ainet.org.in</p>
                      </div>
                      <div className="flex-1 text-right">
                        <div className="w-16 h-20 bg-gray-200 rounded mb-2 mx-auto"></div>
                        <p className="font-semibold text-sm">S. RAVIBALAN</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>

                {/* Membership Certificate */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Membership Certificate</h4>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
                    <div className="text-yellow-600 mb-2">🏆</div>
                    <h5 className="font-bold text-sm text-yellow-800 mb-1">AINET ASSOCIATION OF<br />ENGLISH TEACHERS</h5>
                    <p className="text-xs text-yellow-700 mb-2">CERTIFICATE OF MEMBERSHIP</p>
                    <p className="text-xs text-yellow-700 mb-1">This certificate is awarded to</p>
                    <p className="font-semibold text-sm text-yellow-800 mb-2">S. Ravibalan</p>
                    <p className="text-xs text-yellow-700">This certificate testifies that the person mentioned above is a bonafide member of<br />AINET and is entitled to all the privileges of the AINET membership.</p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>

              {/* Member DP */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Member DP</h4>
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-6 text-white text-center">
                  <p className="text-sm mb-2">AINET ASSOCIATION OF ENGLISH TEACHERS</p>
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b593?w=80&h=80&fit=crop&crop=face" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="font-bold text-lg mb-1">NADEEM KHAN</h5>
                  <p className="text-sm opacity-90">I'm an AINETian</p>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 mt-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>

            {/* Badge Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">badge</h3>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">720 x 720</span>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">badge 1</h4>
                  <div className="w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center relative">
                      <Award className="w-8 h-8 text-white" />
                      <div className="absolute -bottom-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">WINNER</div>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 w-full">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">badge 2</h4>
                  <div className="w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center relative border-4 border-yellow-400">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 w-full">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AINET Scholarships */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">AINET Scholarships</h3>
              
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  AINET is committed to support its members' professional development. As one way of supporting, AINET offers a range of scholarships, travel grants and sponsorships to attend AINET conferences and activities, events of other organisations, short-term courses, etc.
                </p>
                <p>
                  Scholarships, sponsorships and grants are available only to members with valid membership. They are announced from time to time for specific events or courses. Please watch out for regular announcements!
                </p>
                <p>
                  AINET members with innovative ideas may also approach us for small funding support to undertake small-scale projects. For more information or queries, write to <span className="text-blue-600 underline">theainet@gmail.com</span>.
                </p>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-green-200 text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-300">
                  REGISTER NOW
                </button>
              </div>
            </div>

            {/* IATEFL Memberships */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">IATEFL Memberships</h3>
              
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  IATEFL, based in the UK, is a global organisation of teachers of English. AINET members can join it at heavily discounted rates through its Wider Membership Scheme (WMS).
                </p>
                <div>
                  <p className="font-semibold mb-2">Benefits of IATEFL membership:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Discounts at the Annual IATEFL Conference and many other ELT events around the world.</li>
                    <li>• Discounts on IATEFL publications.</li>
                    <li>• One copy of <span className="underline">IATEFL Voices</span> published six times a year.</li>
                    <li>• Access to a large number of scholarships to attend and present at the annual and other IATEFL conferences.</li>
                    <li>• Regular updates on IATEFL Webinars and other activities</li>
                    <li>• Voting Rights in IATEFL elections.</li>
                  </ul>
                </div>
                <p>
                  WMS places are limited and offered on first-come first-served basis. Watch out for IATEFL WMS calls and apply immediately. For more information or queries, write to <span className="text-blue-600 underline">theainet@gmail.com</span>.
                </p>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-green-200 text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-300">
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}