/* =====================================================================
   BHR Constructores · Medición (Google Analytics 4) · archivo único
   1) Cree su propiedad GA4 en https://analytics.google.com (gratis).
   2) Copie el ID de la etiqueta de Google (GTM-...) o el ID de medición (G-...) y péguelo abajo.
   3) Suba este archivo a GitHub. No hay que tocar ninguna página .html.
   ===================================================================== */
var BHR_GA4_ID = "G-Q1VJEFEECM";   // <-- ID de la etiqueta de Google (GTM-...) o de medición GA4 (G-...)

(function () {
  var id = BHR_GA4_ID;
  var esGTM = /^GTM-[A-Z0-9]{4,}$/.test(id), esG = /^G-[A-Z0-9]{6,}$/.test(id) && id !== "G-XXXXXXXXXX";
  if (!esGTM && !esG) return; // sin ID válido: no mide nada
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  var s = document.createElement("script");
  s.async = true;
  if (esGTM) {
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + id;   // etiqueta de Google (incluye GA4)
  } else {
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    gtag("config", id);
  }
  document.head.appendChild(s);

  /* Conversiones: formulario enviado (Web3Forms) y solicitud de maquinaria por WhatsApp */
  window.addEventListener("bhr:lead", function (e) {
    var d = e.detail || {};
    gtag("event", "generate_lead", { metodo: d.metodo || "", servicio: d.servicio || "", currency: "COP", value: 1 });
  });

  /* Clics de contacto: WhatsApp, teléfono y correo */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a"); if (!a) return;
    var h = a.getAttribute("href") || "", pag = location.pathname;
    if (a.classList.contains("js-wa") || h.indexOf("wa.me") > -1) gtag("event", "clic_whatsapp", { pagina: pag });
    else if (h.indexOf("tel:") === 0) gtag("event", "clic_telefono", { pagina: pag });
    else if (h.indexOf("mailto:") === 0) gtag("event", "clic_correo", { pagina: pag });
  }, true);
})();
