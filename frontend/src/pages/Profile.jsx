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
      JSON.parse(
        localStorage.getItem("currentUser")
      );

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

    // Limit image size to 1MB
    if (file.size > 1024 * 1024) {

      alert(
        "Please upload image smaller than 1MB"
      );

      return;
    }

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

    // Prevent huge images
    if (
      user.profilePic &&
      user.profilePic.length > 200000
    ) {

      alert(
        "Image size is too large. Please choose a smaller image."
      );

      return;
    }

    // Save Current User
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    // Update Logged In User
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // Update User Inside Users Array
    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const updatedUsers =
      users.map((u) => {

        if (u.email === user.email) {
          return user;
        }

        return u;

      });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert(
      "Profile Updated Successfully!"
    );

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-center text-white">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-green-100">
            Manage your account details
          </p>

        </div>

        <div className="p-8">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-10">

            <img
              src={
                user.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-lg"
            />

            <label className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl cursor-pointer transition font-medium shadow-md">

              Upload Profile Picture

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

            </label>

            <p className="text-sm text-gray-500 mt-3">
              Maximum image size: 1MB
            </p>

          </div>

          {/* Name */}
          <div className="mb-6">

            <label className="block font-semibold mb-2 text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Email */}
          <div className="mb-6">

            <label className="block font-semibold mb-2 text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Role */}
          <div className="mb-8">

            <label className="block font-semibold mb-2 text-gray-700">
              Role
            </label>

            <input
              type="text"
              value={user.role}
              disabled
              className="w-full border border-gray-300 rounded-xl p-4 bg-gray-100 text-gray-500"
            />

          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;