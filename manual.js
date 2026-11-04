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
      pasos: ['Lo que emitís sale con el punto de venta y la numeración del local elegido, y aparece en los Comprobantes y la Caja de ese local.', 'Si dice que no tenés acceso, tu legajo no tiene local asignado: avisale a JP.', 'Código del celular (doble factor): si sos admin o directora y lo activaste en el Hub (panel de sesión, "Código del celular al entrar"), en cada computadora te pide, después de la clave, el código de 6 números de la app de autenticación del celular (Google o Microsoft Authenticator), y después una vez cada 30 días. En el celular registrado con "Entrar con la cara en este equipo" no hace falta ni clave ni código: te pide la cara (o la huella) al abrir. Si cambiás o perdés el celular, avisale a JP para darlo de baja.', 'En el celular o la tablet se instala como app: Safari "Compartir → Agregar a pantalla de inicio"; Chrome "Instalar".'] },
    { icon: '🛒', titulo: 'Vender', desc: 'A la izquierda buscás los productos; a la derecha se arma el ticket. Es la pantalla del mostrador.',
      pasos: ['Escribí parte del código o de la descripción: arriba a la izquierda aparece la ficha del primer resultado (foto grande, descripción, material, proveedor, stock en cada local y precio) y abajo la lista. Pasando el mouse por otro de la lista la ficha cambia; tocándolo, o con el botón Agregar de la ficha, entra al ticket. En el ticket cada renglón muestra una miniatura de la foto.', 'Con el lector de etiquetas: escaneá el QR con el cursor en el buscador y el artículo entra solo (el QR trae el SKU).', 'En cada renglón podés cambiar la cantidad (+ / −), el precio y un descuento por renglón. Abajo hay un descuento general en %.', 'Arriba elegís qué sale con las pastillas FC B, FC A, FC Manual, NC B, NC A y Presupuesto: Factura B (consumidor final, monotributista, IVA exento, no responsable o no alcanzado; todos menos consumidor final llevan CUIT), Factura A (responsable inscripto, pide CUIT), Factura manual (comprobante interno X que no va a ARCA), las notas de crédito B y A (devoluciones) y Presupuesto (no es venta: no va a ARCA ni a la caja, y después se factura desde Comprobantes con el botón de cobrar).', 'Nota de crédito: elegís la pastilla y abajo aparece un cuadro naranja para buscar la factura que devuelve (número como 35-2, DNI o nombre del cliente). Al tocarla entran sus artículos al ticket: sacá o bajá la cantidad de lo que no vuelve. El cliente es el mismo de la factura y no se cambia. Abajo elegís cómo se le devuelve la plata.', 'El ticket arranca sin cliente: en el cuadro Cliente se carga el DNI o CUIT (tipeado o escaneando el DNI con el lector). Si existe lo trae; si no, abre la ficha para darlo de alta. Ver la sección Clientes.', 'Un renglón con borde ámbar es un artículo sin stock en este local: se vende igual, pero avisá.'] },
    { icon: '👤', titulo: 'Clientes', desc: 'Todas las ventas llevan cliente: así queda en nuestra base para mandarle la factura, saludarlo en el cumpleaños y saber qué compra. Se identifica por DNI o CUIT, nunca por un código.',
      pasos: ['En el cuadro Cliente del ticket escribí el DNI (7 u 8 dígitos) o el CUIT (11) y Enter, o pasá el DNI por el lector de códigos (lee el código de atrás del DNI, también el DNI viejo): trae apellido, nombre, fecha de nacimiento y sexo solos. Si el cursor estaba en el buscador de artículos, también lo detecta.', 'Si el cliente ya está en la base, aparece en el ticket. Si no, se abre la ficha: con * es obligatorio (documento, apellido o razón social y mail, porque por ahí se le manda la factura); celular, dirección, fecha de nacimiento y condición de IVA se pueden completar otro día. El celular se guarda en formato WhatsApp.', 'Con CUIT el POS consulta solo el padrón de ARCA y trae razón social, condición de IVA y domicilio. Responsable inscripto → factura A; monotributista, exento, no responsable o no alcanzado → factura B con CUIT.', 'Tocando el cliente en el ticket (o el lápiz) se abre la ficha para corregirla. A la izquierda muestra desde cuándo es cliente, cuántas compras lleva y qué se llevó la última vez (con foto): sirve para charlar con el cliente, por ejemplo preguntarle cómo le resultó lo que compró. La cruz lo saca del ticket. La lupa busca por nombre si no tenés el documento.', 'Abajo del tope de ARCA la factura B sale a "Consumidor Final" sin datos aunque el cliente esté cargado: a ARCA no va nada y el cliente queda vinculado en nuestra base (en Comprobantes se ve con 👤). Si el cliente pide la factura con sus datos, marcá "a su nombre". Desde el tope (hoy $10.000.000, el sistema lo relee en ARCA todos los meses) la factura va identificada sí o sí.', 'Si cobrás sin cliente, el POS pregunta: "Cargar cliente" o "Seguir como Consumidor Final". Queda registrado qué ventas salieron sin cliente.', 'Lo que se carga o corrige también se manda al Dragonfish hasta fin de diciembre, para que los dos sistemas tengan lo mismo.'] },
    { icon: '💳', titulo: 'Cobrar', desc: 'La forma de pago está a la vista en el ticket, abajo de los totales. Se pueden combinar varios medios (por ejemplo parte en efectivo y parte con Point).',
      pasos: ['Cada renglón tiene un desplegable para elegir el medio y el importe. Con un solo renglón el importe se sugiere solo con el total. Para pagos combinados (parte efectivo, parte tarjeta) tocá el "+" al final del primer renglón: el renglón nuevo trae lo que falta.', 'Tarjeta, link, transferencia y vale piden una referencia (número de cupón, etc.).', 'Si en efectivo cargás más que el total, abajo aparece el Vuelto y la venta queda registrada por el total.', 'El botón de abajo dice qué va a emitir (factura B, A, manual o NC) y se habilita cuando lo pagado cubre el total. Al emitir aparece el ticket: con la impresora se imprime desde el ícono de la impresora. Los medios de pago son los mismos códigos que el Dragonfish (efectivo, MP Point, QR, tarjeta…), así Ventas los suma igual.'] },
    { icon: '🧾', titulo: 'Comprobantes', desc: 'Lista de lo emitido en el local por rango de fechas, con filtro por tipo y buscador por cliente, número o vendedora.',
      pasos: ['El ojo abre el comprobante y permite imprimirlo de nuevo.', 'La flecha hacia atrás arma la nota de crédito de esa factura: te lleva a Vender con sus artículos cargados para sacar lo que no vuelve y elegir cómo se devuelve la plata. La NC lleva la misma letra que la factura; una devolución de una factura manual sale como NC manual.', 'Anular (solo encargada o admin) deja el comprobante tachado con el motivo; no se puede anular si ya tiene notas de crédito, ni uno con CAE (ahí va nota de crédito).', 'Estados: "CAE…" = la factura ya salió y el sistema le está pidiendo el CAE a ARCA (tarda unos segundos; el ticket se actualiza solo y aparece el QR de ARCA); "CAE" = autorizada; "CAE rechazado" = ARCA no la aceptó: el motivo está al pasar el mouse y la flecha ↺ la vuelve a pedir (encargada o admin). "Manual" = factura manual.'] },
    { icon: '💰', titulo: 'Caja', desc: 'Lo cobrado en el día por medio de pago, con totales de facturado y de facturas manuales. Las notas de crédito restan y los anulados no cuentan.',
      pasos: ['Cambiá el día arriba para ver otro.', 'Sirve para el cierre: tiene que coincidir con lo que marca la planilla de Ventas.'] },
    { icon: '⚙', titulo: 'Ajustes (solo admin)', desc: 'Puntos de venta por local (fiscal y manual) y qué medios de pago se ofrecen.',
      pasos: ['Puntos de venta fiscales del POS en ARCA: 0033 Alcorta, 0034 Unicenter, 0035 Oficina; si se cambia el número la numeración sigue sola desde 1.', 'Un medio de pago apagado deja de aparecer al cobrar; "pide referencia" obliga a cargar el número de cupón.', 'Tope de ARCA para identificar al consumidor final: se muestra con la fecha de la última lectura; no se carga a mano, lo relee el servicio del CAE una vez por mes en la página de ARCA y avisa acá si no pudo.'] },
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
