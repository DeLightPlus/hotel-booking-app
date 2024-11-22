import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <form>
        <label>
          Name:
          <input type="text" defaultValue="John Doe" />
        </label>
        <label>
          Email:
          <input type="email" defaultValue="john.doe@example.com" />
        </label>
        <label>
          Phone:
          <input type="text" defaultValue="(123) 456-7890" />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
