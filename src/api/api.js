import {BASE_URL} from '../utils/constants';

const getProductCategory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json(); 
    return data; 
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error; 
  }
};

export {getProductCategory};
