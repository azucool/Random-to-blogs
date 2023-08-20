addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  const html = (urlCount) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>随机访问博客</title>
      <style>
          body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f2f2f2;
              font-family: Arial, sans-serif;
          }
          button {
              position: absolute;
              top: 30%;
              padding: 20px 40px;
              font-size: 20px;
              cursor: pointer;
              background-color: #4CAF50; /* Green */
              border: none;
              color: white;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              transition-duration: 0.4s;
              border-radius: 12px;
          }
          button:hover {
              background-color: white;
              color: black;
          }
          #urlCount {
              position: absolute;
              top: 45%;
              font-size: 14px;
              color: gray;
          }
      </style>
      <script>
          async function fetchAndRedirect() {
              const response = await fetch('/getRandomUrl', { method: 'POST' });
              const url = await response.text();
              window.location.href = url;
          }
      </script>
  </head>
  <body>
      <button onclick="fetchAndRedirect()">随机访问博客</button>
      <p id="urlCount">当前系统博客数量：${urlCount}</p>
  </body>
  </html>
  `;
  
  /**
  * Respond to the request
  * @param {Request} request
  */
  async function handleRequest(request) {
    if (request.method === 'POST' && request.url.endsWith('/getRandomUrl')) {
      const keys = await blogurl.list();
      const randomKey = keys.keys[Math.floor(Math.random() * keys.keys.length)];
      const url = await blogurl.get(randomKey.name);
      return new Response(url, { status: 200 });
    }
    
    const keys = await blogurl.list();
    return new Response(html(keys.keys.length), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }
  