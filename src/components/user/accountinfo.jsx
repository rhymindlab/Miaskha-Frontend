import { useState, useEffect } from "react";
import { updateUserDetails } from "../../lib/User";

export default function AccountInfo({ user, setUser }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        mobile: "",
        email: "",
    });

    useEffect(() => {
        if (!user) return;

        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            userName: user.userName || "",
            mobile: user.mobile || "",
            email: user.email || "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit() {
        try {
            const data = await updateUserDetails({
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobile: formData.mobile,
            });

            setUser(data.user);

            alert(data.message);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        <div className="p-4 flex flex-col gap-4 text-sm">

            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-bold">First Name</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-bold">Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold">Username</label>
                <input
                    value={formData.userName}
                    readOnly
                    className="border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
            </div>

            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-bold">Phone</label>
                    <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-bold">Email</label>
                    <input
                        value={formData.email}
                        readOnly
                        className="border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>
            </div>

            <div>
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                >
                    Save Changes
                </button>
            </div>

        </div>
    );
}