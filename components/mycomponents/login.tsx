"use client"

const Login = () => {
  return (
    <div>
      <button 
      onClick={() => {
        const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL
        if (authServerUrl) {
          window.location.href = authServerUrl
        }
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login with Github
      </button>
    </div>
  )
}

export default Login
