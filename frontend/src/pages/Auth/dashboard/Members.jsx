import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux-store/user-reducers/userSlice";
import { 
  Search, 
  UserCircle, 
  BadgeCheck, 
  BadgeX,
  Shield,
  User,
  Calendar,
  Mail,
  Phone,
  Home,
  ChevronRight,
  Activity
} from "lucide-react";

const Members = ({ setSelectedUser }) => {
  const [searchMembers, setSearchMembers] = useState("");
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch]);

  // Filter users based on search
  const filteredUsers = users?.filter((user) =>
    user.name?.toLowerCase().includes(searchMembers.toLowerCase())
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get role badge color
  const getRoleBadge = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin':
        return { bg: 'bg-purple-100', text: 'text-purple-700', icon: Shield, label: 'Admin' };
      case 'user':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: User, label: 'Member' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: UserCircle, label: role };
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredUsers?.length || 0} active members
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white focus:bg-white text-gray-900 placeholder-gray-400"
            placeholder="Search members by name..."
            value={searchMembers}
            onChange={(e) => setSearchMembers(e.target.value)}
          />
        </div>
      </div>

      {/* Members Grid */}
      <div className="p-6">
        {filteredUsers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => {
              const roleBadge = getRoleBadge(user.role);
              const RoleIcon = roleBadge.icon;
              
              return (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user.name)}
                  className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    {user.isActive ? (
                      <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs font-medium text-green-700">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
                        <BadgeX className="w-3.5 h-3.5 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Inactive</span>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <span className="text-white font-semibold text-lg">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {user.canWorkFromHome && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                          <Home className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {user.name}
                      </h3>
                      
                      <div className="flex items-center mt-1.5 space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${roleBadge.bg} ${roleBadge.text}`}>
                          <RoleIcon className="w-3 h-3 mr-1" />
                          {roleBadge.label}
                        </span>
                        
                        {user.phone && (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone.slice(-4)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <Mail className="w-3.5 h-3.5 mr-1" />
                        <span className="truncate max-w-[140px]">{user.email}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                    
                    {user.lastLogin && (
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Activity className="w-3.5 h-3.5 mr-1" />
                        Last active: {formatDate(user.lastLogin)}
                      </div>
                    )}
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
              <UserCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No members found</h3>
            <p className="text-gray-500">
              {searchMembers 
                ? `No results for "${searchMembers}"` 
                : "No team members available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;