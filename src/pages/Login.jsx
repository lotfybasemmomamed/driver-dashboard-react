import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "admin@123.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      const userData = { email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "/dashboard";
    } else {
      alert("Only admin is allowed to log in");
    }
    setEmail("")
    setPassword("")

  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Only <span className="font-semibold text-red-500">Admin</span> is allowed to log in
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

<div className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
  <p>
    <span className="font-semibold">Correct Email:</span> admin@123.com
  </p>
  <p>
    <span className="font-semibold">Correct Password:</span> admin123
  </p>
</div>
          <button
            type="submit"
            className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Login
          </button>
         
        </form>
      </div>
    </div>
  );
}
