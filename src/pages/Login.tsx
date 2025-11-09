import "../App.css";
import {useState} from "react";

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
        <div className="bg-gray-200 border-b border-gray-300 rounded-lg p-2 h-screen text-center items-center justify-center font-sans">
            <h1 className="text-2xl font-bold mb-6 mt-10 text-center text-red-600">
                Enter Log In Information:
            </h1>

            {/* Input label for email address */}
            <div className="mb-6 items-center flex justify-center">
                <label htmlFor="email" className="mr-3 font-medium bold text-blue-400 w-24 text-right">
                    Email
                </label>
                <input type="email" id="email"
                       className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Input label for password */}
            <div className="mb-6 items-center flex justify-center">
                <label htmlFor="password" className="mr-3 font-medium bold text-blue-400 w-24 text-right">
                    Password
                </label>
                <input type="password" id="password"
                       className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Create new user */}
            {/* TODO: Make button change page */}
            <button type="submit"
                    className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg px-5 py-2.5 mr-5 text-center"
                    onClick={() => console.log("new")}>
                Create Account
            </button>

            {/* Submit login information */}
            <button type="submit"
                    className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg px-5 py-2.5 text-center"
                    onClick={handleLogin}>
                Enter
            </button>
        </div>
    )
}

export default LoginPage;