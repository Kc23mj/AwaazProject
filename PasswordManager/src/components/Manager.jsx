import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const [passwordArray, setPasswordArray] = useState([])
    const [form, setform] = useState({ email: "", username: "", password: "" })
    const ref = useRef()
    const passRef = useRef()




    const getPassword = async () => {
        let req = await fetch("http://127.0.0.1:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPassword()
    }, [])

    const showpassword = () => {
        // alert('show password')
        if (ref.current.src.includes("/icons/cross.png")) {
            ref.current.src = "/icons/open.png"
            passRef.current.type = "text"
        }
        else {
            ref.current.src = "/icons/cross.png"
            passRef.current.type = "password"

        }

    }
    const savePassword = async () => {
        // console.log(form)

        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])

        // await fetch("http://127.0.0.1:3000/", {
        //     method: "DELETE",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ id: form.id})



        // })
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!emailPattern.test(form.email) && !passwordPattern.test(form.password)) {
            toast('Invalid format!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }
        else {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://127.0.0.1:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })



            })
            setform({ email: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }

    const editPassword = async (id) => {
        console.log(`pass with id ${id} is edited`)
        setform((passwordArray.filter(item => item.id === id)[0]))
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        await fetch("http://127.0.0.1:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ id: id })
            }
        })

    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password??")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            console.log([...passwordArray, form])
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            fetch("http://127.0.0.1:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    body: JSON.stringify({ id: id })
                }
            })
        }
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })

    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

        navigator.clipboard.writeText(text);
    }

    return (<>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"

        />
        {/* Same as */}
        <ToastContainer />
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>


        <div className=' bg-slate-50 md:mycontainer'>
            <h1 className='font-bold text-center '><span className='text-green-500 '>&times; </span><span>Ba</span><span className='text-green-500'>LoMo</span> <span className='text-green-500'> &times;</span></h1>
            <p className='text-green-400 text-center'>( You'll fall in love with our <span className='text-black'>password manager )</span></p>
            <div className='text-black flex flex-col p-4 gap-3 items-center'>
                <input value={form.email} name="email" onChange={handleChange} placeholder="Enter Your Email" className='rounded-full border border-green-500 w-full px-4 py-1' type="text" />
                <div className='flex flex-col md:flex-row gap-3 w-full'>
                    <input value={form.username} name="username" onChange={handleChange} placeholder="Enter your Username" className='rounded-full border border-green-500 w-full px-4 py-1' type="text" />
                    <div className="relative">
                        <span className="absolute right-1.5 top-[7px] cursor-pointer" onClick={showpassword}>
                            <img ref={ref} width={22} src="/icons/cross.png" alt="" />
                        </span>
                        <input ref={passRef} value={form.password} name="password" onChange={handleChange} placeholder="Enter Password" className='rounded-full border border-green-500 w-full px-4 py-1' type="password" />
                    </div>

                </div>
                <button onClick={savePassword} className='flex justify-center items-center bg-green-600 rounded-full w-fit px-3 py-2 hover:bg-green-500'>
                    <lord-icon
                        src="https://cdn.lordicon.com/pdsourfn.json"
                        trigger="hover"
                    >
                    </lord-icon>
                    Login
                </button>
            </div>
            <div>
                <div className='font-bold p-2'>show Passwords</div>
                {passwordArray.length === 0 && "No passwords to show"}
                {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                    <thead className='bg-green-700 text-white' >
                        <tr>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-200 '>
                        {passwordArray.map((item, index) => {
                            
                            return <tr key={index}>
                                <td className='text-center p-2 border border-white'><span>{item.email}</span>
                                    <div className='flex justify-center items-center cursor-pointer' >

                                        <svg className='hover:size-5' onClick={() => { copyText(item.email) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="black">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" fill="#006400" />
                                        </svg>


                                    </div>

                                </td>
                                <td className='text-center p-2 border border-white'>{item.username}
                                    <div className='flex justify-center items-center cursor-pointer' >

                                        <svg className='hover:size-5 ' onClick={() => { copyText(item.username) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="black">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" fill="#006400" />
                                        </svg>



                                    </div>

                                </td>
                                <td className='text-center p-2 border border-white'><span>{"*".repeat(item.password[0].length)}</span>
                                    <div className='flex justify-center items-center cursor-pointer  ' >

                                        <svg className='hover:size-5' onClick={() => { copyText(item.password) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="black">
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" fill="#006400" />
                                        </svg>



                                    </div>
                                </td>



                                <td className=' flex flex-col items-center gap-1 justify-center text-center p-2 border border-white'>
                                    <span>
                                        <svg className='cursor-pointer' onClick={() => { deletePassword(item.id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M9.5 16.5L9.5 10.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M14.5 16.5L14.5 10.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </span>

                                    <span><svg className='cursor-pointer' onClick={() => { editPassword(item.id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    </span>
                                </td>
                            </tr>
                        })}


                    </tbody>
                </table>}
            </div>
        </div>



    </>
    )
}

export default Manager
