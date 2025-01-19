const CACHE_NAME = "app-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/assets/BeijaFlor.png",
  "/assets/FlorDoAmor.jpeg",
  "/assets/FlorVermelha.jpeg",
  "/assets/Girassol.jpeg",
  "/assets/imgDiv1TelaInicial.webp",
  "/assets/imgDiv2TelaInicial.jpg",
  "/assets/imgDiv3TelaInicial.jpg",
  "/assets/imgLogin.png",
  "/assets/Passaro.jpeg",
  "/assets/Tucano.jpeg",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error("Erro ao adicionar arquivos ao cache:", error);
        throw error;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Ativando...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ignorar requisições do ambiente de desenvolvimento (Vite e seus arquivos dinâmicos)
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith("/@vite/") ||
      url.pathname.startsWith("/@react-refresh") ||
      url.pathname.startsWith("/src/"))
  ) {
    console.log("Ignorando requisição do ambiente de desenvolvimento:", url.pathname);
    return;
  }

  console.log("Interceptando requisição para:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Servindo do cache:", event.request.url);
        return cachedResponse;
      }

      console.log("Recurso não encontrado no cache. Tentando buscar na rede...");
      return fetch(event.request).catch(() => {
        console.warn("Falha na rede. Retornando fallback para:", event.request.url);

        // Fallback para rotas SPA ou navegação
        if (event.request.mode === "navigate") {
          console.log("Retornando index.html como fallback para navegação.");
          return caches.match("/index.html");
        }

        // Fallback genérico para outros recursos
        return new Response(
          "Recurso não disponível offline.",
          { status: 404, statusText: "Not Found" }
        );
      });
    })
  );
});
