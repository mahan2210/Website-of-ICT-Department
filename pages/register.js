import React, { useState } from 'react'
import Layout from '../components/Layout'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Link from 'next/link'
import { signup } from '../utils/fetcher'
import { useContext } from 'react'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { LockOpen } from '@mui/icons-material'

const Register = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [warn, setWarn] = useState(false)

  const router = useRouter ()

  const {state, dispatch} = useContext(Store)

  const [form, setForm] = useState (
    {
      username:'',
      email: '',
      password: '',
      city: '',
      country: '',
      phone: '',
      designation: ''
    }
  )

  console.log(form)
  
  const {
    username,
    email,
    password,
    phone,
    city,
    country,
    designation
  } = form

  const handleChange = (e) => {
    setForm( {...form, [e.target.name]: e.target.value} )
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    signup(username, email, password, phone, country, city, designation).then( response => {

    dispatch({ type: 'REGISTER', payload: response.message})

    setForm( {
      username:'',
      email: '',
      password: '',
      city: '',
      country: '',
      phone: '',
      designation: ''
    } )

    if(response.message==="User created, please Log in"){
      router.push("/login")
      enqueueSnackbar('You are signed up please login', {variant: 'success'})
    }else{
      enqueueSnackbar('Please give proper credentials', {variant: 'error'})
    }

    })
  }

  return (
    <Layout>
        <div className='my-[10rem] min-h-screen'>
          <div className="flex justify-center">
            <div className="bg-[#FFF8EA] rounded-lg space-y-5 py-2 px-10">
              <div>
                <div className="flex justify-center p-8">
                  <span className="text-[#FFF8EA] bg-[#594545] p-4 rounded-full"><LockOpen /></span>
                </div>
                    <TextField
                    label="Username" variant="outlined"
                    className="w-[25rem]"
                    name='username'
                    multiline
                    maxRows={4}
                    value={form.username}
                    onChange={handleChange}
                    />
                  </div>
                
                  <div>
                    <TextField
                    label="Email" variant="outlined"
                    className="w-[25rem]"
                    name='email'
                    multiline
                    maxRows={4}
                    value={form.email}
                    onChange={handleChange}
                    />
                  </div>
                  <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  </div>
                  <div>
                    <TextField
                    label="Enter your City" variant="outlined"
                    className="w-[25rem]"
                    name='city'                 
                    multiline
                    maxRows={4}
                    value={form.city}
                    onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextField
                    label="Enter your country" variant="outlined"
                    className="w-[25rem]"
                    name='country'                    
                    multiline
                    maxRows={4}
                    value={form.country}
                    onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextField
                    label="Enter contact number" variant="outlined"
                    className="w-[25rem]"
                    name='phone'                   
                    multiline
                    maxRows={4}
                    value={form.phone}
                    onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextField
                    label="Designation" variant="outlined"
                    className="w-[25rem]"
                    name='designation'
                    multiline
                    maxRows={4}
                    value={form.designation}
                    onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-center py-10">
                    <Button type='submit' onClick={handleSubmit} className="bg-[#594545]" variant="contained">Register</Button>
                  </div>
                  <Link href="/login" >Already registerd? Login here</Link>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Register