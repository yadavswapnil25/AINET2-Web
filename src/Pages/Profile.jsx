import React, { useEffect, useRef, useState } from "react";
import { Edit, Download, Star, Award } from "lucide-react";
import { baseUrl } from "../utils/constant";
import { FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Loader from "../Components/shared/Loader";
import { useAuth } from "../context/AuthContext";
import html2canvas from "html2canvas";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "/placeholder.jpg"
  );
  const fileInputRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("ainetToken");
  const { setProfileData, handleTokenExpiration } = useAuth();
  const [showInboxModal, setShowInboxModal] = useState(false);

  const [formData, setFormData] = useState({
    name: profile?.name,
    mobile: profile?.mobile,
    email: profile?.email,
    gender: profile?.gender,
    dob: profile?.dob,
    address: profile?.address,
  });

  const handleProfileClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleEditClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Show preview
      setSelectedFile(file); // Store the actual file
      setImageSelected(true); // Mark that image is selected
    }
  };

  const handleSaveProfile = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formDataForUpload = new FormData();
      formDataForUpload.append("image", selectedFile);

      const res = await fetch(`${baseUrl}/client/auth/${profile.id}/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type when using FormData - browser will set it automatically
        },
        body: formDataForUpload,
      });

      // Check if token is expired or invalid
      if (res.status === 401 || res.status === 403) {
        handleTokenExpiration();
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message || "Profile image updated successfully!");

        // Update both user states consistently
        if (data?.data) {
        }
        fetchProfile(); // Refresh profile data
        setImageSelected(false);
        setSelectedFile(null);
        setShowModal(false);
      } else {
        toast.error(data?.message || "Failed to update profile image");
      }
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProfileClick = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${baseUrl}/client/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if token is expired or invalid
      if (res.status === 401 || res.status === 403) {
        handleTokenExpiration();
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfileData(data?.data?.user)
      setProfile(data?.data?.user);
      setLoading(false);
      if (data?.data?.user) {
        setFormData({
          name: data?.data?.user?.name || "",
          mobile: data?.data?.user.mobile || "",
          email: data?.data?.user?.email || "",
          gender: data?.data?.user?.gender || "",
          dob: data?.data?.user?.dob || "",
          address: data?.data?.user?.address || "",
        });
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData to handle both text fields and potential file
      const formDataForSubmit = new FormData();

      // Add text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataForSubmit.append(key, formData[key]);
        }
      });

      // Add image file if selected
      if (selectedFile) {
        formDataForSubmit.append("image", selectedFile);
      }

      const res = await fetch(`${baseUrl}/client/auth/${profile.id}/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type when using FormData
        },
        body: formDataForSubmit,
      });

      // Check if token is expired or invalid
      if (res.status === 401 || res.status === 403) {
        handleTokenExpiration();
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message || "Profile updated successfully!");
        // Update both user states consistently
        if (data?.data) {
        }
        fetchProfile();
        setShowEditModal(false);
        setImageSelected(false);
        setSelectedFile(null);
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  let created = new Date(profile?.created_at);
  created = created.toLocaleDateString();

  let renewed = new Date(profile?.updated_at);
  renewed = renewed.toLocaleDateString();

  // Calculate expiry date (1 year from renewed date)
  const renewedDate = new Date(profile?.updated_at);
  const expiryDate = new Date(renewedDate);
  expiryDate.setFullYear(renewedDate.getFullYear() + 1);

  const currentDate = new Date();

  // Determine membership status based on expiry date
  const isActive = currentDate <= expiryDate;
  const expired = expiryDate.toLocaleDateString();

  // Calculate days difference
  const timeDiff = expiryDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const getStatusMessage = () => {
    if (isActive) {
      if (daysDiff <= 30) {
        return `Expires in ${daysDiff} days`;
      }
      return `Valid for ${daysDiff} days`;
    } else {
      return `Expired ${Math.abs(daysDiff)} days ago`;
    }
  };

  const cardRef = useRef();

  const handleDownload = async () => {
    const element = cardRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const dataUrl = canvas.toDataURL("image/jpeg", 1.0); // Convert to JPEG

      // ✅ Trigger image download only
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "AINET_Membership_Card.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Column */}
          <div className="space-y-6 max-w-full col-span-1  ">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-[#A6AEBF] ">
              <div className="flex items-center justify-between mb-6 border-b border-[#A6AEBF] p-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                <button
                  className="flex items-center border text-lg border-[#A6AEBF] px-6 py-2 rounded-2xl gap-2 text-[#A6AEBF] hover:text-gray-700 font-semibold"
                  onClick={handleEditProfileClick}
                >
                  <Edit className="w-6 h-6" />
                  <span className="">Edit</span>
                </button>
              </div>

              <div className="text-center mb-6">
                <div
                  className="relative group w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden cursor-pointer"
                  onClick={handleProfileClick}
                >
                  <img
                    src={profile?.image_url || previewImage || "/placeholder.jpg"}
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />

                  {/* Edit Icon */}
                  <FaEdit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 text-[#333435] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>

                {showModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 relative w-full max-w-sm text-center shadow-lg">
                      {/* Close Button */}
                      <button
                        className="absolute top-2 right-2 text-gray-600 text-4xl font-bold"
                        onClick={closeModal}
                      >
                        &times;
                      </button>

                      {/* Modal Profile Image */}
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                        <img
                          src={previewImage || profile?.image_url || "/placeholder.jpg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {/* Upload Button */}
                      <button
                        onClick={handleEditClick}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                      >
                        Upload New Profile
                      </button>

                      {/* Save Button (conditionally shown) */}
                      {imageSelected && (
                        <button
                          onClick={handleSaveProfile}
                          className="mt-4 px-4 py-2 ml-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                        >
                          Save Profile
                        </button>
                      )}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {profile?.name}
                </h3>
                <p className="text-gray-600">{profile?.email}</p>
              </div>

              <div className=" px-6 py-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Personal Info:
                </h4>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-28">Name :</span>
                    <span className="text-gray-900">{profile?.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Mobile No :</span>
                    <span className="text-gray-900">{profile?.mobile}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Email :</span>
                    <span className="text-gray-900">{profile?.email}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">Gender :</span>
                    <span className="text-gray-900">{profile?.gender}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-28">DOB :</span>
                    <span className="text-gray-900">{profile?.dob}</span>
                  </div>
                  {/* <div className="flex">
                    <span className="text-gray-600 w-28">Password :</span>
                    <span className="text-gray-900">••••••••</span>
                  </div> */}
                  <div className="flex">
                    <span className="text-gray-600 w-28">Address :</span>
                    <span className="text-gray-900">{profile?.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Membership History
              </h3>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Dear {profile?.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Welcome to your member history
                </p>

                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-40">Name :</span>
                    <span className="text-gray-900">{profile?.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Membership ID :</span>
                    <span className="text-gray-900">{profile?.m_id}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">
                      Registered on :
                    </span>
                    <span className="text-gray-900">{created}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">
                      Membership Renewed :
                    </span>
                    <span className="text-gray-900">{renewed}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">
                      Membership Expiring on :
                    </span>
                    <span className="text-gray-900">{expired}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">
                      Membership Status :
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`${isActive
                          ? "text-green-500"
                          : "text-red-600"
                          }  font-medium `}
                      >
                        {isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                      <span
                        className={`text-xs ${isActive
                          ? daysDiff <= 30
                            ? "text-orange-500"
                            : "text-gray-500"
                          : "text-red-500"
                          }`}
                      >
                        {getStatusMessage()}
                      </span>
                    </div>
                  </div>
                </div>

                {!isActive && (
                  <button className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 font-semibold">
                    Renew Now - Membership Expired
                  </button>
                )}
              </div>

              {/* <p className="text-xs text-gray-500 mt-6">
                You last visited this site on: 20/06/2023
              </p> */}
            </div>

            {/* Inbox Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Inbox</h3>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs text-gray-500 mt-1">📧</span>
                    <div className="flex-1">
                      <p onClick={() => setShowInboxModal(true)} className="text-sm font-medium text-gray-900 cursor-pointer hover:underline">
                        Apply Now: AINET Scholarships, Grants & Sponsorships for
                        Members!
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        06/06/2025 10:00AM 10h Ago
                      </p>
                    </div>
                  </div>

                </div>


              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 col-span-2">
            {/* Membership Kit */}
            <div >
              {/* <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Membership Kit
              </h3> */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Membership ID Card */}
                {/* <div className="  col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Membership ID Card
                  </h4>
                  <div className="card-container" ref={cardRef} style={{ position: 'relative' }}>
                    <div className="card-header">
                      <span className="card-title">AINET MEMBERSHIP CARD</span>
                      <div className="card-title-bar"></div>
                    </div>



                    <div className="card-body">
                      <div className="card-left">
                        <div className="logo-container">
                          <img src="/logo.svg" alt="logo" className="logo-image" />
                        </div>
                        <p className="member-info">
                          <span>MEMBERSHIP ID: {profile?.m_id}</span>
                          <br />
                          <span>VALID UP TO: {expired}</span>
                        </p>
                        <div className="qr-box">
                          <span className="qr-text">QR</span>
                        </div>
                      </div>

                      <div className="card-right">
                        {profile?.image_url ? (
                          <img
                            src={profile?.image_url || "/placeholder.jpg"}
                            onError={(e) => {
                              e.target.src = "/placeholder.jpg";
                            }}
                            alt="card image"
                            className="profile-image "
                          />
                        ) : (
                          <img
                            src={profile?.image_url || "/placeholder.jpg"}
                            onError={(e) => {
                              e.target.src = "/placeholder.jpg";
                            }}
                            alt="placeholder"
                            className="profile-image "
                          />
                        )}

                        <p className="member-name">{profile?.name}</p>
                        <div className="blue-line"></div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span className="footer-text">www.theainet.net</span>
                      <div className="footer-line"></div>
                    </div>

                    <div className="contact-line">
                      <span className="contact-info">
                        Address: {profile?.address} | Call: {profile?.mobile} | {profile?.email}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" onClick={() => handleDownload('png')}>
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div> */}

                {/* Membership Certificate */}
                {/* <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Membership Certificate
                  </h4>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
                    <div className="text-yellow-600 mb-2">🏆</div>
                    <h5 className="font-bold text-sm text-yellow-800 mb-1">
                      AINET ASSOCIATION OF
                      <br />
                      ENGLISH TEACHERS
                    </h5>
                    <p className="text-xs text-yellow-700 mb-2">
                      CERTIFICATE OF MEMBERSHIP
                    </p>
                    <p className="text-xs text-yellow-700 mb-1">
                      This certificate is awarded to
                    </p>
                    <p className="font-semibold text-sm text-yellow-800 mb-2">
                      {profile?.name}
                    </p>
                    <p className="text-xs text-yellow-700">
                      This certificate testifies that the person mentioned above
                      is a bonafide member of
                      <br />
                      AINET and is entitled to all the privileges of the AINET
                      membership.
                    </p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div> */}
              </div>

              {/* Member DP */}
              {/* <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Member DP</h4>
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-6 text-white text-center">
                  <p className="text-sm mb-2">
                    AINET ASSOCIATION OF ENGLISH TEACHERS
                  </p>
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={profile?.image_url || "/placeholder.jpg"}
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg";
                      }}
                      alt="Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="font-bold text-lg mb-1">{profile?.name}</h5>
                  <p className="text-sm opacity-90">I'm an AINETian</p>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 mt-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div> */}
            </div>

            {/* Badge Section */}
            {/* <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">badge 1</h4>
                  <div className="w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center relative">
                      <Award className="w-8 h-8 text-white" />
                      <div className="absolute -bottom-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        WINNER
                      </div>
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
            </div> */}

            {/* AINET Scholarships */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                AINET Scholarships
              </h3>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  AINET is committed to support its members' professional
                  development. As one way of supporting, AINET offers a range of
                  scholarships, travel grants and sponsorships to attend AINET
                  conferences and activities, events of other organisations,
                  short-term courses, etc.
                </p>
                <p>
                  Scholarships, sponsorships and grants are available only to
                  members with valid membership. They are announced from time to
                  time for specific events or courses. Please watch out for
                  regular announcements!
                </p>
                <p>
                  AINET members with innovative ideas may also approach us for
                  small funding support to undertake small-scale projects. For
                  more information or queries, write to{" "}
                  <span className="text-blue-600 underline">
                    theainet@gmail.com
                  </span>
                  .
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
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                IATEFL Memberships
              </h3>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  IATEFL, based in the UK, is a global organisation of teachers
                  of English. AINET members can join it at heavily discounted
                  rates through its Wider Membership Scheme (WMS).
                </p>
                <div>
                  <p className="font-semibold mb-2">
                    Benefits of IATEFL membership:
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>
                      • Discounts at the Annual IATEFL Conference and many other
                      ELT events around the world.
                    </li>
                    <li>• Discounts on IATEFL publications.</li>
                    <li>
                      • One copy of{" "}
                      <span className="underline">IATEFL Voices</span> published
                      six times a year.
                    </li>
                    <li>
                      • Access to a large number of scholarships to attend and
                      present at the annual and other IATEFL conferences.
                    </li>
                    <li>
                      • Regular updates on IATEFL Webinars and other activities
                    </li>
                    <li>• Voting Rights in IATEFL elections.</li>
                  </ul>
                </div>
                <p>
                  WMS places are limited and offered on first-come first-served
                  basis. Watch out for IATEFL WMS calls and apply immediately.
                  For more information or queries, write to{" "}
                  <span className="text-blue-600 underline">
                    theainet@gmail.com
                  </span>
                  .
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
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 relative w-full max-w-lg text-left shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 text-4xl font-bold"
              onClick={closeEditModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4" onSubmit={handleEdit}>
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mobile No</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData?.mobile}
                  max={10}
                  maxLength={10}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              {/* <div>
                <label className="block text-gray-700 mb-1">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div> */}
              <div>
                <label className="block text-gray-700 mb-1">DOB</label>
                <DatePicker
                  selected={formData.dob ? new Date(formData.dob) : null}
                  onChange={(date) => {
                    setFormData((prev) => ({
                      ...prev,
                      dob: date ? date.toISOString().split("T")[0] : "",
                    }));
                  }}
                  maxDate={new Date(Date.now() - 24 * 60 * 60 * 1000)} // Disables today and future dates
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  dropdownMode="select"
                  placeholderText="Select your date of birth"
                  dateFormat="yyyy-MM-dd"
                  className="w-full p-2 bg-white rounded border border-black"
                  required
                  popperClassName="date-picker-popper"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-full text-sm font-bold mx-auto  ${isSubmitting
                    ? "bg-amber-100 cursor-not-allowed disabled:cursor-not-allowed"
                    : "bg-amber-200 hover:bg-amber-300 cursor-pointer"
                    }`}
                  style={{
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION FORM"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showInboxModal && <InboxModal setShowInboxModal={setShowInboxModal} />}
    </div>
  );
}




const InboxModal = ({ setShowInboxModal }) => {
  const closeInboxModal = () => {
    setShowInboxModal(false);
  };



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 relative w-full max-w-[90%] md:max-w-2xl text-center shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 text-4xl font-bold"
          onClick={closeInboxModal}
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Inbox</h3>
        <p>AINET is committed to support its members' professional development. As one way of supporting, AINET offers a range of scholarships, travel grants and sponsorships to attend AINET conferences and activities, events of other organisations, short-term courses, etc.

          Scholarships, sponsorships and grants are available only to members with valid membership. They are announced from time to time for specific events or courses. Please watch out for regular announcements!

          AINET members with innovative ideas may also approach us for small funding support to undertake small-scale projects. For more information or queries, write to <a href="mailto:theainet@gmail.com" className="text-blue-500">theainet@gmail.com</a>.</p>
      </div>
    </div>
  );
};
