import React from "react";

const ShowActiveAlerts = ({ user }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientId = user._id;
                const response = await axios.get(`${SERVER_BASE_URL}/api/alerts/get-active-alerts-by-patient-id/${patientId}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
        </>
    )
}

export default ShowActiveAlerts;