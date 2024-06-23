import { env } from '$env/dynamic/public'
import { format, parseISO } from 'date-fns';

export const PSQLDateToMonthYear = (psql_date) => {
    const date = parseISO(psql_date);
    return(format(date, "MMMM yyyy"));
}

export function MonthYearToPSQLDate(month, year) {

    const monthMapping = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    };
    
    // Create a Date object for the first day of the given year and month
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);  // month is 0-based, so subtract 1

    // Format the date to YYYY-MM-DD

    console.log(date,year,month,monthMapping[month] - 1);
    try{
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    }
    catch(e){
        console.log(e);
    }

}

export const getApartmentsInArea = async (areaId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/areas/${areaId}/apartments`);
    const data = await response.json();
    return data;
}

export const getAreaName = async (areaId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/areas/${areaId}/name`);
    const data = await response.json();
    return data;
}

export const getApartmentInformation = async (apartmentId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/apartments/${apartmentId}/info`);
    const data = await response.json();
    return data;
}

export const getAreas = async () => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/areas`);
    const data = await response.json();
    return data;
}

export const postReview = async (review) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
        credentials: 'include'
    });
    if (response.status === 200) {
        return await response.json();
    } else {
        return -1;
    }
}


export const getReviews = async (apartmentId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/reviews/${apartmentId}`);
    const data = await response.json();
    return data;

}

export const login = async (username, password) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    });
    return response;
}

export const logout = async () => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    return response;
}

export const validateToken = async () => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/validateToken`,
        {
            method: 'GET',
            credentials: 'include'
        });
    if(response.status === 200){
        return response.json();
    }
    else{
        return -1;
    }
}

export const getUserNameById = async (userId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/users/${userId}`);
    const data = await response.json().then(data => data.name);
    return data;
}

export const addUser = async (email, password, name) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    });
    return response;
}

export const addApartment = async (name, address, description, google_maps_link, apple_maps_link, area_id) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/apartments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, description, google_maps_link, apple_maps_link, area_id }),
    });
    return response;
}

export const deleteApartment = async (apartmentId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/apartments/${apartmentId}`, {
        method: 'DELETE',
    });
    return response;
}

export const setLocalStorageWithUsernameValues = async (username) => {
    try {
        let response = await fetch(`${env.PUBLIC_BACKEND}/users/username/${username}`).catch(error => {
            console.error('Failed to fetch user data:', error);
            // Handle errors e.g., show a user notification, log to an error reporting service, etc.
        });

        console.log(response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the necessary data fields are present
        if (data.name && data.email && data.id && typeof data.admin !== 'undefined' && typeof data.verified !== 'undefined') {
            localStorage.setItem('username', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
            localStorage.setItem('isAdmin', data.admin.toString());
            localStorage.setItem('isVerified', data.verified.toString());
        } else {
            throw new Error('Missing required user data fields');
        }  
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Handle errors e.g., show a user notification, log to an error reporting service, etc.
    }
}

export const getReviewsByUser = async (userId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/reviews/user/${userId}`);
    const data = await response.json();
    console.log(data);
    return data;
}

export const getReview = async (reviewId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/review/${reviewId}`);
    const data = await response.json();
    return data;
}

export const getLeasesByReviewId = async (reviewId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/leases/${reviewId}`);
    const data = await response.json();
    return data;
}

export const addLease = async ( lease) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/leases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lease),
        credentials: 'include'
    });
    return response;
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const getFloorplansByApartmentId = async (apartmentId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/floorplans/${apartmentId}`);
    const data = await response.json();
    return data;
}

export const getFloorplanById = async (floorplanId) => {
    const response = await fetch(`${env.PUBLIC_BACKEND}/floorplan/${floorplanId}`);
    const data = await response.json();
    return data;
}