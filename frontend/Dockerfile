FROM node:18

# 1. Define a pasta de trabalho
WORKDIR /app

# 2. Copia o package.json e package-lock.json primeiro (melhor para cache de Docker)
COPY package*.json ./

# 3. Instala dependências (antes de copiar tudo para evitar rebuild desnecessário)
RUN npm install

# 4. Agora copia o resto da app (inclui src/, public/, jsconfig.json, etc.)
COPY . .

# 5. Garante que o jsconfig.json está lá (opcional se já copiaste tudo)
# COPY jsconfig.json ./  ← já incluído no COPY acima

RUN ls -l config-overrides.js
RUN cat config-overrides.js


# 6. Faz o build
RUN npm run build

# 7. Expõe a porta e inicia a app com serve
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]