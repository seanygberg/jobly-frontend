import React from 'react';

const JobCard = ({ job }) => {
    const [error, setError] = useState(null);
    const [isApplied, setIsApplied] = useState(appliedJobs.includes(job.id));

    const handleApply = async () => {
        try {
            if (isApplied) return; 
            await JoblyApi.applyToJob(job.id); 
            setIsApplied(true); 
            setAppliedJobs([...appliedJobs, job.id]);
        } catch (err) {
            setError("Unable to apply for this job.");
        }
    };

    return (
        <div className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.companyHandle}</p>
            <p><strong>Salary:</strong> {job.salary ? `$${job.salary}` : "Not Provided"}</p>
            <p><strong>Equity:</strong> {job.equity ? `${job.equity}%` : "Not Provided"}</p>
        </div>

        <button onClick={handleApply} disabled={isApplied} style={{ backgroundColor: isApplied ? 'gray' : 'white' }}>
            {isApplied ? "Applied" : "Apply"}
        </button>
    );
};

export default JobCard;
