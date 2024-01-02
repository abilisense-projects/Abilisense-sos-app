// import React from 'react';
// import { Text, View } from 'react-native';

// const LocationButton = () => {

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Hello</Text>
//         </View>
//     ) 
// }
// export default LocationButton;

// export function LocationButton(status) {
//     //need to go to DB every minitues and set the location arry
//     //if status is on/off 

// }

// export function LocationButton(status) {
//     // Check status and perform actions accordingly
//     if (status==true) {
//         // Start checking location every minute
//         console.log('Location checking started...');
//         // Implement the logic for checking location at intervals here
//     } else {
//         // Stop checking location
//         console.log('Location checking stopped.');
//         // Implement logic to stop location checks, if needed
//     }
// }

// This function handles the behavior of a location button based on the 'status' parameter.
// This function handles the behavior of a location button based on the 'status' parameter.


export function LocationButton(status) {
    let locationInterval; // Variable to store the interval reference

     // Function to be executed at intervals for location checking
     function checkLocation() {
        console.log('Checking location...'); // Placeholder action, replace with actual location checking logic
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



