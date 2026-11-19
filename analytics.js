/* =====================================================================
   BHR Constructores · Medición (Google Analytics 4) · archivo único
   1) Cree su propiedad GA4 en https://analytics.google.com (gratis).
   2) Copie su "ID de medición" (empieza por G-) y péguelo abajo.
   3) Suba este archivo a GitHub. No hay que tocar ninguna página .html.
   ===================================================================== */
var BHR_GA4_ID = "G-XXXXXXXXXX";   // <-- PEGUE AQUÍ SU ID DE MEDICIÓN GA4

(function () {
  if (!/^G-[A-Z0-9]{6,}$/.test(BHR_GA4_ID) || BHR_GA4_ID === "G-XXXXXXXXXX") return; // sin ID: no mide nada
  var s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + BHR_GA4_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", BHR_GA4_ID);

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
