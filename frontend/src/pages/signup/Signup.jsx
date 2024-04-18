import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

function Signup() {

  const [inputs, setInputs] = useState({
    fullName:'',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const [loading, signup] = useSignup();

  const handleCheckboxChange = (gender) =>{
    setInputs({
     ...inputs,
      gender
    })
  }

  const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs)
	};

  return (
    <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className=' text-3xl font-semibold text-center text-gray-300'>SignUp <span className=' text-blue-600'> ChatApp</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
                <label className=' label p-2'>
                    <span className=' text-base label-text'>Full Name</span>
                </label>
                <input className=' w-full input input-bordered h-10'
                type='text'
                placeholder='Max Reo' 
                value={inputs.fullName}
                onChange={(e) => setInputs({...inputs, fullName: e.target.value })}
                />
            </div>
            <div>
                <label className=' label p-2'>
                    <span className=' text-base label-text'>Username</span>
                </label>
                <input className=' w-full input input-bordered h-10'
                type='text'
                placeholder='max_reo' 
                value={inputs.username}
                onChange={(e) => setInputs({...inputs, username: e.target.value })}
                />
            </div>
            <div>
                <label className=' label p-2'>
                    <span className=' text-base label-text'>Password</span>
                </label>
                <input
                className=' w-full input input-bordered h-10'
                type='password'
                placeholder='Password'
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value })}
                />
            </div>
            <div>
                <label className=' label p-2'>
                    <span className=' text-base label-text'>Comfirm Password</span>
                </label>
                <input
                className=' w-full input input-bordered h-10'
                type='password'
                placeholder='Comfirm Password'
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value })}
                />
            </div>

            {/* gender checkbox */}
            <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />

            <Link to="/login" className=' text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?
            </Link>
            <div>
            <button
              className=' btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
              {loading ? <span className=' loading loading-spinner'></span>:"Sign UP"}
            </button>
          </div>
          </form>
        </div>
    </div>
  )
}

export default Signup








// import React from 'react'
// import GenderCheckbox from './GenderCheckbox'

// function Signup() {
//   return (
//     <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
//         <div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//           <h1 className=' text-3xl font-semibold text-center text-gray-300'>SignUp <span className=' text-blue-600'> ChatApp</span>
//           </h1>
//           <form>
//             <div>
//                 <label className=' label p-2'>
//                     <span className=' text-base label-text'>Full Name</span>
//                 </label>
//                 <input className=' w-full input input-bordered h-10'
//                 type='text'
//                 placeholder='Max Reo' 
//                 />
//             </div>
//             <div>
//                 <label className=' label p-2'>
//                     <span className=' text-base label-text'>Username</span>
//                 </label>
//                 <input className=' w-full input input-bordered h-10'
//                 type='text'
//                 placeholder='max_reo' 
//                 />
//             </div>
//             <div>
//                 <label className=' label p-2'>
//                     <span className=' text-base label-text'>Password</span>
//                 </label>
//                 <input
//                 className=' w-full input input-bordered h-10'
//                 type='password'
//                 placeholder='Password'
//                 />
//             </div>
//             <div>
//                 <label className=' label p-2'>
//                     <span className=' text-base label-text'>Comfirm Password</span>
//                 </label>
//                 <input
//                 className=' w-full input input-bordered h-10'
//                 type='password'
//                 placeholder='Comfirm Password'
//                 />
//             </div>

//             {/* gender checkbox */}
//             <GenderCheckbox/>

//             <a href="#" className=' text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?
//             </a>
//             <div>
//             <button
//               className=' btn btn-block btn-sm mt-2'>
//               SignUp
//             </button>
//           </div>
//           </form>
//         </div>
//     </div>
//   )
// }

// export default Signup