import { useState, useEffect } from "react";

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    profilePic: ""
  });

  // Load User
  useEffect(() => {

    const savedUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser) {
      setUser(savedUser);
    }

  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // Upload Image From Local System
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      const updatedUser = {
        ...user,
        profilePic: reader.result
      };

      setUser(updatedUser);
    };

    reader.readAsDataURL(file);
  };

  // Save Changes
  const handleSave = () => {

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    // ALSO UPDATE LOGIN USER
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">

          <img
            src={
              user.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-green-500 shadow-md"
          />

          <label className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg cursor-pointer transition">

            Upload Profile Picture

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

          </label>

        </div>

        {/* Name */}
        <div className="mb-5">

          <label className="block font-semibold mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500"
          />

        </div>

        {/* Email */}
        <div className="mb-5">

          <label className="block font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-500"
          />

        </div>

        {/* Role */}
        <div className="mb-8">

          <label className="block font-semibold mb-2">
            Role
          </label>

          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100"
          />

        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Profile;