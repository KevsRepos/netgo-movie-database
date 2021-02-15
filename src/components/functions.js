export const fetchAPI = async (url, data) => {
  const res = await fetch("http://localhost/api/" + url + ".php", {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data)
    });

    return res.json();
}