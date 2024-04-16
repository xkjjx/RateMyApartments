export const getApartmentsInArea = async (areaId) => {
    const response = await fetch(`http://localhost:3000/areas/${areaId}/apartments`);
    const data = await response.json();
    return data;
}

export const getAreaName = async (areaId) => {
    const response = await fetch(`http://localhost:3000/areas/${areaId}/name`);
    const data = await response.json();
    return data;
}

export const getApartmentInformation = async (apartmentId) => {
    const response = await fetch(`http://localhost:3000/apartments/${apartmentId}/info`);
    const data = await response.json();
    return data;
}

export const getAreas = async () => {
    const response = await fetch('http://localhost:3000/areas');
    const data = await response.json();
    return data;
}

export const postReview = async (review) => {
    // try {
        const response = await fetch('http://localhost:3000/reviews', {
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
    // } catch (error) {
    //     console.error('Error posting review:', error);
    //     return -1; // Or handle the error differently as needed
    // }
}


export const getReviews = async (apartmentId) => {
    const response = await fetch(`http://localhost:3000/reviews/${apartmentId}`);
    const data = await response.json();
    return data;

}

export const login = async (username, password) => {
    const response = await fetch('http://localhost:3000/login', {
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
    const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'
    });
    return response;
}

export const validateToken = async () => {
    const response = await fetch('http://localhost:3000/validateToken',
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
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json().then(data => data.name);
    return data;
}

export const addUser = async (email, password, name) => {
    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    });
    return response;
}