export const GetFetch = async (url: string, token: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al hacer la petición GET:', error);
    throw error;
  }
};
export const PatchFetch = async (url: string, token: string, body: object) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error en la petición: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al hacer la petición PATCH:', error);
    throw error;
  }
};

export const PostFetch = async (url: string, token: { body: any; url: any }, body: object) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error en la petición: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al hacer la petición POST:", error);
    throw error;
  }
};
