import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Profile() {

  const [profile, setProfile] = useState({
    username: "",
    email: ""
  });

  const [password, setPassword] = useState("");

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile/");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();

  }, []);

  const updateProfile = async () => {

    try {

      const data = {
        username: profile.username
      };

      if (password) {
        data.password = password;
      }

      await api.patch("/api/profile/", data);

      alert("Profile updated successfully");

      setPassword("");

    } catch (error) {

      console.log(error.response?.data);
      alert("Update failed");

    }

  };

  return (

    <div className="flex justify-center px-4 py-10">

      <div className="w-full max-w-xl bg-base-100 shadow-lg rounded-xl p-6">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          My Profile
        </h1>

        <div className="space-y-4">

          {/* Username */}
          <div>
            <label className="label">
              <span className="label-text">Username</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="email"
              className="input input-bordered w-full"
              value={profile.email}
              disabled
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">New Password</span>
            </label>

            <input
              type="password"
              placeholder="Leave blank if not changing"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={updateProfile}
            className="btn btn-primary w-full mt-4"
          >
            Update Profile
          </button>

        </div>

      </div>

    </div>
  );
}