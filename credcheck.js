function checkLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

     const sqlPatterns = [
        "' OR '1'='1",
        "' OR 1=1 --",
        "'; DROP TABLE users; --",
        "admin' --",
        "' OR 'x'='x",
        "' UNION SELECT",
        "'; EXEC xp_cmdshell",
        "'; WAITFOR DELAY"
    ];

    if (sqlPatterns.some(pattern => username.includes(pattern) || password.includes(pattern))) {
        message.innerHTML = "Nice try wise guy. 😉";
        message.style.color = "red";
        console.log("🚨 SQL Injection attempt detected!", { username, password });
    } else {
        message.innerHTML = "Bad username or password.";
        message.style.color = "white";
    }
}
