FROM node:latest

WORKDIR /app

#copiar dependencias 
COPY package*.json ./

#Instalar dependencias
RUN npm install

#Copiar el resto de la app
COPY . .

#Comandos de ejecucion
CMD ["npm","start"]



