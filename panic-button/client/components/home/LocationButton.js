import Geolocation from '@react-native-community/geolocation';


export function ListenLocationButton(status) {
    let locationInterval; // Variable to store the interval reference

     // Function to be executed at intervals for location checking
     function checkLocation() {
        console.log('Checking location...'); // Placeholder action, replace with actual location checking logic
        findUserLocation();
        //write to the arry the location
        //need to delete the first location if grader then 10
    }
    // Check status and perform actions accordingly
    if (status === true) {
        // Start checking location every minute
        console.log('Location checking started...');
        locationInterval = setInterval(checkLocation, 60000); // Start checking location every minute
    } else {
        // Stop checking location
        console.log('Location checking stopped.');
        clearInterval(locationInterval); // Stop the location checking interval
    }

   
}

const findUserLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            // setLocation({ latitude: latitude, longitude: longitude });
            // getAddressFromCoordinates(latitude, longitude);
        },
        error => {
            console.log('Error:', error.message);
            // Handle error
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};



