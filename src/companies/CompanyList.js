import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCompanies() {
            let companies = await JoblyApi.getCompanies();
            setCompanies(companies);
        };

        loadCompanies();
    }, []); 

    const fetchCompanies = async () => {
        try {
            const companiesData = await JoblyApi.getCompanies(search);
            setCompanies(companiesData);
        } catch (err) {
            setError("Error fetching companies.");
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    console.log(companies);

    if (error) return <div>{error}</div>;
    
    return (
        <div>
            <input
                type="text"
                placeholder="Search for companies"
                value={search}
                onChange={handleSearchChange}
            />
            <div className="company-list">
                {companies.map(company => (
                    <CompanyCard key={company.handle} company={company} />
                ))}
            </div>
        </div>
    );
};

export default CompanyList;
