import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function DailyPaintSales() {
    const [formData, setFormData] = useState({
        category: '',
        subcategory: '',
        paintName: '',
        liters: '1',
        customerName: '',
        mobileNumber: '',
        pcId: '',
        dateTime: new Date().toLocaleString(),
    });

    const categories = {
        Style: {
            "Interior Emulsion": ["Color Fresh", "Color Smart", "Color Smart Shine", "Super Bright", "Super Smooth"],
            "Interior Primer": ["Pro Hide Primer", "Pro Fresh Primer", "Pro White Primer"],
            "Exterior Emulsion": ["Power Fit", "Power Bright", "Power Bright Shine"],
            "Exterior Primer": ["perfect start Primer"],
        },
        Calista: {
            "Interior Emulsion": ["Ever Clear", "Ever Wash", "Ever Wash Shine", "Ever Clear Matt", "Ever stay"],
            "Interior Primer": ["Pro White Primer", "Pro white Cement ST Primer"],
            "Exterior Emulsion": ["Neo Star", "Neo Star Shine"],
            "Exterior Primer": ["Perfect Choice Primer"],
        },
        One: {
            "Interior Emulsion": ["Pure Elegance", "Pure Elegance Shine", "Pure Elegance Shine", "Pure Elegance Matt", "Pure Legend"],
            "Interior Primer": ["pro smooth Primer"],
            "Exterior Emulsion": ["True Look", "True Life", "True Vision"],
        },
        WP: {
            "Interior": ["Alldry Total 2k", "Alldry Total 2k Flex", "Alldry salt seal"],
            "Exterior": ["Alldry Wall n Roof 12", "Alldry Wall n Roof 10", "Alldry Wall fix 4"],
            "Repairs": ["Alldry Crack Master Paste", "Alldry Repair Master"],
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
            const formattedTime = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setFormData(prevData => ({
                ...prevData,
                dateTime: `${formattedDate}, ${formattedTime}`
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to post sales data');
            }
            const data = await response.json();
            console.log('Sales data posted successfully:', data);
        } catch (error) {
            console.error('Error posting sales data:', error);
        }
    };
    
    return (
        <div className="form-container">
            <h2>Daily Paint Sales</h2>
            <p>{formData.dateTime}</p>
            <form onSubmit={handleSubmit}>
                <label>Category:</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {Object.keys(categories).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {formData.category && (
                    <>
                        <label>Subcategory:</label>
                        <select name="subcategory" value={formData.subcategory} onChange={handleChange}>
                            <option value="">Select Subcategory</option>
                            {Object.keys(categories[formData.category]).map(subcategory => (
                                <option key={subcategory} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                    </>
                )}

                {formData.subcategory && (
                    <>
                        <label>Paint Name:</label>
                        <select name="paintName" value={formData.paintName} onChange={handleChange}>
                            <option value="">Select Paint Name</option>
                            {categories[formData.category][formData.subcategory].map(paint => (
                                <option key={paint} value={paint}>{paint}</option>
                            ))}
                        </select>
                    </>
                )}

                <label>Liters:</label>
                <select name="liters" value={formData.liters} onChange={handleChange}>
                    <option value="1">1 L</option>
                    <option value="4">4 L</option>
                    <option value="10">10 L</option>
                    <option value="20">20 L</option>
                </select>

                <label>Contractor/Customer Name:</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter name"
                />

                <label>Mobile Number:</label>
                <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                />

                <label>PC Id:</label>
                <input
                    type="text"
                    name="pcId"
                    value={formData.pcId}
                    onChange={handleChange}
                    placeholder="Enter PC Id"
                />

                <label>Date and Time:</label>
                <input type="text" value={formData.dateTime} readOnly />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DailyPaintSales;
