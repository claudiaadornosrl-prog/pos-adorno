// ═══════════════════════════════════════════════════════════════════════
//  POS Adorno · manual.js — Manual de uso (overlay 📖, autoinyectable)
//  🚨 REGLA: cada vez que se agrega o cambia una función del módulo,
//  actualizar la sección correspondiente acá (y bump del ?v= en index.html).
// ═══════════════════════════════════════════════════════════════════════

function _mEsc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function _manualSecciones() {
  return [
    { icon: '🔐', titulo: 'Entrar y elegir el local', desc: 'Entrás con tu usuario de Colaboradores. Arriba, al lado del título, se elige desde qué local se factura: las vendedoras y encargadas pueden usar su propio local u Oficina (para lo que se factura desde allá), nunca el otro local; el admin elige cualquiera.',
      pasos: ['Lo que emitís sale con el punto de venta y la numeración del local elegido, y aparece en los Comprobantes y la Caja de ese local.', 'Si dice que no tenés acceso, tu legajo no tiene local asignado: avisale a JP.', 'En el celular o la tablet se instala como app: Safari "Compartir → Agregar a pantalla de inicio"; Chrome "Instalar".'] },
    { icon: '🛒', titulo: 'Vender', desc: 'A la izquierda buscás los productos; a la derecha se arma el ticket. Es la pantalla del mostrador.',
      pasos: ['Escribí parte del código o de la descripción y tocá el producto para agregarlo. Se ve la foto (tocándola se agranda), el stock del local y el precio de lista.', 'Con el lector de etiquetas: escaneá el QR con el cursor en el buscador y el artículo entra solo (el QR trae el SKU).', 'En cada renglón podés cambiar la cantidad (+ / −), el precio y un descuento por renglón. Abajo hay un descuento general en %.', 'Arriba elegís qué sale: Factura B (consumidor final, monotributista, IVA exento o no responsable; todos menos consumidor final llevan CUIT), Factura A (responsable inscripto, pide CUIT) o Factura manual (comprobante interno X que no va a ARCA, lo mismo que la factura manual del Dragonfish).', 'El cliente por defecto es Consumidor Final. Tocando la línea del cliente lo buscás por DNI, CUIT o nombre entre los clientes del Dragonfish, o lo cargás a mano.', 'Un renglón con borde ámbar es un artículo sin stock en este local: se vende igual, pero avisá.'] },
    { icon: '💳', titulo: 'Cobrar', desc: 'El botón Cobrar abre los medios de pago. Se pueden combinar varios (por ejemplo parte en efectivo y parte con Point).',
      pasos: ['Tocá el nombre del medio para cargarle lo que falta; o escribí el importe a mano.', 'Tarjeta, link, transferencia y vale piden una referencia (número de cupón, etc.).', 'Si en efectivo cargás más que el total, abajo aparece el Vuelto y la venta queda registrada por el total.', 'Al emitir aparece el ticket: con la impresora se imprime desde el ícono de la impresora. Los medios de pago son los mismos códigos que el Dragonfish (efectivo, MP Point, QR, tarjeta…), así Ventas los suma igual.'] },
    { icon: '🧾', titulo: 'Comprobantes', desc: 'Lista de lo emitido en el local por rango de fechas, con filtro por tipo y buscador por cliente, número o vendedora.',
      pasos: ['El ojo abre el comprobante y permite imprimirlo de nuevo.', 'La flecha hacia atrás arma una nota de crédito (devolución): marcás qué artículos y cuánto devuelve el cliente, y después cómo se le devuelve la plata. La NC lleva la misma letra que la factura; una devolución de una factura manual sale como X.', 'Anular (solo encargada o admin) deja el comprobante tachado con el motivo; no se puede anular si ya tiene notas de crédito, ni uno con CAE (ahí va nota de crédito).', 'Estados: "CAE…" = la factura ya salió y el sistema le está pidiendo el CAE a ARCA (tarda unos segundos; el ticket se actualiza solo y aparece el QR de ARCA); "CAE" = autorizada; "CAE rechazado" = ARCA no la aceptó: el motivo está al pasar el mouse y la flecha ↺ la vuelve a pedir (encargada o admin). "Manual" = factura manual.'] },
    { icon: '💰', titulo: 'Caja', desc: 'Lo cobrado en el día por medio de pago, con totales de facturado y de facturas manuales. Las notas de crédito restan y los anulados no cuentan.',
      pasos: ['Cambiá el día arriba para ver otro.', 'Sirve para el cierre: tiene que coincidir con lo que marca la planilla de Ventas.'] },
    { icon: '⚙', titulo: 'Ajustes (solo admin)', desc: 'Puntos de venta por local (fiscal y manual) y qué medios de pago se ofrecen.',
      pasos: ['Los puntos de venta fiscales son provisorios (91, 90, 92) hasta que ARCA habilite los del POS: cambiar el número acá y la numeración sigue sola desde 1.', 'Un medio de pago apagado deja de aparecer al cobrar; "pide referencia" obliga a cargar el número de cupón.'] },
  ];
}

function abrirManual() {
  if (document.getElementById('manual-overlay')) return;
  const items = _manualSecciones();
  const ov = document.createElement('div');
  ov.id = 'manual-overlay';
  ov.innerHTML = `
    <div class="m-box">
      <div class="m-head">
        <span style="font-size:22px;">📖</span>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:16px;">Manual · POS</div>
          <div style="font-size:12px;opacity:.85;">Guía rápida de cada herramienta del módulo</div>
        </div>
        <button class="m-close" onclick="cerrarManual()">✕</button>
      </div>
      ${items.map((s, i) => `
        <div class="m-sec">
          <div class="m-tit">${s.icon} ${i + 1}. ${_mEsc(s.titulo)}</div>
          <div class="m-desc">${_mEsc(s.desc)}</div>
          <ul class="m-pasos">${s.pasos.map(p => `<li>${_mEsc(p)}</li>`).join('')}</ul>
        </div>`).join('')}
      <div class="m-foot">💡 Este manual se actualiza junto con el sistema. ¿Falta algo o no funciona? Avisale a JP.</div>
    </div>`;
  document.body.appendChild(ov);
  _manualLupa(ov);
  document.body.style.overflow = 'hidden';
}

function cerrarManual() {
  const ov = document.getElementById('manual-overlay');
  if (ov) ov.remove();
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarManual(); });

(function _manualInit() {
  const css = document.createElement('style');
  css.textContent = `
    #manual-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow-y:auto;-webkit-overflow-scrolling:touch;}
    #manual-overlay .m-box{background:#f8fafc;border-radius:14px;max-width:760px;width:100%;padding-bottom:6px;box-shadow:0 20px 60px rgba(0,0,0,.3);}
    #manual-overlay .m-head{position:sticky;top:0;background:#0e7490;color:#fff;padding:14px 18px;border-radius:14px 14px 0 0;display:flex;align-items:center;gap:10px;z-index:1;}
    #manual-overlay .m-close{background:rgba(255,255,255,.18);border:none;color:#fff;font-size:16px;border-radius:8px;padding:6px 11px;cursor:pointer;}
    #manual-overlay .m-sec{background:#fff;border:1px solid #e2e8f0;border-left:4px solid #0e7490;border-radius:10px;margin:14px 14px 0;padding:14px 18px;}
    #manual-overlay .m-tit{font-weight:700;font-size:15px;margin-bottom:4px;color:#155e75;}
    #manual-overlay .m-desc{font-size:13px;color:#475569;margin-bottom:8px;}
    #manual-overlay .m-pasos{margin:0 0 2px 18px;padding:0;font-size:13px;line-height:1.65;color:#334155;}
    #manual-overlay .m-pasos li{margin-bottom:4px;}
    #manual-overlay .m-foot{margin:16px 14px 12px;background:#cffafe;border-left:4px solid #0891b2;border-radius:8px;padding:11px 14px;font-size:12.5px;color:#155e75;}`;
  document.head.appendChild(css);

})();

// ── 🔍 Lupa del manual (29-sep, pedido Contreras): busca por palabra, sin tildes ni mayúsculas.
//    Deja solo las secciones que la contienen, dentro de ellas los pasos que la contienen,
//    y resalta la palabra. Mismo bloque en todos los módulos (el de RRHH usa _mLupaFiltrar).
function _mLupaNorm(s){ return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function _mLupaMarcar(el, q){
  const nodos = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) nodos.push(w.currentNode);
  nodos.forEach(n => {
    const t = n.nodeValue; let norm = '', mapa = [];
    for (let i = 0; i < t.length; i++){ const c = _mLupaNorm(t[i]); for (let k = 0; k < c.length; k++){ norm += c[k]; mapa.push(i); } }
    let desde = 0, pos, frag = null, ult = 0;
    while (q && (pos = norm.indexOf(q, desde)) >= 0){
      frag = frag || document.createDocumentFragment();
      const a = mapa[pos], b = mapa[pos + q.length - 1] + 1;
      if (a > ult) frag.appendChild(document.createTextNode(t.slice(ult, a)));
      const m = document.createElement('mark'); m.textContent = t.slice(a, b);
      m.style.cssText = 'background:#fde047;color:inherit;padding:0 1px;border-radius:3px'; frag.appendChild(m);
      ult = b; desde = pos + q.length;
    }
    if (frag){ if (ult < t.length) frag.appendChild(document.createTextNode(t.slice(ult))); n.parentNode.replaceChild(frag, n); }
  });
}
function _mLupaFiltrar(cont, selSec, texto, info){
  if (!cont) return;
  const q = _mLupaNorm(String(texto || '').trim());
  let vistas = 0;
  cont.querySelectorAll(selSec).forEach(sec => {
    if (sec.dataset.mOrig == null) sec.dataset.mOrig = sec.innerHTML; else sec.innerHTML = sec.dataset.mOrig;
    if (!q){ sec.style.display = ''; return; }
    const lis = [...sec.querySelectorAll('li')];
    const enLis = lis.filter(li => _mLupaNorm(li.textContent).includes(q));
    const hay = _mLupaNorm(sec.textContent).includes(q);
    sec.style.display = hay ? '' : 'none';
    if (!hay) return;
    vistas++;
    if (enLis.length) lis.forEach(li => { if (!enLis.includes(li)) li.style.display = 'none'; });
    _mLupaMarcar(sec, q);
  });
  if (info) info.textContent = !q ? '' : vistas ? `${vistas} ${vistas === 1 ? 'sección' : 'secciones'} con «${String(texto).trim()}»` : `No encontré «${String(texto).trim()}» en el manual.`;
  const primera = q && cont.querySelector('mark');
  if (primera) primera.scrollIntoView({block: 'center', behavior: 'smooth'});
}
function _manualLupa(ov){
  const head = ov && ov.querySelector('.m-head'); if (!head) return;
  head.style.flexWrap = 'wrap';
  const box = document.createElement('div');
  box.style.cssText = 'flex-basis:100%;display:flex;gap:8px;align-items:center;margin-top:8px';
  box.innerHTML = '<input type="search" placeholder="🔍 Buscar en el manual (por ej.: equivalencias, remito, echeq)…" '
    + 'style="flex:1;min-width:0;padding:8px 11px;border-radius:9px;border:none;font-size:14px;color:#0f172a;font-family:inherit">'
    + '<span class="m-lupa-info" style="font-size:12px;opacity:.9;white-space:nowrap"></span>';
  head.appendChild(box);
  const inp = box.querySelector('input'), info = box.querySelector('.m-lupa-info');
  let t = null;
  inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => _mLupaFiltrar(ov, '.m-sec', inp.value, info), 250); });
  inp.addEventListener('keydown', e => { if (e.key === 'Escape' && inp.value){ e.stopPropagation(); inp.value = ''; _mLupaFiltrar(ov, '.m-sec', '', info); } });
  setTimeout(() => inp.focus(), 50);
}
