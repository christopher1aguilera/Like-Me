const { Pool } = require("pg");
const pool = new Pool({
    user: "chris",
    host: "localhost",
    database: "likeme",
    password: "chris1997",
    port: 5432,
});
// Paso 1
const insertar = async (datos) => {
    const consulta = {
    text: "INSERT INTO posts (usuario, url, descripcion, likes) values($1, $2, $3, $4) RETURNING *",
    values: datos,
    };
    try {
    const result = await pool.query(consulta);
    return result.rows[0];
    } catch (error) {
    console.log(error.code);
    return error;
    }
    };
    
    // Paso 2
    const consultar = async (datos) => {
        try {
        const result = await pool.query("SELECT * FROM posts");
        return result.rows;
        } catch (error) {
        console.log(error.code);
        return error;
        }
        };    
        
    // Paso 3
    const editar = async (datos) => {
        const consulta = {
        text: `UPDATE candidatos SET nombre = $1, foto = $2 WHERE id = $3 RETURNING *`,
        values: datos,
        };
        try {
        const result = await pool.query(consulta);
        return result.rows;
        } catch (error) {
        console.log(error);
        return error;
        }
        };
module.exports = { insertar, consultar, editar};