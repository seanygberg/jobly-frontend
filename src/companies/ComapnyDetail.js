import React, { useEffect, useState } from "react";
import JoblyApi from "../api";  // Make sure to import the API to fetch company details

const CompanyDetail = () => {

    const { handle } = useParams(); 
    const [company, setCompany] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const data = await JoblyApi.getCompany(handle);
                setCompany(data);
            } catch (err) {
                setError("Company not found.");
            }
        }
        getDetail();
    }, [handle]);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{company?.name}</h1>
            <p>{company?.description}</p>
            <p>{company?.numEmployees} employees</p>
        </div>
    );
}


export default CompanyDetail;