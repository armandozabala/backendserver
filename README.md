# Backend Server 
 
 REST API
 
 Realizado en Node
 
 Dependencias
 
 Express
 Axios
 Cors
 Dotenv
 body-parser
 
 La aplicacion por defecto corre en el puerto 3300, esto configurado desde el archivo de ambiente .env, donde se puede manipular la url base del API Mercado Libre, Region, Nombre y Apellido del Author
 
 #Routes
 
 /api/items
 /api/items/:id
 
 #Controladores
 
 Se uso los controladores para manejar la logica de las solicitudes que se pidierón en la prueba estas son:
 
 getItemsBySearch  por query de busqueda
 getItemsByIdAndDescription   por id de item
 
 
 #Middleware
 
 Se utilizo el middleware para consulta el author de las peticiones
 
