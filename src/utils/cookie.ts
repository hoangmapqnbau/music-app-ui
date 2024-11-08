const setCookie  = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = JSON.parse(atob(base64));

  const currentTime = Math.floor(Date.now() / 1000);
  const expTime = jsonPayload.exp;

  const remainingTime = (expTime - currentTime) * 1000;

  if (remainingTime > 0) {
    const expires = new Date();
    expires.setTime(expires.getTime() + remainingTime);

    document.cookie = `authentication=${token};expires=${expires.toUTCString()}; SameSite=Strict; path=/`;
  }
};

function getCookie(name = 'authentication') {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export { setCookie , getCookie };
