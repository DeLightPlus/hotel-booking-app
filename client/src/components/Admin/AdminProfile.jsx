import React from 'react';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
  const adminUserData = useSelector((state) => state.auth.adminUserData);

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>
      <div className="profile-info">
        <p>
          <strong>First Name:</strong> {adminUserData.firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {adminUserData.lastname}
        </p>
        <p>
          <strong>Email:</strong> {adminUserData.email}
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;