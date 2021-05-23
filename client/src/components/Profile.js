 import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Home.css'
import { storage } from "./firebase";

function Profile() {

    const { getUser, user } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [uploading, setUploading] = useState('')

    const [file, setFile] = useState(null);
    const [url, setURL] = useState(user.url);

    useEffect(() => {
        getUser()
    }, [])

    const updateData = async (id) => {
        const user = {
            username, email, password, confirmPassword
        }
        const resp = await axios.put(`/private/updateprofile/${id}`, user)
        if(resp.data.success){
            NotificationManager.success('Profile Updated Successfully', '', 1200);
        } else{
            NotificationManager.error(resp.data.error, '', 1200);
        }
        getUser()
    }

    function handleChange(e) {
        setFile(e.target.files[0]);
    }
    
    function handleUpload(e) {
    setUploading('Uploading...')
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
        storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
            setFile(null);
            setURL(url);
            axios.put('/private/uploadprofile', { url })
            setUploading('')
        })
    })}

    return (
        <div className="container center">
        <br /><br /><br />
            <NotificationContainer />
    
            <img src={url} style={{ borderRadius: '50%', marginTop: '-40px' }} height='135px' width="135px" alt="Image Faild to Load" />
            <div className="center" style={{ fontSize: '18px' }}>
                <b className="#bf360c deep-orange-text text-darken-4" style={{ fontFamily: 'KoHo', fontSize: '20px' }}>Username : </b> <span style={{ fontFamily: 'Farro' }}>{user.username}</span> <br />
                <b className="#bf360c deep-orange-text text-darken-4" style={{ fontFamily: 'KoHo', fontSize: '20px' }}>Email ID : </b> <span style={{ fontFamily: 'Farro' }}>{user.email}</span><br />
                <b className="#bf360c deep-orange-text text-darken-4" style={{ fontFamily: 'KoHo', fontSize: '20px' }}>Followers : </b> <span style={{ fontFamily: 'Farro' }}>{user.followers.length}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className="#bf360c deep-orange-text text-darken-4" style={{ fontFamily: 'KoHo', fontSize: '20px'  }}>Following : </b> <span style={{ fontFamily: 'Farro' }}>{user.following.length}</span><br />
            </div>
            <br />
            <div>
                <form onSubmit={handleUpload}>
                    <input type="file" className="btn #009688 teal waves-effect waves-light" onChange={handleChange} /><br /><br />
                    <button className="btn red waves-effect waves-light" disabled={!file}>Upload</button><br />
                    {uploading}
                </form>
            </div>
            <br />
            <div>
                <h5 style={{ fontFamily: 'KoHo', fontWeight: 'bold', fontSize: '25px' }}>Update Profile</h5>
                <form>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} /><br />
                </form>
                <button onClick={() => updateData(user._id)} className="btn waves-effect waves-light #4a148c purple darken-4">Update</button>
            </div>
        </div>
    )
}

export default Profile
