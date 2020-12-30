const http = require("http");
const url = require("url");
const { insertar, consultar, editar} =
require("./consultas");
const fs = require("fs");

http
.createServer(async (req, res) => {
if (req.url == "/" && req.method === "GET") {
res.setHeader("content-type", "text/html");
const html = fs.readFileSync("index.html", "utf8");
res.end(html);
}

// Paso 1
if ((req.url == "/post" && req.method == "POST")) {
    let body = "";
    req.on("data", (payload) => {
    body += payload;
    });
    req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));
    const respuesta = await insertar(datos);
    res.end(JSON.stringify(respuesta));
    });
    }
    
    // Paso 2
    if (req.url == "/posts" && req.method === "GET") {
        const registros = await consultar();
        fs.writeFileSync("posts.json",JSON.stringify(registros));
        res.end(JSON.stringify(registros));
        }
    
    // Paso 3
    if (req.url == "/post" && req.method == "PUT") {
        const { id } = url.parse(req.url, true).query;
        const respuesta = await editar(id);
        res.end(JSON.stringify(respuesta));
        }

})
.listen(3000);