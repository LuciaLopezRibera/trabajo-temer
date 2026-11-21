// JavaScript con los datos de los cultivos - Responsable: Elsa Blasco Novell


// LOS CULTIVOS TENEMOS QUE PONERLOS EN ORDEN ALFABETICO PARA QUE TODO VAYA BIEN (ASI LO HE PROGRAMADO)
// En siembra y cosecha pongo el numero del mes (1=enero, 12=diciembre)



const cultivos = [

    {id:"berenjena",  
        nombre: "Berenjena", 
        tipo: "Verdura", 
        temporada: "verano",    
        color:"morado",    
        imagen: "berenjena.jpg",
        siembra: [3, 4], 
        cosecha: [7, 8, 9, 10]
    },
        

    {id: "calabacin",
        nombre: "Calabacín", 
        tipo: "Verdura",
        temporada: "verano",
        color: "verde",    
        imagen: "calabacin.jpg",
        siembra: [4, 5], 
        cosecha: [7, 8, 9]
    },

    {id: "calabaza",  
        nombre: "Calabaza",  
        tipo: "Verdura", 
        temporada: "otoño",     
        color: "naranja",  
        imagen: "calabaza.jpg",
        siembra: [5], 
        cosecha: [10, 11]
    },

    {id: "cereza",    
        nombre: "Cereza",    
        tipo: "Fruta",   
        temporada: "primavera", 
        color: "rojo",     
        imagen: "cereza.jpg",
        frutal: true, // al ser una fruta se plantan, no se siembran
        siembra: [], 
        cosecha: [5, 6, 7]
    },

    {id: "coliflor",  
        nombre: "Coliflor",  
        tipo: "Verdura", 
        temporada: "invierno",  
        color: "blanco",   
        imagen: "coliflor.jpg",
        siembra: [5, 6, 7, 8, 9], 
        cosecha: [10, 11, 12, 1, 2]
    },

    {id: "fresa",     
        nombre: "Fresa",     
        tipo: "Fruta",   
        temporada: "primavera", 
        color: "rojo",     
        imagen: "fresa.jpg",
        siembra: [2, 3, 4], 
        cosecha: [6, 7, 8, 9, 10]
    },

    {id: "guisantes", 
        nombre: "Guisantes", 
        tipo: "Verdura", 
        temporada: "primavera", 
        color: "verde",    
        imagen: "guisantes.jpg",
        siembra: [9, 10, 11], 
        cosecha: [12, 1, 2]
    },

    {id: "lechuga",   
        nombre: "Lechuga",   
        tipo: "Verdura", 
        temporada: "invierno",  
        color: "verde",    
        imagen: "lechuga.jpg",
        siembra: [3, 4, 5, 6, 7, 8], 
        cosecha: [6, 7, 8, 9, 10, 11]
    },

    {id: "limon",     
        nombre: "Limón",     
        tipo: "Fruta",   
        temporada: "invierno",  
        color: "amarillo", 
        imagen: "limon.jpg",
        frutal: true, 
        siembra: [], 
        cosecha: [10, 11, 12, 1, 2, 3, 4, 5, 6, 7]
    },

    {id: "naranja",   
        nombre: "Naranja",   
        tipo: "Fruta",   
        temporada: "invierno",  
        color: "naranja",  
        imagen: "naranja.jpg",
        frutal: true, 
        siembra: [], 
        cosecha: [9, 10, 11, 12, 1, 2, 3, 4, 5]
    },

    {id: "pimiento",  
        nombre: "Pimiento",  
        tipo: "Verdura", 
        temporada: "verano",    
        color: ["rojo", "verde", "amarillo", "naranja"], 
        imagen: "pimiento.jpg",
        siembra: [2, 3], 
        cosecha: [6, 7, 8, 9, 10]
    },

    {id: "sandia",    
        nombre: "Sandía",    
        tipo: "Fruta",   
        temporada: "verano",    
        color: ["rojo", "verde"],    
        imagen: "sandia.jpg",
        siembra: [3, 4, 5], 
        cosecha: [6, 7, 8, 9]
    },

    {id: "tomate",    
        nombre: "Tomate",    
        tipo: "Verdura", 
        temporada: "verano",    
        color: "rojo",     
        imagen: "tomate.jpg",
        siembra: [4, 5, 6], 
        cosecha: [6, 7, 8, 9, 10]
    },

    {id: "uva",      
        nombre: "Uva",       
        tipo: "Fruta",   
        temporada: "otoño",     
        color: ["morado", "verde"],   
        imagen: "uva.jpg", 
        frutal: true, 
        siembra: [], 
        cosecha: [8, 9, 10, 11, 12]
    }

];