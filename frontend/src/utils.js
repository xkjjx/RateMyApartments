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
    const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    return response;
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