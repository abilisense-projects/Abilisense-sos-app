// import Geolocation from '@react-native-community/geolocation';
// import LimitedQueue from './limitedQueue';

// const locationsQueue = new LimitedQueue(10);
// let locationInterval; // Variable to store the interval reference


// const findUserLocation = () => {
//     return new Promise((resolve, reject) => {
//         Geolocation.getCurrentPosition(
//             position => {
//                 const { latitude, longitude } = position.coords;
//                 console.log('lat--', latitude)
//                 console.log('lon--', longitude)
//                 resolve({ latitude, longitude });
//             },
//             error => {
//                 console.log('Error:', error.message);
//                 reject(error);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     });
// };


// export function ListenLocationButton(status) {



//     // Function to be executed at intervals for location checking
//     async function checkLocation() {
//         console.log('Checking location...'); // Placeholder action, replace with actual location checking logic
//         const location =await findUserLocation();
//         console.log("location:", location)
//         locationsQueue.enqueue(location);
//         console.log("queue", locationsQueue.queue);
//     }
//     // Check status and perform actions accordingly
//     if (status === true) {
//         // Start checking location every minute
//         console.log('Location checking started...');
//         locationInterval = setInterval(checkLocation, 60000); // Start checking location every minute
//     } else {
//         // Stop checking location
//         console.log('Location checking stopped.');
//         clearInterval(locationInterval); // Stop the location checking interval
//     }
// }


import Geolocation from '@react-native-community/geolocation';
import LimitedQueue from './limitedQueue';
import { useEffect, useRef } from 'react';

const locationsQueue = new LimitedQueue(10);
const findUserLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log('lat--', latitude);
                console.log('lon--', longitude);
                resolve({ latitude, longitude });
            },
            error => {
                console.log('Error:', error.message);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
};

export function ListenLocationButton(status) {
    // const locationInterval = useRef(null);

    useEffect(() => {
        async function checkLocation() {
            console.log('Checking location...');
            if (status) {
                const location = await findUserLocation();
                console.log("location:", location);
                locationsQueue.enqueue(location);
                console.log("queue", locationsQueue.queue);
            }
            console.log('Location checking stopped.');
            clearInterval(locationInterval.current);
            return;

            // const location = await findUserLocation();
            // console.log("location:", location);
            // locationsQueue.enqueue(location);
            // console.log("queue", locationsQueue.queue);
        }

        if (!status) {
            console.log('Location checking started...');
            locationInterval.current = setInterval(checkLocation, 30000);
        } else {
            console.log('Location checking stopped.');
            clearInterval(locationInterval.current);
        }

        // Cleanup on unmount or status change
        return () => clearInterval(locationInterval.current);
    }, [status]);
}



// import Geolocation from '@react-native-community/geolocation';
// import LimitedQueue from './limitedQueue';
// import { useEffect, useRef } from 'react';

// const locationsQueue = new LimitedQueue(10);

// // let locationInterval; // Declare the interval outside the function
// let shouldCheckLocation = false; // Flag to control checking location

// const findUserLocation = () => {
//     return new Promise((resolve, reject) => {
//         Geolocation.getCurrentPosition(
//             position => {
//                 const { latitude, longitude } = position.coords;
//                 console.log('lat--', latitude)
//                 console.log('lon--', longitude)
//                 resolve({ latitude, longitude });
//             },
//             error => {
//                 console.log('Error:', error.message);
//                 reject(error);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     });
// };

// export function ListenLocationButton(status) {
//     const locationInterval = useRef(null);

//     useEffect(() => {
//         async function checkLocation() {
//             console.log('Checking location...');
//             if (!shouldCheckLocation) {
//                 console.log('Location checking stopped.');
//                 clearInterval(locationInterval);
//                 return;
//             }
//             const location = await findUserLocation();
//             console.log("location:", location)
//             locationsQueue.enqueue(location);
//             console.log("queue", locationsQueue.queue);
//         }
//         if (status) {
//             console.log('Location checking started...');
//             locationInterval.current = setInterval(checkLocation, 30000);
//         } else {
//             console.log('Location checking stopped.');
//             clearInterval(locationInterval.current);
//         }

//         // Cleanup on unmount or status change
//         return () => clearInterval(locationInterval.current);
//     }, [status]);
// }


// export function ListenLocationButton(status) {
//     // Function to be executed at intervals for location checking
//     async function checkLocation() {
//         console.log('Checking location...');
//         if (!shouldCheckLocation) {
//             console.log('Location checking stopped.');
//             clearInterval(locationInterval);
//             return;
//         }

//         const location = await findUserLocation();
//         console.log("location:", location)
//         locationsQueue.enqueue(location);
//         console.log("queue", locationsQueue.queue);
//     }

//     // Check status and perform actions accordingly
//     if (status === true) {
//         // Start checking location every minute
//         console.log('Location checking started...');
//         shouldCheckLocation = true;
//         locationInterval = setInterval(checkLocation, 30000);
//     } else {
//         // Stop checking location
//         shouldCheckLocation = false;
//     }
// }




