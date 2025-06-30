import React, { useState, useEffect } from 'react';
import { Menu, Plus, Search } from 'lucide-react';
import Sidebar from '../../Components/Admin/Sidebar';
import UserModal from '../../Components/Admin/UserModal';
import UserTableAndCards from '../../Components/Admin/Table';

const AdminDashboard = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Isabella Christensen', email: 'isabella@example.com', phone: '+45 12 34 56 78', role: 'Admin', department: 'IT', status: 'active', joinDate: '11 MAY 12:56' },
        { id: 2, name: 'Mathilde Andersen', email: 'mathilde@example.com', phone: '+45 98 76 54 32', role: 'User', department: 'HR', status: 'inactive', joinDate: '11 MAY 10:35' },
        { id: 3, name: 'Karla Sorensen', email: 'karla@example.com', phone: '+45 55 44 33 22', role: 'Manager', department: 'Sales', status: 'active', joinDate: '9 MAY 17:38' },
        { id: 4, name: 'Ida Jorgensen', email: 'ida@example.com', phone: '+45 11 22 33 44', role: 'User', department: 'Marketing', status: 'inactive', joinDate: '19 MAY 12:56' },
        { id: 5, name: 'Albert Andersen', email: 'albert@example.com', phone: '+45 77 88 99 00', role: 'Admin', department: 'IT', status: 'active', joinDate: '21 July 12:56' },
        { id: 6, name: 'Emma Nielsen', email: 'emma@example.com', phone: '+45 33 44 55 66', role: 'User', department: 'Finance', status: 'active', joinDate: '22 MAY 14:30' },
        { id: 7, name: 'Oliver Hansen', email: 'oliver@example.com', phone: '+45 66 77 88 99', role: 'Manager', department: 'Operations', status: 'inactive', joinDate: '23 MAY 09:15' },
        { id: 8, name: 'Sofia Larsen', email: 'sofia@example.com', phone: '+45 44 55 66 77', role: 'User', department: 'HR', status: 'active', joinDate: '24 MAY 16:45' },
        { id: 9, name: 'Lucas Petersen', email: 'lucas@example.com', phone: '+45 22 33 44 55', role: 'Admin', department: 'IT', status: 'active', joinDate: '25 MAY 11:20' },
        { id: 10, name: 'Ella Madsen', email: 'ella@example.com', phone: '+45 88 99 00 11', role: 'User', department: 'Sales', status: 'inactive', joinDate: '26 MAY 13:10' },
        { id: 11, name: 'William Jensen', email: 'william@example.com', phone: '+45 99 88 77 66', role: 'Manager', department: 'Marketing', status: 'active', joinDate: '27 MAY 15:30' },
        { id: 12, name: 'Frida Thomsen', email: 'frida@example.com', phone: '+45 55 66 77 88', role: 'User', department: 'Finance', status: 'active', joinDate: '28 MAY 08:45' }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'User', department: '', status: 'active' });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const usersPerPage = 10;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const reassignIds = (userList) => userList.map((user, index) => ({ ...user, id: index + 1 }));

    const handleAddUser = () => {
        setModalMode('add');
        setFormData({ name: '', email: '', phone: '', role: 'User', department: '', status: 'active' });
        setSelectedUser(null);
        setShowModal(true);
        setSidebarOpen(false);
    };

    const handleEditUser = (user) => {
        setModalMode('edit');
        setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role, department: user.department, status: user.status });
        setSelectedUser(user);
        setShowModal(true);
        setSidebarOpen(false);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(user => user.id !== userId);
            const reorderedUsers = reassignIds(updatedUsers);
            setUsers(reorderedUsers);
            const newTotalPages = Math.ceil(reorderedUsers.length / usersPerPage);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }
        }
    };

    const handleSubmit = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.department.trim()) {
            alert('Please fill in all required fields');
            return;
        }
        if (modalMode === 'add') {
            const newUser = {
                id: users.length + 1,
                ...formData,
                joinDate: new Date().toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                })
            };
            setUsers(reassignIds([...users, newUser]));
        } else {
            const updatedUsers = users.map(user =>
                user.id === selectedUser.id ? { ...user, ...formData } : user
            );
            setUsers(reassignIds(updatedUsers));
        }
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', role: 'User', department: '', status: 'active' });
    };

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();
    const getRandomColor = () => {
        const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.menu-button')) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sidebarOpen]);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                <div className="bg-white shadow-sm p-4 lg:p-6 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="menu-button lg:hidden p-2 rounded-md hover:bg-gray-100 mr-3"
                            >
                                <Menu size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">User Management</h1>
                                <p className="text-gray-600 text-sm lg:text-base hidden sm:block">Manage your users and their permissions</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAddUser}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm lg:text-base"
                        >
                            <Plus size={16} />
                            <span className="hidden sm:inline">Add User</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 lg:p-6 border-b">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <UserTableAndCards
                    currentUsers={currentUsers}
                    getInitials={getInitials}
                    getRandomColor={getRandomColor}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                    indexOfFirstUser={indexOfFirstUser}
                    indexOfLastUser={indexOfLastUser}
                    filteredUsers={filteredUsers}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <UserModal
                showModal={showModal}
                setShowModal={setShowModal}
                modalMode={modalMode}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AdminDashboard;
