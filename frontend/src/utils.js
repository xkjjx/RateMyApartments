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