import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api/api";
import UserContext from "./UserContext";

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

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        let username = formData.username;
        let newUser;

        try {
            newUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
        });
        setFormErrors([]);
        setCurrentUser(newUser);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
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
            {formErrors.length > 0 && (
                <div>
                    <ul>
                        {formErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit">Save</button>
        </form>
    );
}

export default ProfileForm;
