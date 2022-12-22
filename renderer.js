const appInfo = document.getElementById("app-info")
appInfo.innerText = `Chrome version: ${versions.chrome()} Node version: ${versions.node()} Election version: ${versions.electron()}`