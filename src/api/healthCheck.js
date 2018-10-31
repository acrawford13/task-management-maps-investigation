export default () =>
  fetch(`${process.env.REACT_APP_BASE_API_URL}/api/internal/health_check`)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return true;
    })
    .catch(error => {
      throw new Error(error);
    });
