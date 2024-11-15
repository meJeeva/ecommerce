import { BASE_URL } from "../utils/constants";

const getAllCategoriesApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/category/get-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching categories:", error.message || error);
        return null;
    }
};

const getAllOfferBannerApi = async (type) => {
    try {
        const response = await fetch(`${BASE_URL}/banner/get-all?type=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching categories:", error.message || error);
        return null;
    }
};

const getAllLanguagesApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/language/get-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching categories:", error.message || error);
        return null;
    }
};

const getAllSubCategoriesApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/subcategory/get-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching categories:", error.message || error);
        return null;
    }
};

export { getAllCategoriesApi, getAllOfferBannerApi, getAllLanguagesApi, getAllSubCategoriesApi };
