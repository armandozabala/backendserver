# Backend Server ⚡
 
 REST API
 
 Realizado en Node <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>
 
 Dependencias
 
 * Express
 * Axios
 * Cors
 * dotenv
 * body-parser
 
 La aplicacion por defecto corre en el puerto 3300, esto configurado desde el archivo de ambiente .env, donde se puede manipular la url base del API Mercado Libre, Region, Nombre y Apellido del Author
 
 # Routes
 
 * /api/items
 * /api/items/:id
 
 # Controladores
 
 Se uso los controladores para manejar la logica de las solicitudes que se pidierón en la prueba estas son:
 
 - getItemsBySearch  por query de busqueda
 - getItemsByIdAndDescription   por id de item
 
 
 # Middleware
 
 Se utilizo el middleware para consulta el author de las peticiones
 
 
 # Estructura
 
 [![Screenshot-2.png](https://i.postimg.cc/W4rydnz1/Screenshot-2.png)](https://postimg.cc/kVJsZWW0)
 
 
 # Heroku Server
 
 https://backendserver-meli.herokuapp.com/api/items
 
by 👋 Armando Zabala 
