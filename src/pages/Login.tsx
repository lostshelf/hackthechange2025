import "../App.css";
import { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Verify information through the server
        console.log(`Inputted email is: ${email}`);
        console.log(`Inputted password is: ${password}`);
    }

    return (
        <div className="bg-black border-b border-black rounded-lg p-2 h-screen text-center flex flex-col items-center justify-center font-sans">
            {/* App Title */}
            <h1 className="text-3xl font-bold mb-6 text-white">
                FIX-IT-CALGARY
            </h1>
            {/* Login Title */}
            <h1 className="text-2xl font-bold mb-6 text-gray-200">
                LOG IN
            </h1>

            {/* Input label for email address */}
            <div className="mb-6 flex items-center justify-center">
                <label htmlFor="email" className="mr-3 font-medium text-blue-500 w-24 text-right">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="bg-gray-500 border border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Input label for password */}
            <div className="mb-6 flex items-center justify-center">
                <label htmlFor="password" className="mr-3 font-medium text-blue-500 w-24 text-right">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-500 border border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Buttons */}
            <div className="flex space-x-19 justify-center">
                {/* Create new account */}
                {/* TODO: Change page to create a new account */}
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg px-5 py-2.5 text-center"
                    onClick={() => console.log("new")}>
                    Create Account
                </button>

                {/* Login with input */}
                <button
                    type="submit"
                    className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg px-5 py-2.5 text-center"
                    onClick={handleLogin}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
