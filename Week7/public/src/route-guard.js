(() => {
    const isAuth = getStorage('asAuth');
    if (!isAuth) {
        logout();
        alert('Log in to view your tasks.');
        window.location.href = './login.html';
    }
})();