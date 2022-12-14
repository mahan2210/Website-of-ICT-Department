import { LocationCitySharp, Logout, MailOutline, Phone } from '@mui/icons-material'
import { Avatar, TextField, Button, InputLabel, MenuItem, FormControl } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/store'
import { postPub, postNotice } from '../utils/fetcher'
import { useSnackbar } from 'notistack'
import Select from '@mui/material/Select'
import CustomizedTables from '../components/Table'

const Dash = () => {

    const router = useRouter()

    const [publications, setPublications] = useState([])

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const { state, dispatch } = useContext(Store)
    console.log(state.userInfo)

    const handleChangePub = (e) => {
        setPub({
            ...pub, [e.target.name]: e.target.value
        })
    }

    const [pub, setPub] = useState({
        titleP: '',
        author: '',
        published: '',
        journal: '',
        userId: state.userInfo._id,
        url: ''
    })

    const [notice, setNotice] = useState({
        title: '',
        message: '',
        regards: '',
        date: '',
        batch: '',
        userId: state.userInfo._id,
    })

    const handleSubNotice = async () => {
        if (notice.message && notice.regards && notice.title && notice.batch && notice.date) {
            const mes = await postNotice(notice.title, notice.message, notice.regards, notice.batch, notice.date, notice.userId)
            enqueueSnackbar(mes.message, { variant: 'success' })
            setNotice({
                title: '',
                message: '',
                regards: '',
                date: '',
                batch: '',
                userId: state.userInfo._id,
            })
        } else {
            enqueueSnackbar('please fill required fields', { variant: 'error' })
        }
    }

    const handleSubPub = async () => {
        if (pub.titleP && pub.author && pub.published && pub.journal && pub.url && pub.researchType) {
            const mes = await postPub(pub.titleP, pub.author, pub.url, pub.journal, pub.published, pub.userId, pub.researchType)
            enqueueSnackbar(mes.message, { variant: 'success' })
            setPub({
                titleP: '',
                researchType: '',
                author: '',
                published: '',
                journal: '',
                userId: state.userInfo._id,
                url: ''
            })
        } else {
            enqueueSnackbar('please fill required fields', { variant: 'error' })
        }
    }

    const handleChangeNotice = (e) => {
        setNotice({
            ...notice, [e.target.name]: e.target.value
        })
    }



    useEffect(() => {
        if (!state.userInfo._id) {
            router.push("/")
        } else {
            fetch(`https://ict-6.vercel.app/api/publications/${state.userInfo._id}`).then(res => res.json()).then(data => setPublications(data))
            console.log(publications)
        }
    }, [state.userInfo._id, pub])

    return (
        <Layout>
            <div className="flex">
                <div className="w-[20rem] bg-[#112D4E] min-h-screen mt-[5rem]">
                    <div className="p-4 flex space-x-4 items-center">
                        <Avatar />
                        <p>{state.userInfo.username}</p>
                    </div>
                    <div className="p-4 flex space-x-4 items-center">
                        <p><MailOutline /> {state.userInfo.email}</p>
                    </div>
                    <div className="p-4 flex space-x-4 items-center">
                        <p><LocationCitySharp /> {state.userInfo.city}</p>
                    </div>
                    <div className="p-4 flex space-x-4 items-center">
                        <p><Phone /> {state.userInfo.phone}</p>
                    </div>
                    <div className="p-4 flex space-x-4 items-center cursor-pointer">
                        <p onClick={() => { dispatch({ type: "CLEAR_USER" }) }}><Logout /> Log out</p>
                    </div>
                </div>
                <div className="min-h-screen mt-22 w-screen bg-[#EEEEEE] flex justify-evenly mt-[5rem]">
                    {state.userInfo.isAdmin &&
                        <>
                            <div className='p-20 space-y-5'>
                                <div>
                                    <h1 className="text-black">Update Notices</h1>
                                </div>
                                <div className="">
                                    <TextField
                                        className="w-[20rem]"
                                        label="Title"
                                        variant="outlined"
                                        name='title'
                                        value={notice.title}
                                        multiline
                                        onChange={handleChangeNotice}
                                    />
                                </div>
                                <div className="">
                                    <TextField
                                        className="w-[20rem]"
                                        id="outlined-multiline-static"
                                        name='message'
                                        value={notice.message}
                                        label="Brief"
                                        multiline
                                        rows={4}
                                        placeholder="Type here"
                                        onChange={handleChangeNotice}
                                    />
                                </div>
                                <div className="">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={notice.batch}
                                            name='batch'
                                            label="Age"
                                            onChange={handleChangeNotice}
                                        >
                                            <MenuItem value={'first'}>first</MenuItem>
                                            <MenuItem value={'second'}>second</MenuItem>
                                            <MenuItem value={'third'}>third</MenuItem>
                                            <MenuItem value={'fourth'}>fourth</MenuItem>
                                            <MenuItem value={'MS'}>MS</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label>
                                        date
                                    </label>
                                    <TextField
                                        className="w-[17rem]"
                                        type="date"
                                        name="date"
                                        value={notice.date}
                                        onChange={handleChangeNotice}
                                    />
                                </div>
                                <div className="">
                                    <TextField
                                        className="w-[20rem]"
                                        label="Regards"
                                        variant="outlined"
                                        name='regards'
                                        multiline
                                        value={notice.regards}
                                        onChange={handleChangeNotice}
                                    />
                                </div>
                                <div className="flex py-4">
                                    <Button className="!bg-[#594545]" onClick={handleSubNotice} variant="contained">Post</Button>
                                </div>
                            </div></>}
                    <div className='p-20 space-y-5'>
                        <div>
                            <h1 className="text-black">Update publications</h1>
                        </div>
                        <div className="">
                            <TextField
                                className="w-[20rem]"
                                label="Title"
                                placeholder='publication title'
                                variant="outlined"
                                name='titleP'
                                value={pub.titleP}
                                multiline
                                onChange={handleChangePub}
                            />
                        </div>
                        <div className="">
                            <TextField
                                className="w-[20rem]"
                                label="Author"
                                placeholder='Author name'
                                variant="outlined"
                                name='author'
                                multiline
                                value={pub.author}
                                onChange={handleChangePub}
                            />
                        </div>
                        <div className="">
                            <TextField
                                className="w-[20rem]"
                                label="url"
                                placeholder='https://yourwebsitesurl.com'
                                variant="outlined"
                                name='url'
                                multiline
                                value={pub.url}
                                onChange={handleChangePub}
                            />
                        </div>
                        <div className="">
                            <TextField
                                className="w-[20rem]"
                                label="journal"
                                placeholder='https://yourwebsitesurl.com'
                                variant="outlined"
                                name='journal'
                                multiline
                                value={pub.journal}
                                onChange={handleChangePub}
                            />
                        </div><div className="">
                            <TextField
                                className="w-[20rem]"
                                label="researchType"
                                placeholder='Thesis/Conference paper/Journal'
                                variant="outlined"
                                name='researchType'
                                multiline
                                value={pub.researchType}
                                onChange={handleChangePub}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label>
                                Published date
                            </label>
                            <TextField
                                className="w-[12rem]"
                                type="date"
                                name="published"
                                value={pub.published}
                                onChange={handleChangePub}
                            />
                        </div>
                        <div className="flex py-2">
                            <Button className="!bg-[#594545]" onClick={handleSubPub} variant="contained">Post</Button>
                        </div>
                        {publications.length > 0 &&
                            <div className='flex-col items-center'>
                                <h1 className="text-black">Your publications</h1>
                                <CustomizedTables datas={publications} />
                            </div>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dash