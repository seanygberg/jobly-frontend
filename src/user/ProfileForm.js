import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../UserContext";

const ProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                username: currentUser.username,
            });
        }
    }, [currentUser]);

    const [formData, setFormData] = ({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    async function handleSubmit(event) {
        event.preventDefault();
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        let username = formData.username;
        let newUser = await JoblyApi.editProfile(username, profileData);

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
        });
        setCurrentUser(newUser);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default ProfileForm;
