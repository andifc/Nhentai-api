## Nhentai API

  

### Descripción

Esta API proporciona acceso a datos relacionados con anime a través de varias rutas. Permite obtener información sobre anime populares, recientes, comics, imágenes y realizar búsquedas.

### Uso básico

La API se puede acceder mediante solicitudes HTTP a la dirección base del servidor junto con la ruta correspondiente para cada función específica.

  

### Rutas Disponibles

  

1.  **`GET /populars`**

- Obtiene los mangas H populares de Nhentai.

  

2.  **`GET /recents`**

- Obtiene los últimos lanzamientos de manga H de Nhentai.

  

3.  **`GET /comic?c={code}`**

- Obtiene onformacion del Manga/Comic H con su codigo.

  

4.  **`GET /search?q={query}`**

- Busca Manga/Comic por título.

  

5.  **`GET /images?c={code}`**

- Obtiene todas las imagenes del Manga/Comic.

  


### Respuestas

- Todas las respuestas se devuelven en formato JSON.

- Los códigos de estado de HTTP se utilizan para indicar el resultado de la solicitud.

- En caso de error, se devuelve un objeto JSON con un mensaje de error explicativo.

  
