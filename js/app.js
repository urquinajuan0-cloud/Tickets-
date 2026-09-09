const DEFAULT_LOGO = "assets/logo.png";
/* ================= ESTADO ================= */
let state = {
  schoolName: "Institución Educativa Municipal Montessori",
  welcome: "¡Bienvenidos a nuestra comunidad educativa! Aquí acompañamos a niñas, niños y jóvenes de Pitalito en un camino de ciencia, desarrollo y arte, con puertas abiertas para toda la familia Montessori.",
  adminPass: "Montessori2026*",
  coordPass: "Turnos2026",
  theme:{
    navyDeep:"#0B2A4A", celeste:"#6EC1E4", gold:"#F5D68C", mint:"#BFE3D0",
    crestRed:"#C23B32", bgPastel:"#EAF4FB", fontDisplay:"Fraunces", fontBody:"Manrope", animationsOn:true
  },
  bios: [
    {name:"Fundadora del colegio", role:"Memoria institucional", text:"Historia por completar: cuéntanos aquí quién impulsó la creación de nuestra institución en 2004 y su legado para la comunidad Montessori."},
    {name:"Rector(a) actual", role:"Dirección institucional", text:"Historia por completar: comparte una breve reseña de la persona que lidera hoy el proyecto educativo del colegio."}
  ],
  customTabs: [],
  teachers: [
    {id:"doc-1", password:"laura123", activo:true, name:"Laura Ramírez", area:"Primaria — Ciencias Naturales", schedule:[
      {day:"Lunes", hours:"2:00 pm – 3:00 pm", tipo:"Padres de familia"},
      {day:"Martes", hours:"2:00 pm – 3:00 pm", tipo:"Estudiantes"},
      {day:"Miércoles", hours:"2:00 pm – 3:00 pm", tipo:"Padres de familia"},
      {day:"Jueves", hours:"2:00 pm – 3:00 pm", tipo:"Estudiantes"},
      {day:"Viernes", hours:"10:00 am – 11:00 am", tipo:"Padres y estudiantes"}
    ]},
    {id:"doc-2", password:"carlos123", activo:true, name:"Carlos Muñoz", area:"Bachillerato — Matemáticas", schedule:[
      {day:"Lunes", hours:"1:00 pm – 2:00 pm", tipo:"Estudiantes"},
      {day:"Martes", hours:"1:00 pm – 2:00 pm", tipo:"Padres de familia"},
      {day:"Miércoles", hours:"1:00 pm – 2:00 pm", tipo:"Estudiantes"},
      {day:"Jueves", hours:"1:00 pm – 2:00 pm", tipo:"Padres de familia"},
      {day:"Viernes", hours:"9:00 am – 10:00 am", tipo:"Padres y estudiantes"}
    ]},
    {id:"doc-3", password:"diana123", activo:true, name:"Diana Torres", area:"Preescolar — Guía Montessori", schedule:[
      {day:"Lunes", hours:"3:00 pm – 4:00 pm", tipo:"Padres de familia"},
      {day:"Martes", hours:"3:00 pm – 4:00 pm", tipo:"Padres de familia"},
      {day:"Miércoles", hours:"3:00 pm – 4:00 pm", tipo:"Estudiantes"},
      {day:"Jueves", hours:"3:00 pm – 4:00 pm", tipo:"Padres de familia"},
      {day:"Viernes", hours:"11:00 am – 12:00 pm", tipo:"Padres y estudiantes"}
    ]},
    {id:"doc-4", password:"andres123", activo:true, name:"Andrés Salazar", area:"Bachillerato — Sociales", schedule:[
      {day:"Lunes", hours:"2:00 pm – 3:00 pm", tipo:"Estudiantes"},
      {day:"Martes", hours:"2:00 pm – 3:00 pm", tipo:"Estudiantes"},
      {day:"Miércoles", hours:"2:00 pm – 3:00 pm", tipo:"Padres de familia"},
      {day:"Jueves", hours:"2:00 pm – 3:00 pm", tipo:"Padres de familia"},
      {day:"Viernes", hours:"10:00 am – 11:00 am", tipo:"Padres y estudiantes"}
    ]},
    {id:"doc-5", password:"marcela123", activo:true, name:"Marcela Ortiz", area:"Primaria — Lengua Castellana", schedule:[
      {day:"Lunes", hours:"1:00 pm – 2:00 pm", tipo:"Padres de familia"},
      {day:"Martes", hours:"1:00 pm – 2:00 pm", tipo:"Padres de familia"},
      {day:"Miércoles", hours:"1:00 pm – 2:00 pm", tipo:"Estudiantes"},
      {day:"Jueves", hours:"1:00 pm – 2:00 pm", tipo:"Estudiantes"},
      {day:"Viernes", hours:"9:00 am – 10:00 am", tipo:"Padres y estudiantes"}
    ]},
    {id:"doc-6", password:"julian123", activo:true, name:"Julián Rojas", area:"Bachillerato — Educación Física", schedule:[
      {day:"Lunes", hours:"4:00 pm – 5:00 pm", tipo:"Estudiantes"},
      {day:"Martes", hours:"4:00 pm – 5:00 pm", tipo:"Padres de familia"},
      {day:"Miércoles", hours:"4:00 pm – 5:00 pm", tipo:"Estudiantes"},
      {day:"Jueves", hours:"4:00 pm – 5:00 pm", tipo:"Padres de familia"},
      {day:"Viernes", hours:"11:00 am – 12:00 pm", tipo:"Padres y estudiantes"}
    ]}
  ],
  logoUrl: "",
  contactInfo: {telefono:"", correo:"", direccion:""},
  cursos: ["Preescolar","1°","2°","3°","4°","5°","6°","7°","8°","9°","10°","11°"],
  turnos: [],
  nextTurnoNum: 1,
  audit: [],
  turnoConfig:{
    horaIni:"08:00",
    horaFin:"16:00",
    duracion:20,
    maxPorPersona:2,
    dias:["Lunes","Martes","Miércoles","Jueves","Viernes"],
    tipos:["Estudiante","Padre/madre/acudiente","Docente","Otro"],
    motivos:["Matrícula","Convivencia escolar","Boletines","Citación","Permiso","Orientación escolar","Otro"],
    permitirCancelacionPublica:true
  },
  emailConfig:{serviceId:"", templateId:"", publicKey:"", enabled:false},
  auditPass:"Historial-MT-2026*"
};
let isAdmin = false;
let isCoord = false;
let soundOn = true;
let dbReady = false;
const avatarColors = ["#123A63","#6EC1E4","#C23B32","#3fa66b","#e0a83e","#7a5fc4","#2f8fae"];

/* ================= BASE DE DATOS (Supabase / PostgreSQL) ================= */
function updateDbStatusBadge(){
  const dot = document.getElementById('dbDot');
  const text = document.getElementById('dbStatusText');
  if(!dot || !text) return;
  if(dbReady){
    dot.classList.add('on');
    text.textContent = 'Conectado a la base de datos en la nube — los cambios se guardan';
  }else{
    dot.classList.remove('on');
    text.textContent = 'Sin base de datos configurada — los cambios no se guardarán al recargar';
  }
}
window.addEventListener('supabase-ready', async ()=>{
  dbReady = !!(window.__sb && window.__sb.ready);
  updateDbStatusBadge();
  if(dbReady){
    await loadStateFromCloud();
    await loadTurnosFromCloud();
    subscribeTurnos();
    await loadAuditFromCloud();
    subscribeAudit();
  }
});

/* ---- Configuración general del sitio (tabla site_state, un solo registro JSONB) ---- */
async function loadStateFromCloud(){
  try{
    const {supabase} = window.__sb;
    const {data, error} = await supabase.from('site_state').select('data').eq('id','main').maybeSingle();
    if(error) throw error;
    if(data && data.data){
      Object.assign(state, data.data);
      refreshAllUI();
    }
  }catch(e){
    console.warn('No se pudo cargar el sitio desde la nube:', e);
  }
}
let saveTimeout = null;
function queueSaveState(){
  if(!dbReady) return;
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveStateToCloud, 700);
}
async function saveStateToCloud(){
  if(!dbReady) return;
  try{
    const {supabase} = window.__sb;
    const toSave = {
      schoolName: state.schoolName,
      welcome: state.welcome,
      adminPass: state.adminPass,
      coordPass: state.coordPass,
      auditPass: state.auditPass,
      theme: state.theme,
      bios: state.bios,
      customTabs: state.customTabs,
      teachers: state.teachers,
      logoUrl: state.logoUrl,
      contactInfo: state.contactInfo,
      cursos: state.cursos,
      turnoConfig: state.turnoConfig,
      emailConfig: state.emailConfig
    };
    const {error} = await supabase.from('site_state').upsert({id:'main', data: toSave, updated_at: new Date().toISOString()});
    if(error) throw error;
  }catch(e){
    console.warn('No se pudo guardar en la nube:', e);
    toast('⚠️ No se pudo guardar en la nube');
  }
}

/* ---- Turnos: cada turno es su PROPIA fila en la tabla 'turnos'.
   Nunca se sobrescribe un turno completo con datos de otro: cada acción
   (confirmar, cancelar, reprogramar...) actualiza solo su propia fila. ---- */
function computeCodigo(t){
  return `MT-${String(t.numero).padStart(4,'0')}`;
}
function fromDbTurno(row){
  const t = {
    id: row.id,
    numero: row.numero,
    nombre: row.nombre,
    tipo: row.tipo,
    curso: row.curso || '',
    motivo: row.motivo,
    fecha: row.fecha,
    hora: (row.hora || '').slice(0,5),
    estado: row.estado,
    observaciones: row.observaciones || '',
    destino: row.destino,
    docenteId: row.docente_id || null,
    creado: row.creado
  };
  t.codigo = computeCodigo(t);
  return t;
}
function toDbTurno(t){
  return {
    id: t.id,
    nombre: t.nombre,
    tipo: t.tipo,
    curso: t.curso || null,
    motivo: t.motivo,
    fecha: t.fecha,
    hora: t.hora,
    estado: t.estado,
    observaciones: t.observaciones || '',
    destino: t.destino,
    docente_id: t.docenteId || ''
  };
}
/** Crea un turno. Si hay conexión a Supabase, el número de turno lo asigna la base de
 *  datos (columna autoincremental), lo que garantiza que nunca se repita aunque varias
 *  personas soliciten turno al mismo tiempo. Sin conexión, usa un contador local de respaldo. */
async function createTurno(partial){
  if(dbReady){
    try{
      const {supabase} = window.__sb;
      const {data, error} = await supabase.from('turnos').insert(toDbTurno(partial)).select().single();
      if(error) throw error;
      return fromDbTurno(data);
    }catch(e){
      console.warn('No se pudo guardar el turno en la nube, quedará solo en este navegador:', e);
    }
  }
  const numero = state.nextTurnoNum++;
  const t = {...partial, numero, creado: new Date().toISOString()};
  t.codigo = computeCodigo(t);
  return t;
}
async function updateTurnoRemote(id, patch){
  if(!dbReady) return;
  try{
    const {supabase} = window.__sb;
    const dbPatch = {};
    if('estado' in patch) dbPatch.estado = patch.estado;
    if('observaciones' in patch) dbPatch.observaciones = patch.observaciones;
    if('fecha' in patch) dbPatch.fecha = patch.fecha;
    if('hora' in patch) dbPatch.hora = patch.hora;
    const {error} = await supabase.from('turnos').update(dbPatch).eq('id', id);
    if(error) throw error;
  }catch(e){ console.warn('No se pudo actualizar el turno en la nube:', e); }
}
async function loadTurnosFromCloud(){
  try{
    const {supabase} = window.__sb;
    const {data, error} = await supabase.from('turnos').select('*').order('fecha', {ascending:true}).order('hora', {ascending:true});
    if(error) throw error;
    state.turnos = (data || []).map(fromDbTurno);
    if(document.getElementById('coordConsole').classList.contains('show')) renderCoordPanel();
  }catch(e){ console.warn('No se pudieron cargar los turnos desde la nube:', e); }
}
function subscribeTurnos(){
  try{
    const {supabase} = window.__sb;
    supabase.channel('turnos-realtime')
      .on('postgres_changes', {event:'*', schema:'public', table:'turnos'}, ()=>{ loadTurnosFromCloud(); })
      .subscribe();
  }catch(e){ console.warn('No se pudo activar la sincronización en vivo de turnos:', e); }
}

function refreshAllUI(){
  applyTheme();
  document.getElementById('brandName').textContent = state.schoolName;
  document.getElementById('heroTitle').innerHTML = state.schoolName.replace('Montessori','<span>Montessori</span>');
  document.getElementById('heroWelcome').textContent = state.welcome;
  document.getElementById('footerName').textContent = state.schoolName;
  applyLogoToDom();
  renderContactInfo();
  renderTeachers();
  renderBios();
  renderCustomTabs();
  populateTurnoForm();
}

/* ================= SONIDO (Web Audio) ================= */
let actx;
function beep(freq=520, dur=0.09, type="sine", vol=0.05){
  if(!soundOn) return;
  try{
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g); g.connect(actx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.stop(actx.currentTime + dur);
  }catch(e){}
}
function clickSound(){ beep(480,0.07,"triangle",0.04); }
function successSound(){ beep(660,0.09,"sine",0.05); setTimeout(()=>beep(880,0.12,"sine",0.05),90); }
function errorSound(){ beep(220,0.18,"sawtooth",0.05); }
function callSound(){ beep(740,0.1,"square",0.04); setTimeout(()=>beep(940,0.16,"square",0.04),120); }
function whooshOpenSound(){ beep(320,0.09,"sine",0.035); setTimeout(()=>beep(520,0.08,"sine",0.035),60); }
function whooshCloseSound(){ beep(420,0.08,"sine",0.03); setTimeout(()=>beep(260,0.09,"sine",0.03),50); }
function swishSound(){ beep(500,0.06,"triangle",0.03); setTimeout(()=>beep(700,0.07,"triangle",0.03),40); }
function celebrationSound(){
  [523,659,784,1047].forEach((f,i)=> setTimeout(()=>beep(f,0.14,"sine",0.045), i*90));
}
function toggleSound(){
  soundOn = !soundOn;
  document.getElementById('soundToggle').textContent = soundOn ? "🔊" : "🔇";
  if(soundOn) beep(600,0.08,"sine",0.05);
}
document.addEventListener('click', function(e){
  if(e.target.closest('button, .nav-link, .btn')) clickSound();
});

/* ================= NAVEGACIÓN ================= */
function goTo(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.toggle('active', n.dataset.target===id));
  document.getElementById('mainNav').classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
  swishSound();
  initScrollReveal();
}
function toggleNav(){ document.getElementById('mainNav').classList.toggle('open'); }

/* ================= TOAST ================= */
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = "✅ " + msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2600);
}

/* ================= OVERLAYS ================= */
function openOverlay(id){ document.getElementById(id).classList.add('show'); whooshOpenSound(); }
function closeOverlay(id){ document.getElementById(id).classList.remove('show'); whooshCloseSound(); }
document.querySelectorAll('.overlay').forEach(ov=>{
  ov.addEventListener('click', e=>{ if(e.target===ov) closeOverlay(ov.id); });
});

/* ================= EFECTO CONFETI (celebración visual) ================= */
function burstConfetti(originEl){
  const colors = ['#6EC1E4','#F5D68C','#BFE3D0','#C23B32','#0B2A4A'];
  const rect = originEl ? originEl.getBoundingClientRect() : {left:window.innerWidth/2, top:window.innerHeight/2, width:0, height:0};
  const originX = rect.left + rect.width/2;
  const originY = rect.top + rect.height/2;
  for(let i=0;i<22;i++){
    const piece = document.createElement('div');
    const size = 6 + Math.random()*6;
    const angle = Math.random()*Math.PI*2;
    const dist = 60 + Math.random()*90;
    const dx = Math.cos(angle)*dist;
    const dy = Math.sin(angle)*dist - 40;
    piece.style.cssText = `position:fixed; left:${originX}px; top:${originY}px; width:${size}px; height:${size}px;
      background:${colors[i % colors.length]}; z-index:5000; border-radius:${Math.random()>0.5?'50%':'3px'};
      pointer-events:none; opacity:1; transform:translate(0,0) rotate(0deg);
      transition:transform 900ms cubic-bezier(.2,.8,.2,1), opacity 900ms ease;`;
    document.body.appendChild(piece);
    requestAnimationFrame(()=>{
      piece.style.transform = `translate(${dx}px, ${dy+140}px) rotate(${Math.random()*540}deg)`;
      piece.style.opacity = '0';
    });
    setTimeout(()=>piece.remove(), 950);
  }
}

/* ================= ANIMACIÓN AL HACER SCROLL ================= */
let scrollRevealObserver = null;
function initScrollReveal(){
  if(!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.teacher-card:not(.revealed), .bio-card:not(.revealed), .coord-card:not(.revealed), .turno-card:not(.revealed), .stripe .stat:not(.revealed)');
  if(targets.length === 0) return;
  if(!scrollRevealObserver){
    scrollRevealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
  }
  targets.forEach(el=>{ el.classList.add('reveal-pending'); scrollRevealObserver.observe(el); });
}

/* ================= ADMIN LOGIN ================= */
function handleShieldClick(event){
  event.preventDefault();
  event.stopPropagation();
  openAdminLogin();
}
function openAdminLogin(){
  if(isAdmin){ openAdminPanel(); return; }
  document.getElementById('adminPassInput').value='';
  document.getElementById('adminError').classList.remove('show');
  openOverlay('overlayAdminLogin');
}
function checkAdminPass(){
  const val = document.getElementById('adminPassInput').value;
  if(val === state.adminPass){
    isAdmin = true;
    closeOverlay('overlayAdminLogin');
    successSound();
    toast('Acceso de administración concedido');
    openAdminPanel();
  }else{
    errorSound();
    document.getElementById('adminError').classList.add('show');
  }
}
function openAdminPanel(){
  document.getElementById('adminPanel').classList.add('show');
  document.body.classList.add('admin-mode');
  document.getElementById('editSchoolName').value = state.schoolName;
  document.getElementById('editWelcome').value = state.welcome;
  document.getElementById('editLogoUrl').value = state.logoUrl || '';
  document.getElementById('editTelefono').value = state.contactInfo.telefono || '';
  document.getElementById('editCorreo').value = state.contactInfo.correo || '';
  document.getElementById('editDireccion').value = state.contactInfo.direccion || '';
  document.getElementById('cfgEmailService').value = state.emailConfig.serviceId || '';
  document.getElementById('cfgEmailTemplate').value = state.emailConfig.templateId || '';
  document.getElementById('cfgEmailKey').value = state.emailConfig.publicKey || '';
  document.getElementById('cfgEmailEnabled').checked = !!state.emailConfig.enabled;
  renderAdminTeacherList();
  renderAdminScheduleList();
  renderAdminBioList();
  renderAdminTabList();
  renderAdminCursosList();
  renderTurnoConfigFields();
  renderAdminStats();
  populateThemeFields();
  updateDbStatusBadge();
}
function closeAdmin(){
  document.getElementById('adminPanel').classList.remove('show');
  document.body.classList.remove('admin-mode');
  isAdmin = false;
  toast('Sesión de Administración cerrada');
}

/* ================= COORD LOGIN ================= */
let consoleContext = {mode:'coordinador', id:null, name:null};
function openCoordLogin(){
  if(isCoord){ openConsoleFor({mode:'coordinador'}); return; }
  document.getElementById('coordPassInput').value='';
  document.getElementById('coordError').classList.remove('show');
  openOverlay('overlayCoordLogin');
}
function checkCoordPass(){
  const val = document.getElementById('coordPassInput').value;
  if(val === state.coordPass){
    isCoord = true;
    closeOverlay('overlayCoordLogin');
    successSound();
    openConsoleFor({mode:'coordinador'});
  }else{
    errorSound();
    document.getElementById('coordError').classList.add('show');
  }
}
function openDocenteLogin(){
  const sel = document.getElementById('docLoginSelect');
  sel.innerHTML = state.teachers.map(t=>`<option value="${t.id}">${escapeHtmlText(t.name)}</option>`).join('');
  document.getElementById('docLoginPass').value = '';
  document.getElementById('docLoginError').classList.remove('show');
  openOverlay('overlayDocenteLogin');
}
function checkDocentePass(){
  const id = document.getElementById('docLoginSelect').value;
  const pass = document.getElementById('docLoginPass').value;
  const t = state.teachers.find(x=>x.id===id);
  if(t && pass === t.password){
    closeOverlay('overlayDocenteLogin');
    successSound();
    openConsoleFor({mode:'docente', id:t.id, name:t.name});
  }else{
    errorSound();
    document.getElementById('docLoginError').classList.add('show');
  }
}
function openConsoleFor(ctx){
  consoleContext = ctx;
  document.getElementById('coordConsole').classList.add('show');
  document.body.style.overflow = 'hidden';
  document.getElementById('consoleTitleText').textContent = ctx.mode==='docente' ? ('Panel de ' + ctx.name) : 'Panel de Coordinación';
  document.getElementById('consoleChangePassBtn').style.display = ctx.mode==='docente' ? 'inline-flex' : 'none';
  const today = new Date();
  document.getElementById('consoleToday').textContent = 'Hoy: ' + formatFechaLong(toISODate(today));
  turnoFilter = 'hoy';
  turnoSearchVal = '';
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter==='hoy'));
  const s = document.getElementById('turnoSearch'); if(s) s.value = '';
  renderCoordPanel();
  toast(ctx.mode==='docente' ? ('Bienvenido/a, ' + ctx.name) : 'Bienvenido/a al Panel de Coordinación');
}
function closeCoordConsole(){
  isCoord = false;
  consoleContext = {mode:'coordinador', id:null, name:null};
  document.getElementById('coordConsole').classList.remove('show');
  document.body.style.overflow = '';
  toast('Sesión finalizada');
}
function updateConsoleClock(){
  const el = document.getElementById('consoleClock');
  if(!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit', second:'2-digit'});
}
setInterval(updateConsoleClock, 1000);

/* ================= UTILIDADES DE FECHA / HORA ================= */
const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const DIAS_SEMANA = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
function toISODate(d){
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function parseISODate(iso){
  const [y,m,d] = iso.split('-').map(Number);
  return new Date(y, m-1, d);
}
function formatFechaLong(iso){
  if(!iso) return '—';
  const d = parseISODate(iso);
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}
function formatHora12(hhmm){
  if(!hhmm) return '—';
  let [h,m] = hhmm.split(':').map(Number);
  const suf = h < 12 ? 'a. m.' : 'p. m.';
  let h12 = h % 12; if(h12 === 0) h12 = 12;
  return `${h12}:${String(m).padStart(2,'0')} ${suf}`;
}
function weekdayName(iso){
  return DIAS_SEMANA[parseISODate(iso).getDay()];
}
function generateTimeSlots(){
  const cfg = state.turnoConfig;
  const slots = [];
  let [h,m] = cfg.horaIni.split(':').map(Number);
  const [hf,mf] = cfg.horaFin.split(':').map(Number);
  let cur = h*60+m; const end = hf*60+mf;
  while(cur < end){
    const hh = String(Math.floor(cur/60)).padStart(2,'0');
    const mm = String(cur%60).padStart(2,'0');
    slots.push(`${hh}:${mm}`);
    cur += Number(cfg.duracion);
  }
  return slots;
}

/* ================= FORMULARIO PÚBLICO DE SOLICITUD DE TURNO ================= */
function coordSlotFilter(t){ return t.destino !== 'docente'; }
function docenteSlotFilter(docenteId){ return (t)=> t.destino === 'docente' && t.docenteId === docenteId; }
let calCoordState = {year:new Date().getFullYear(), month:new Date().getMonth()};
let calDocenteState = {year:new Date().getFullYear(), month:new Date().getMonth()};
let citaDocenteId = null;

function populateTurnoForm(){
  const cfg = state.turnoConfig;
  const tipoSel = document.getElementById('tfTipo');
  if(tipoSel){
    tipoSel.innerHTML = cfg.tipos.map(t=>`<option value="${t}">${t==='Padre/madre/acudiente' ? 'Padre / madre / acudiente' : t}</option>`).join('');
  }
  const cursoSel = document.getElementById('tfCurso');
  if(cursoSel){
    cursoSel.innerHTML = '<option value="">No aplica</option>' + state.cursos.map(c=>`<option value="${c}">${c}</option>`).join('');
  }
  const motivoSel = document.getElementById('tfMotivo');
  if(motivoSel){
    motivoSel.innerHTML = cfg.motivos.map(m=>`<option value="${m}">${m}</option>`).join('');
  }
  const fechaInput = document.getElementById('tfFecha');
  if(fechaInput){
    const todayISO = toISODate(new Date());
    fechaInput.min = todayISO;
  }
  refreshHoraOptions();
  if(document.getElementById('calCoordinacion')) renderCalendar('calCoordinacion', calCoordState, coordSlotFilter, 'tfFecha');
}
function onTipoChange(){ /* reservado para lógica futura por tipo de usuario */ }
function refreshHoraOptions(){
  const horaSel = document.getElementById('tfHora');
  const fechaInput = document.getElementById('tfFecha');
  if(!horaSel || !fechaInput) return;
  const fecha = fechaInput.value;
  if(!fecha){ horaSel.innerHTML = '<option value="">Selecciona una fecha primero</option>'; return; }
  const dow = weekdayName(fecha);
  if(!state.turnoConfig.dias.includes(dow)){
    horaSel.innerHTML = '<option value="">No hay atención ese día</option>';
    return;
  }
  const ocupadas = new Set(state.turnos.filter(t=>t.fecha===fecha && t.estado!=='cancelado' && coordSlotFilter(t)).map(t=>t.hora));
  const slots = generateTimeSlots().filter(s=>!ocupadas.has(s));
  if(slots.length===0){ horaSel.innerHTML = '<option value="">No hay horas disponibles</option>'; return; }
  horaSel.innerHTML = slots.map(s=>`<option value="${s}">${formatHora12(s)}</option>`).join('');
}
/** Reserva la hora de forma atómica en PostgreSQL (evita choques si dos personas solicitan
 *  el mismo horario al mismo tiempo). Se apoya en una restricción UNIQUE de la tabla
 *  'slots': si dos personas intentan reservar la misma hora, solo una gana y la otra
 *  recibe un error de "violación de unicidad" (código 23505) que aquí se traduce en `false`.
 *  Si no hay conexión a la nube, aplica una verificación local (no protege contra
 *  condiciones de carrera reales entre distintos dispositivos). */
async function bookSlot(destino, docenteId, fecha, hora){
  if(!dbReady){
    const ocupado = state.turnos.some(t=> t.fecha===fecha && t.hora===hora && t.estado!=='cancelado' &&
      (destino==='docente' ? (t.destino==='docente' && t.docenteId===docenteId) : coordSlotFilter(t)));
    return !ocupado;
  }
  try{
    const {supabase} = window.__sb;
    const slotId = destino + '_' + (docenteId||'coord') + '_' + fecha + '_' + hora;
    const {error} = await supabase.from('slots').insert({
      id: slotId, destino, docente_id: docenteId || '', fecha, hora
    });
    if(error){
      if(error.code === '23505') return false; // hora ya reservada por alguien más
      throw error;
    }
    return true;
  }catch(e){
    console.warn('No se pudo verificar la disponibilidad en la nube:', e);
    return false;
  }
}
async function submitTurno(){
  const nombre = document.getElementById('tfNombre').value.trim();
  const tipo = document.getElementById('tfTipo').value;
  const curso = document.getElementById('tfCurso').value;
  const motivo = document.getElementById('tfMotivo').value;
  const fecha = document.getElementById('tfFecha').value;
  const hora = document.getElementById('tfHora').value;
  const errEl = document.getElementById('tfError');

  if(!nombre || !tipo || !motivo || !fecha || !hora){
    errEl.textContent = 'Por favor completa todos los campos obligatorios.';
    errEl.classList.add('show');
    errorSound();
    return;
  }
  const dow = weekdayName(fecha);
  if(!state.turnoConfig.dias.includes(dow)){
    errEl.textContent = 'Coordinación no atiende ese día. Elige otra fecha.';
    errEl.classList.add('show');
    errorSound();
    return;
  }
  const activos = state.turnos.filter(t=>
    t.nombre.trim().toLowerCase()===nombre.toLowerCase() &&
    (t.estado==='pendiente' || t.estado==='confirmado')
  ).length;
  if(activos >= state.turnoConfig.maxPorPersona){
    errEl.textContent = `Ya tienes ${activos} turno(s) activo(s). El máximo permitido por persona es ${state.turnoConfig.maxPorPersona}.`;
    errEl.classList.add('show');
    errorSound();
    return;
  }
  errEl.classList.remove('show');

  const reservado = await bookSlot('coordinacion', null, fecha, hora);
  if(!reservado){
    errEl.textContent = 'Justo ahora otra persona reservó esa hora. Elige otro horario disponible.';
    errEl.classList.add('show');
    errorSound();
    refreshHoraOptions();
    return;
  }

  const turno = await createTurno({
    id: 't' + Date.now() + Math.floor(Math.random()*1000),
    nombre, tipo, curso, motivo, fecha, hora,
    estado:'pendiente', observaciones:'', destino:'coordinacion', docenteId:null
  });
  state.turnos.push(turno);
  clickSound();
  celebrationSound();
  document.getElementById('confCodigo').textContent = turno.codigo;
  document.getElementById('confFecha').textContent = formatFechaLong(fecha);
  document.getElementById('confHora').textContent = formatHora12(hora);
  document.getElementById('confNumero').textContent = '#' + String(turno.numero).padStart(3,'0');
  document.getElementById('turnoFormCard').style.display = 'none';
  document.getElementById('turnoConfirmCard').style.display = 'block';
  burstConfetti(document.getElementById('turnoConfirmCard'));
  maybeSendEmail(turno, 'solicitada');
}
function resetTurnoForm(){
  document.getElementById('tfNombre').value = '';
  document.getElementById('tfFecha').value = '';
  populateTurnoForm();
  document.getElementById('turnoConfirmCard').style.display = 'none';
  document.getElementById('turnoFormCard').style.display = 'block';
}

/* ================= CALENDARIO DE DISPONIBILIDAD ================= */
function renderCalendar(containerId, calState, filterFn, dateInputId){
  const container = document.getElementById(containerId);
  if(!container) return;
  const {year, month} = calState;
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay(); // 0=domingo
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const todayISO = toISODate(new Date());
  const totalSlots = generateTimeSlots().length;
  const selectedVal = dateInputId ? (document.getElementById(dateInputId)?.value || '') : '';

  let html = `<div class="mc-header">
    <button onclick="calNav('${containerId}','${dateInputId}',-1)">‹</button>
    <div class="mc-title">${MESES[month]} ${year}</div>
    <button onclick="calNav('${containerId}','${dateInputId}',1)">›</button>
  </div><div class="mc-grid">`;
  ["D","L","M","M","J","V","S"].forEach(d=> html += `<div class="mc-dow">${d}</div>`);
  for(let i=0;i<startOffset;i++) html += `<div class="mc-day empty"></div>`;

  for(let day=1; day<=daysInMonth; day++){
    const d = new Date(year, month, day);
    const iso = toISODate(d);
    const dow = DIAS_SEMANA[d.getDay()];
    let cls = 'disp';
    if(iso < todayISO || !state.turnoConfig.dias.includes(dow) || totalSlots===0){
      cls = 'cerrado';
    }else{
      const ocupados = state.turnos.filter(t=> t.fecha===iso && t.estado!=='cancelado' && filterFn(t)).length;
      const ratio = ocupados / totalSlots;
      cls = ratio >= 1 ? 'lleno' : (ratio >= 0.5 ? 'pocos' : 'disp');
    }
    const sel = iso===selectedVal ? ' selected' : '';
    const clickable = cls!=='cerrado' && cls!=='lleno';
    html += `<div class="mc-day ${cls}${sel}" ${clickable ? `onclick="calPick('${iso}','${dateInputId}','${containerId}')"` : ''}>${day}</div>`;
  }
  html += `</div><div class="mc-legend">
    <span><i style="background:#c9f0d8"></i>Disponible</span>
    <span><i style="background:#fbe4a6"></i>Pocos espacios</span>
    <span><i style="background:#f3c3c0"></i>Sin disponibilidad</span>
  </div>`;
  container.innerHTML = html;
}
function calNav(containerId, dateInputId, delta){
  const calState = containerId==='calDocente' ? calDocenteState : calCoordState;
  calState.month += delta;
  if(calState.month < 0){ calState.month = 11; calState.year--; }
  if(calState.month > 11){ calState.month = 0; calState.year++; }
  const filterFn = containerId==='calDocente' ? docenteSlotFilter(citaDocenteId) : coordSlotFilter;
  renderCalendar(containerId, calState, filterFn, dateInputId);
}
function calPick(iso, dateInputId, containerId){
  const input = document.getElementById(dateInputId);
  if(!input) return;
  input.value = iso;
  if(dateInputId==='tfFecha'){ refreshHoraOptions(); renderCalendar('calCoordinacion', calCoordState, coordSlotFilter, 'tfFecha'); }
  if(dateInputId==='dcFecha'){ refreshHoraOptionsDocente(); renderCalendar('calDocente', calDocenteState, docenteSlotFilter(citaDocenteId), 'dcFecha'); }
}

/* ================= CONSULTAR MI TURNO ================= */
function openConsultarTurno(){
  document.getElementById('consultaCodigo').value = '';
  document.getElementById('consultaResult').innerHTML = '';
  openOverlay('overlayConsultarTurno');
}
function buscarTurnoPorCodigo(){
  const code = document.getElementById('consultaCodigo').value.trim().toUpperCase();
  const result = document.getElementById('consultaResult');
  if(!code){ result.innerHTML = '<p class="modal-sub">Escribe un código para buscar.</p>'; return; }
  const t = state.turnos.find(x=>x.codigo && x.codigo.toUpperCase()===code);
  if(!t){
    result.innerHTML = '<p class="modal-sub" style="color:var(--crest-red);">No se encontró ningún turno con ese código.</p>';
    errorSound();
    return;
  }
  clickSound();
  const puedeCancelar = state.turnoConfig.permitirCancelacionPublica && (t.estado==='pendiente' || t.estado==='confirmado');
  const destinoTxt = t.destino==='docente' ? ('Cita con ' + (state.teachers.find(d=>d.id===t.docenteId)?.name || 'docente')) : 'Coordinación';
  result.innerHTML = `
    <div class="consulta-status ${t.estado}">
      <div class="cs-top"><span class="cs-dot"></span><span class="cs-estado">${t.estado}</span></div>
      <div class="consulta-row"><span>Código</span><b>${t.codigo}</b></div>
      <div class="consulta-row"><span>Con</span><b>${escapeHtmlText(destinoTxt)}</b></div>
      <div class="consulta-row"><span>Fecha</span><b>${formatFechaLong(t.fecha)}</b></div>
      <div class="consulta-row"><span>Hora</span><b>${formatHora12(t.hora)}</b></div>
      <div class="consulta-row"><span>Motivo</span><b>${escapeHtmlText(t.motivo)}</b></div>
      ${puedeCancelar ? `<button class="btn-outline btn-block" style="margin-top:14px;" onclick="cancelarTurnoPublico('${t.id}')">Cancelar mi solicitud</button>` : ''}
    </div>`;
}
function cancelarTurnoPublico(id){
  const t = findTurno(id); if(!t) return;
  if(!confirm('¿Seguro que deseas cancelar tu turno ' + t.codigo + '?')) return;
  t.estado = 'cancelado';
  updateTurnoRemote(id, {estado:'cancelado'});
  maybeSendEmail(t, 'cancelada');
  buscarTurnoPorCodigo();
  toast('Turno cancelado');
}

/* ================= CITAS CON DOCENTES ================= */
function openDocenteCitaForm(){
  citaDocenteId = currentHorarioTeacherId;
  const t = state.teachers.find(x=>x.id===citaDocenteId);
  if(!t) return;
  closeOverlay('overlayHorario');
  document.getElementById('dcTitulo').textContent = 'Solicitar cita con ' + t.name;
  document.getElementById('dcSub').textContent = t.area;
  document.getElementById('dcNombre').value = '';
  document.getElementById('dcFecha').value = '';
  document.getElementById('dcCurso').innerHTML = '<option value="">No aplica</option>' + state.cursos.map(c=>`<option value="${c}">${c}</option>`).join('');
  document.getElementById('dcMotivo').innerHTML = state.turnoConfig.motivos.map(m=>`<option value="${m}">${m}</option>`).join('');
  document.getElementById('dcHora').innerHTML = '<option value="">Selecciona una fecha primero</option>';
  document.getElementById('dcError').classList.remove('show');
  const todayISO = toISODate(new Date());
  document.getElementById('dcFecha').min = todayISO;
  renderCalendar('calDocente', calDocenteState, docenteSlotFilter(citaDocenteId), 'dcFecha');
  openOverlay('overlayDocenteCita');
}
function refreshHoraOptionsDocente(){
  const horaSel = document.getElementById('dcHora');
  const fecha = document.getElementById('dcFecha').value;
  if(!fecha){ horaSel.innerHTML = '<option value="">Selecciona una fecha primero</option>'; return; }
  const dow = weekdayName(fecha);
  if(!state.turnoConfig.dias.includes(dow)){
    horaSel.innerHTML = '<option value="">No hay atención ese día</option>';
    return;
  }
  const filterFn = docenteSlotFilter(citaDocenteId);
  const ocupadas = new Set(state.turnos.filter(t=>t.fecha===fecha && t.estado!=='cancelado' && filterFn(t)).map(t=>t.hora));
  const slots = generateTimeSlots().filter(s=>!ocupadas.has(s));
  if(slots.length===0){ horaSel.innerHTML = '<option value="">No hay horas disponibles</option>'; return; }
  horaSel.innerHTML = slots.map(s=>`<option value="${s}">${formatHora12(s)}</option>`).join('');
}
async function submitTurnoDocente(){
  const nombre = document.getElementById('dcNombre').value.trim();
  const tipo = document.getElementById('dcTipo').value;
  const curso = document.getElementById('dcCurso').value;
  const motivo = document.getElementById('dcMotivo').value;
  const fecha = document.getElementById('dcFecha').value;
  const hora = document.getElementById('dcHora').value;
  const errEl = document.getElementById('dcError');
  const t = state.teachers.find(x=>x.id===citaDocenteId);

  if(!nombre || !tipo || !motivo || !fecha || !hora || !t){
    errEl.textContent = 'Por favor completa todos los campos obligatorios.';
    errEl.classList.add('show');
    errorSound();
    return;
  }
  const activos = state.turnos.filter(x=>
    x.destino==='docente' && x.docenteId===citaDocenteId &&
    x.nombre.trim().toLowerCase()===nombre.toLowerCase() &&
    (x.estado==='pendiente' || x.estado==='confirmado')
  ).length;
  if(activos >= state.turnoConfig.maxPorPersona){
    errEl.textContent = `Ya tienes ${activos} cita(s) activa(s) con este docente. Máximo permitido: ${state.turnoConfig.maxPorPersona}.`;
    errEl.classList.add('show');
    errorSound();
    return;
  }
  errEl.classList.remove('show');

  const reservado = await bookSlot('docente', citaDocenteId, fecha, hora);
  if(!reservado){
    errEl.textContent = 'Justo ahora esa hora quedó reservada. Elige otro horario disponible.';
    errEl.classList.add('show');
    errorSound();
    refreshHoraOptionsDocente();
    return;
  }

  const turno = await createTurno({
    id: 't' + Date.now() + Math.floor(Math.random()*1000),
    nombre, tipo, curso, motivo, fecha, hora,
    estado:'pendiente', observaciones:'', destino:'docente', docenteId:citaDocenteId
  });
  state.turnos.push(turno);
  clickSound();
  celebrationSound();
  burstConfetti(document.querySelector('#overlayDocenteCita .modal'));
  closeOverlay('overlayDocenteCita');
  maybeSendEmail(turno, 'solicitada');
  alert(`✅ Cita solicitada con ${t.name}\n\nCódigo: ${turno.codigo}\nFecha: ${formatFechaLong(fecha)}\nHora: ${formatHora12(hora)}\n\nGuarda tu código para consultar el estado desde "🔍 Consultar mi turno".`);
}

/* ================= PANEL DE COORDINACIÓN (gestión de turnos) ================= */
let turnoFilter = 'hoy';
let turnoSearchVal = '';
function setTurnoFilter(f){
  turnoFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===f));
  renderCoordPanel();
}
function turnoMatchesFilter(t){
  const todayISO = toISODate(new Date());
  if(turnoFilter==='hoy') return t.fecha === todayISO;
  if(turnoFilter==='manana'){
    const tm = new Date(); tm.setDate(tm.getDate()+1);
    return t.fecha === toISODate(tm);
  }
  if(turnoFilter==='semana'){
    const start = new Date(); const end = new Date(); end.setDate(end.getDate()+7);
    const f = parseISODate(t.fecha);
    return f >= new Date(start.getFullYear(),start.getMonth(),start.getDate()) && f <= end;
  }
  return true;
}
function scopedTurnos(){
  if(consoleContext.mode==='docente'){
    return state.turnos.filter(t=>t.destino==='docente' && t.docenteId===consoleContext.id);
  }
  return state.turnos.filter(t=>t.destino!=='docente');
}
function currentActor(){
  return consoleContext.mode==='docente' ? consoleContext.name : 'Coordinador';
}
function renderCoordPanel(){
  turnoSearchVal = (document.getElementById('turnoSearch')?.value || '').toLowerCase();
  const todayISO = toISODate(new Date());
  document.getElementById('consoleToday').textContent = 'Hoy: ' + formatFechaLong(todayISO);

  const scoped = scopedTurnos();
  document.getElementById('scHoy').textContent = scoped.filter(t=>t.fecha===todayISO).length;
  document.getElementById('scPend').textContent = scoped.filter(t=>t.estado==='pendiente').length;
  document.getElementById('scConf').textContent = scoped.filter(t=>t.estado==='confirmado').length;
  document.getElementById('scAten').textContent = scoped.filter(t=>t.estado==='atendido').length;
  document.getElementById('scCanc').textContent = scoped.filter(t=>t.estado==='cancelado').length;

  let list = scoped.filter(turnoMatchesFilter);
  if(turnoSearchVal) list = list.filter(t=>t.nombre.toLowerCase().includes(turnoSearchVal));
  list = list.slice().sort((a,b)=> (a.fecha+a.hora).localeCompare(b.fecha+b.hora));

  const container = document.getElementById('turnoList');
  if(list.length === 0){
    container.innerHTML = '<div class="turno-empty">No hay turnos que coincidan con este filtro.</div>';
    return;
  }
  container.innerHTML = list.map(t=>{
    const obs = t.observaciones ? `<div class="tr-obs">📝 ${escapeHtmlText(t.observaciones)}</div>` : '';
    return `
    <div class="turno-row">
      <div class="tr-num">${t.codigo || ('#'+String(t.numero).padStart(3,'0'))}</div>
      <div class="tr-main">
        <div class="tr-name">${escapeHtmlText(t.nombre)}</div>
        <div class="tr-meta">${escapeHtmlText(t.tipo)}${t.curso ? ' · '+escapeHtmlText(t.curso) : ''} · ${escapeHtmlText(t.motivo)}</div>
      </div>
      <div class="tr-when">${formatFechaLong(t.fecha).split(' de ').slice(0,2).join(' de ')}<br>${formatHora12(t.hora)}</div>
      <div class="tr-badge ${t.estado}">${t.estado}</div>
      <div class="tr-actions">
        <button onclick="confirmarTurno('${t.id}')">Confirmar</button>
        <button onclick="atenderTurno('${t.id}')">Atendido</button>
        <button onclick="reprogramarTurno('${t.id}')">Reprogramar</button>
        <button onclick="editarNotasTurno('${t.id}')">Notas</button>
        <button class="danger" onclick="cancelarTurno('${t.id}')">Cancelar</button>
      </div>
      ${obs}
    </div>`;
  }).join('');
}
function escapeHtmlText(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
function findTurno(id){ return state.turnos.find(t=>t.id===id); }
function confirmarTurno(id){
  const t = findTurno(id); if(!t) return;
  t.estado = 'confirmado';
  callSound();
  renderCoordPanel();
  updateTurnoRemote(id, {estado:'confirmado'});
  maybeSendEmail(t, 'confirmada');
  logAudit(currentActor(), 'Confirmó turno ' + (t.codigo || '#'+t.numero));
}
function atenderTurno(id){
  const t = findTurno(id); if(!t) return;
  t.estado = 'atendido';
  successSound();
  renderCoordPanel();
  updateTurnoRemote(id, {estado:'atendido'});
  logAudit(currentActor(), 'Marcó como atendido el turno ' + (t.codigo || '#'+t.numero));
}
function cancelarTurno(id){
  const t = findTurno(id); if(!t) return;
  t.estado = 'cancelado';
  errorSound();
  renderCoordPanel();
  updateTurnoRemote(id, {estado:'cancelado'});
  maybeSendEmail(t, 'cancelada');
  logAudit(currentActor(), 'Canceló turno ' + (t.codigo || '#'+t.numero));
}
function reprogramarTurno(id){
  const t = findTurno(id); if(!t) return;
  const nuevaFecha = prompt('Nueva fecha (AAAA-MM-DD):', t.fecha);
  if(!nuevaFecha) return;
  const nuevaHora = prompt('Nueva hora (HH:MM, 24 horas):', t.hora);
  if(!nuevaHora) return;
  t.fecha = nuevaFecha.trim();
  t.hora = nuevaHora.trim();
  toast('Turno reprogramado');
  renderCoordPanel();
  updateTurnoRemote(id, {fecha:t.fecha, hora:t.hora});
  logAudit(currentActor(), 'Reprogramó turno ' + (t.codigo || '#'+t.numero));
}
function editarNotasTurno(id){
  const t = findTurno(id); if(!t) return;
  openTextEditor('Observaciones internas — ' + t.nombre, 'Solo visibles para Coordinación / el docente.', t.observaciones, (val)=>{
    t.observaciones = val;
    renderCoordPanel();
    updateTurnoRemote(id, {observaciones: val});
    logAudit(currentActor(), 'Agregó observaciones al turno ' + (t.codigo || '#'+t.numero));
  });
}
async function limpiarTurnosAntiguos(){
  const limite = new Date(); limite.setDate(limite.getDate()-30);
  const idsAEliminar = state.turnos.filter(t=>{
    if(t.estado!=='atendido' && t.estado!=='cancelado') return false;
    return parseISODate(t.fecha) < limite;
  }).map(t=>t.id);
  if(idsAEliminar.length === 0){ toast('No había turnos antiguos para eliminar'); return; }
  state.turnos = state.turnos.filter(t=>!idsAEliminar.includes(t.id));
  toast(idsAEliminar.length + ' turno(s) antiguos eliminados');
  if(dbReady){
    try{
      const {supabase} = window.__sb;
      const {error} = await supabase.from('turnos').delete().in('id', idsAEliminar);
      if(error) throw error;
    }catch(e){ console.warn('No se pudo eliminar turnos antiguos en la nube:', e); }
  }
}

/* ================= NOTIFICACIONES POR CORREO (EmailJS, opcional) ================= */
function maybeSendEmail(turno, evento){
  const cfg = state.emailConfig;
  if(!cfg.enabled || !cfg.serviceId || !cfg.templateId || !cfg.publicKey) return;
  if(typeof emailjs === 'undefined') return;
  const mensajes = {
    solicitada: 'Su solicitud fue recibida y está pendiente de confirmación.',
    confirmada: 'Su cita ha sido confirmada.',
    cancelada: 'Su cita fue cancelada.'
  };
  try{
    emailjs.init(cfg.publicKey);
    emailjs.send(cfg.serviceId, cfg.templateId, {
      nombre: turno.nombre,
      codigo: turno.codigo || '',
      fecha: formatFechaLong(turno.fecha),
      hora: formatHora12(turno.hora),
      numero: '#' + String(turno.numero).padStart(3,'0'),
      estado: evento,
      mensaje: mensajes[evento] || ''
    }).catch(err=>console.warn('EmailJS:', err));
  }catch(e){ console.warn('EmailJS no disponible:', e); }
}

/* ================= AUDITORÍA ================= */
/** Cada acción se guarda como un documento INDEPENDIENTE en la colección 'audit_log'.
 *  Nunca se sobrescribe ni se borra nada: ninguna acción puede "pisar" a otra, y no hay
 *  límite de cantidad — la base de datos conserva el historial completo para siempre.
 *  El panel solo MUESTRA los más recientes por rendimiento, pero todo queda guardado. */
function logAudit(actor, action){
  const entry = {ts: new Date().toISOString(), actor, action};
  state.audit.unshift(entry); // copia local inmediata, para que se vea al instante
  if(document.getElementById('overlayAuditPanel')?.classList.contains('show')) renderAuditPanel();
  saveAuditEntry(entry);
}
/** Cada acción se guarda como una FILA independiente en la tabla 'audit_log'.
 *  Nunca se sobrescribe ni se borra nada: no hay límite de cantidad — la base de
 *  datos conserva el historial completo para siempre. El panel solo MUESTRA los
 *  más recientes por rendimiento, pero todo queda guardado. */
async function saveAuditEntry(entry){
  if(!dbReady){
    console.warn('Sin base de datos configurada: este registro de auditoría solo vive en esta pestaña del navegador y se perderá al recargar.');
    return;
  }
  try{
    const {supabase} = window.__sb;
    const {error} = await supabase.from('audit_log').insert({ts: entry.ts, actor: entry.actor, action: entry.action});
    if(error) throw error;
  }catch(e){
    console.warn('No se pudo guardar este registro de auditoría en la nube:', e);
  }
}
const AUDIT_DISPLAY_LIMIT = 500;
async function loadAuditFromCloud(){
  try{
    const {supabase} = window.__sb;
    const {data, error} = await supabase.from('audit_log').select('*').order('ts', {ascending:false}).limit(AUDIT_DISPLAY_LIMIT);
    if(error) throw error;
    state.audit = data || [];
    if(document.getElementById('overlayAuditPanel')?.classList.contains('show')) renderAuditPanel();
  }catch(e){ console.warn('No se pudo cargar la auditoría desde la nube:', e); }
}
function subscribeAudit(){
  try{
    const {supabase} = window.__sb;
    supabase.channel('audit-realtime')
      .on('postgres_changes', {event:'INSERT', schema:'public', table:'audit_log'}, ()=>{ loadAuditFromCloud(); })
      .subscribe();
  }catch(e){ console.warn('No se pudo activar la sincronización en vivo de la auditoría:', e); }
}
let auditPanelFilter = 'coordinador';
function openAuditGateLogin(){
  document.getElementById('auditGatePass').value = '';
  document.getElementById('auditGateError').classList.remove('show');
  openOverlay('overlayAuditGate');
}
function checkAuditGatePass(){
  const val = document.getElementById('auditGatePass').value;
  if(val === state.auditPass){
    closeOverlay('overlayAuditGate');
    successSound();
    auditPanelFilter = 'coordinador';
    document.querySelectorAll('.audit-tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.f==='coordinador'));
    renderAuditPanel();
    openOverlay('overlayAuditPanel');
  }else{
    errorSound();
    document.getElementById('auditGateError').classList.add('show');
  }
}
function setAuditPanelFilter(f){
  auditPanelFilter = f;
  document.querySelectorAll('.audit-tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.f===f));
  renderAuditPanel();
}
function renderAuditPanel(){
  const el = document.getElementById('auditPanelList');
  if(!el) return;
  let list;
  if(auditPanelFilter==='coordinador') list = state.audit.filter(a=>a.actor==='Coordinador');
  else if(auditPanelFilter==='docentes') list = state.audit.filter(a=> a.actor!=='Coordinador' && a.actor!=='Administrador');
  else list = state.audit;
  if(list.length === 0){ el.innerHTML = '<p class="modal-sub">Aún no hay actividad registrada en esta categoría.</p>'; return; }
  const nota = state.audit.length >= AUDIT_DISPLAY_LIMIT
    ? `<p class="modal-sub" style="margin-bottom:10px;">Mostrando los ${AUDIT_DISPLAY_LIMIT} registros más recientes. Todo el historial completo permanece guardado en la base de datos, sin límite.</p>`
    : '';
  el.innerHTML = nota + list.map(a=>{
    const d = new Date(a.ts);
    const fecha = d.toLocaleDateString('es-CO') + ' ' + d.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit'});
    return `<div class="audit-item">
      <div class="au-top"><span>${escapeHtmlText(a.actor)}</span><span class="au-time">${fecha}</span></div>
      <div class="au-action">${escapeHtmlText(a.action)}</div>
    </div>`;
  }).join('');
}
/** Descarga TODO el sistema en un solo archivo Excel (.xlsx), con una hoja
 *  por cada tipo de dato: turnos, docentes, configuración general e
 *  historial (completo y separado por rol). Un solo clic, un solo archivo.
 *  El historial y los turnos siempre se traen completos directamente de la
 *  base de datos (no solo lo visible en pantalla), para que quede con
 *  absolutamente todos los datos. */
async function exportAllToExcel(){
  if(typeof XLSX === 'undefined'){
    toast('No se pudo cargar la librería de Excel');
    errorSound();
    return;
  }
  toast('Preparando el archivo de Excel con todo el sistema…');

  // ---- Historial de auditoría (completo, sin límite) ----
  let fullAudit = state.audit;
  if(dbReady){
    try{
      const {supabase} = window.__sb;
      const {data, error} = await supabase.from('audit_log').select('*').order('ts', {ascending:false});
      if(error) throw error;
      fullAudit = data || [];
    }catch(e){
      console.warn('No se pudo descargar el historial completo desde la nube, se exportará solo lo visible en pantalla:', e);
    }
  }
  const auditOrdenado = fullAudit.slice().sort((a,b)=> new Date(b.ts) - new Date(a.ts));
  const toAuditRows = (list)=> list.map(a=>{
    const d = new Date(a.ts);
    return {
      'Fecha': d.toLocaleDateString('es-CO'),
      'Hora': d.toLocaleTimeString('es-CO', {hour:'2-digit', minute:'2-digit', second:'2-digit'}),
      'Responsable': a.actor,
      'Acción': a.action
    };
  });
  const auditCoordinador = auditOrdenado.filter(a=>a.actor==='Coordinador');
  const auditDocentes = auditOrdenado.filter(a=> a.actor!=='Coordinador' && a.actor!=='Administrador');
  const auditAdministrador = auditOrdenado.filter(a=>a.actor==='Administrador');

  // ---- Turnos y citas (completo) ----
  const turnosOrdenados = state.turnos.slice().sort((a,b)=> (a.fecha+a.hora).localeCompare(b.fecha+b.hora));
  const turnosRows = turnosOrdenados.map(t=>{
    const docente = t.docenteId ? state.teachers.find(x=>x.id===t.docenteId) : null;
    return {
      'Código': t.codigo,
      'Nombre': t.nombre,
      'Tipo de usuario': t.tipo,
      'Curso': t.curso || '',
      'Motivo': t.motivo,
      'Fecha': formatFechaLong(t.fecha),
      'Hora': formatHora12(t.hora),
      'Estado': t.estado,
      'Atendido por': t.destino==='docente' ? ('Docente: ' + (docente ? docente.name : t.docenteId)) : 'Coordinación',
      'Observaciones': t.observaciones || '',
      'Solicitado el': t.creado ? new Date(t.creado).toLocaleString('es-CO') : ''
    };
  });

  // ---- Docentes ----
  const docentesRows = state.teachers.map(t=>({
    'Nombre': t.name,
    'Área / grado': t.area,
    'Activo': t.activo ? 'Sí' : 'No',
    'Horario': t.schedule.map(r=>`${r.day}: ${r.hours} (${r.tipo})`).join(' | ')
  }));

  // ---- Configuración general ----
  const cfg = state.turnoConfig;
  const configRows = [
    {'Campo':'Nombre del colegio', 'Valor': state.schoolName},
    {'Campo':'Mensaje de bienvenida', 'Valor': state.welcome},
    {'Campo':'Teléfono de contacto', 'Valor': state.contactInfo.telefono || ''},
    {'Campo':'Correo de contacto', 'Valor': state.contactInfo.correo || ''},
    {'Campo':'Dirección', 'Valor': state.contactInfo.direccion || ''},
    {'Campo':'Cursos / grados', 'Valor': state.cursos.join(', ')},
    {'Campo':'Horario de atención', 'Valor': `${cfg.horaIni} a ${cfg.horaFin}`},
    {'Campo':'Duración de cada turno (minutos)', 'Valor': cfg.duracion},
    {'Campo':'Máximo de turnos activos por persona', 'Valor': cfg.maxPorPersona},
    {'Campo':'Días de atención', 'Valor': cfg.dias.join(', ')},
    {'Campo':'Motivos de cita disponibles', 'Valor': cfg.motivos.join(', ')},
    {'Campo':'Tipos de usuario permitidos', 'Valor': cfg.tipos.join(', ')},
    {'Campo':'Permite cancelación pública', 'Valor': cfg.permitirCancelacionPublica ? 'Sí' : 'No'}
  ];

  if(turnosRows.length === 0 && docentesRows.length === 0 && auditOrdenado.length === 0){
    toast('No hay datos para exportar todavía');
    return;
  }

  const wb = XLSX.utils.book_new();
  function addSheet(name, rows, colWidths){
    const datos = rows.length ? rows : [{'Sin datos':'Todavía no hay información en esta categoría'}];
    const ws = XLSX.utils.json_to_sheet(datos);
    if(colWidths) ws['!cols'] = colWidths;
    XLSX.utils.book_append_sheet(wb, ws, name.slice(0,31));
  }

  addSheet('Turnos y citas', turnosRows, [{wch:10},{wch:22},{wch:20},{wch:12},{wch:20},{wch:20},{wch:12},{wch:12},{wch:26},{wch:40},{wch:18}]);
  addSheet('Docentes', docentesRows, [{wch:22},{wch:26},{wch:8},{wch:90}]);
  addSheet('Configuración general', configRows, [{wch:32},{wch:70}]);
  const auditColWidths = [{wch:12},{wch:11},{wch:24},{wch:70}];
  addSheet('Historial completo', toAuditRows(auditOrdenado), auditColWidths);
  addSheet('Historial - Coordinador', toAuditRows(auditCoordinador), auditColWidths);
  addSheet('Historial - Docentes', toAuditRows(auditDocentes), auditColWidths);
  addSheet('Historial - Administrador', toAuditRows(auditAdministrador), auditColWidths);

  const fechaArchivo = new Date().toISOString().slice(0,10);
  const nombreColegio = (state.schoolName || 'colegio').replace(/[^a-zA-Z0-9]+/g,'_');
  XLSX.writeFile(wb, `TODO-${nombreColegio}-${fechaArchivo}.xlsx`);
  successSound();
  toast(`Descarga completa: ${turnosRows.length} turnos, ${docentesRows.length} docentes, ${auditOrdenado.length} registros de historial`);
  logAudit('Administrador', 'Descargó TODO el sistema en un solo archivo Excel');
}

/* ================= LOGO / CONTACTO ================= */
function applyLogoToDom(){
  const url = state.logoUrl && state.logoUrl.trim() ? state.logoUrl.trim() : DEFAULT_LOGO;
  document.getElementById('escudoNav').src = url;
  const hs = document.querySelector('.hero-shield'); if(hs) hs.src = url;
  const cs = document.querySelector('.console-title img'); if(cs) cs.src = url;
}
function applyLogoLive(){
  state.logoUrl = document.getElementById('editLogoUrl').value;
  applyLogoToDom();
  queueSaveState();
}
function renderContactInfo(){
  const c = state.contactInfo;
  const el = document.getElementById('footerContact');
  if(!el) return;
  const parts = [];
  if(c.telefono) parts.push('📞 ' + c.telefono);
  if(c.correo) parts.push('✉️ ' + c.correo);
  if(c.direccion) parts.push('📍 ' + c.direccion);
  el.textContent = parts.join('  ·  ');
  el.style.display = parts.length ? 'block' : 'none';
}
function applyContactLive(){
  state.contactInfo.telefono = document.getElementById('editTelefono').value;
  state.contactInfo.correo = document.getElementById('editCorreo').value;
  state.contactInfo.direccion = document.getElementById('editDireccion').value;
  renderContactInfo();
  queueSaveState();
}

/* ================= ADMIN: cursos, configuración de turnos, estadísticas, email ================= */
function renderAdminCursosList(){
  const list = document.getElementById('adminCursosList');
  list.innerHTML = '';
  state.cursos.forEach((c, idx)=>{
    const row = document.createElement('div');
    row.className = 'mini-row';
    row.innerHTML = `<input value="${c}" onchange="updateCurso(${idx}, this.value)">
                      <button onclick="removeCurso(${idx})">✕</button>`;
    list.appendChild(row);
  });
}
function updateCurso(idx, val){ state.cursos[idx] = val; populateTurnoForm(); queueSaveState(); }
function removeCurso(idx){ state.cursos.splice(idx,1); renderAdminCursosList(); populateTurnoForm(); queueSaveState(); }
function addCursoPrompt(){
  const c = prompt('Nombre del curso o grado:');
  if(!c) return;
  state.cursos.push(c);
  renderAdminCursosList();
  populateTurnoForm();
  queueSaveState();
}
function renderAdminMotivosList(){
  const list = document.getElementById('adminMotivosList');
  list.innerHTML = '';
  state.turnoConfig.motivos.forEach((m, idx)=>{
    const row = document.createElement('div');
    row.className = 'mini-row';
    row.innerHTML = `<input value="${m}" onchange="updateMotivo(${idx}, this.value)">
                      <button onclick="removeMotivo(${idx})">✕</button>`;
    list.appendChild(row);
  });
}
function updateMotivo(idx, val){ state.turnoConfig.motivos[idx] = val; populateTurnoForm(); queueSaveState(); }
function removeMotivo(idx){ state.turnoConfig.motivos.splice(idx,1); renderAdminMotivosList(); populateTurnoForm(); queueSaveState(); }
function addMotivoPrompt(){
  const m = prompt('Nuevo motivo de cita:');
  if(!m) return;
  state.turnoConfig.motivos.push(m);
  renderAdminMotivosList();
  populateTurnoForm();
  queueSaveState();
}
const DIAS_CFG = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const TIPOS_CFG = ["Estudiante","Padre/madre/acudiente","Docente","Otro"];
function renderTurnoConfigFields(){
  const cfg = state.turnoConfig;
  document.getElementById('cfgHoraIni').value = cfg.horaIni;
  document.getElementById('cfgHoraFin').value = cfg.horaFin;
  document.getElementById('cfgDuracion').value = String(cfg.duracion);
  document.getElementById('cfgMaxPersona').value = cfg.maxPorPersona;
  document.getElementById('cfgCancelPublica').checked = !!cfg.permitirCancelacionPublica;

  const diasGrid = document.getElementById('cfgDiasGrid');
  diasGrid.innerHTML = DIAS_CFG.map(d=>`
    <label><input type="checkbox" ${cfg.dias.includes(d)?'checked':''} onchange="toggleDiaAtencion('${d}', this.checked)"> ${d}</label>
  `).join('');

  const tiposGrid = document.getElementById('cfgTiposGrid');
  tiposGrid.innerHTML = TIPOS_CFG.map(t=>`
    <label><input type="checkbox" ${cfg.tipos.includes(t)?'checked':''} onchange="toggleTipoPermitido('${t}', this.checked)"> ${t==='Padre/madre/acudiente'?'Padre/madre/acudiente':t}</label>
  `).join('');

  renderAdminMotivosList();
}
function toggleDiaAtencion(dia, checked){
  const cfg = state.turnoConfig;
  if(checked && !cfg.dias.includes(dia)) cfg.dias.push(dia);
  if(!checked) cfg.dias = cfg.dias.filter(d=>d!==dia);
  populateTurnoForm();
  queueSaveState();
}
function toggleTipoPermitido(tipo, checked){
  const cfg = state.turnoConfig;
  if(checked && !cfg.tipos.includes(tipo)) cfg.tipos.push(tipo);
  if(!checked) cfg.tipos = cfg.tipos.filter(t=>t!==tipo);
  populateTurnoForm();
  queueSaveState();
}
function applyTurnoConfigLive(){
  const cfg = state.turnoConfig;
  cfg.horaIni = document.getElementById('cfgHoraIni').value;
  cfg.horaFin = document.getElementById('cfgHoraFin').value;
  cfg.duracion = Number(document.getElementById('cfgDuracion').value);
  cfg.maxPorPersona = Number(document.getElementById('cfgMaxPersona').value) || 1;
  cfg.permitirCancelacionPublica = document.getElementById('cfgCancelPublica').checked;
  populateTurnoForm();
  queueSaveState();
}
function applyEmailConfigLive(){
  state.emailConfig.serviceId = document.getElementById('cfgEmailService').value.trim();
  state.emailConfig.templateId = document.getElementById('cfgEmailTemplate').value.trim();
  state.emailConfig.publicKey = document.getElementById('cfgEmailKey').value.trim();
  state.emailConfig.enabled = document.getElementById('cfgEmailEnabled').checked;
  queueSaveState();
}
function renderAdminStats(){
  const el = document.getElementById('adminStats');
  const total = state.turnos.length;
  const pend = state.turnos.filter(t=>t.estado==='pendiente').length;
  const conf = state.turnos.filter(t=>t.estado==='confirmado').length;
  const aten = state.turnos.filter(t=>t.estado==='atendido').length;
  const canc = state.turnos.filter(t=>t.estado==='cancelado').length;

  const motivoCounts = {};
  state.turnos.forEach(t=>{ motivoCounts[t.motivo] = (motivoCounts[t.motivo]||0)+1; });
  const topMotivos = Object.entries(motivoCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxCount = topMotivos.length ? topMotivos[0][1] : 1;

  let html = `<div class="stat-bar-row"><div class="sbr-top"><span>Total de turnos</span><b>${total}</b></div></div>`;
  [['Pendientes',pend],['Confirmados',conf],['Atendidos',aten],['Cancelados',canc]].forEach(([lbl,val])=>{
    const pct = total ? Math.round((val/total)*100) : 0;
    html += `<div class="stat-bar-row"><div class="sbr-top"><span>${lbl}</span><b>${val}</b></div><div class="stat-bar-track"><div class="stat-bar-fill" style="width:${pct}%"></div></div></div>`;
  });
  if(topMotivos.length){
    html += `<div class="modal-sub" style="margin:10px 0 4px;">Motivos más frecuentes</div>`;
    topMotivos.forEach(([m,c])=>{
      const pct = Math.round((c/maxCount)*100);
      html += `<div class="stat-bar-row"><div class="sbr-top"><span>${escapeHtmlText(m)}</span><b>${c}</b></div><div class="stat-bar-track"><div class="stat-bar-fill" style="width:${pct}%; background:var(--gold);"></div></div></div>`;
    });
  }
  el.innerHTML = html;
}

/* ================= DOCENTES ================= */
function initials(name){
  return name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
}
/** Devuelve el contenido HTML interno de un avatar: la foto si existe,
 *  o las iniciales sobre un color de fondo si no hay foto. */
function avatarInner(name, foto){
  if(foto && foto.trim()){
    return `<img src="${foto.trim()}" alt="${escapeHtmlText(name)}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
  }
  return escapeHtmlText(initials(name));
}
function renderTeachers(){
  const grid = document.getElementById('teacherGrid');
  grid.innerHTML = '';
  state.teachers.forEach((t,idx)=>{
    const card = document.createElement('div');
    card.className='teacher-card';
    const color = avatarColors[idx % avatarColors.length];
    card.innerHTML = `
      <button class="admin-remove" onclick="removeTeacher(${idx}, event)">✕</button>
      <div class="avatar" style="background:${color}">${avatarInner(t.name, t.foto)}</div>
      <h4>${t.name}</h4>
      <div class="area">${t.area}</div>
      <span class="view-btn">Ver horario</span>
    `;
    card.addEventListener('click', (e)=>{ if(!e.target.classList.contains('admin-remove')) openHorario(idx); });
    grid.appendChild(card);
  });
  document.getElementById('statTeachers') && (document.getElementById('statTeachers').textContent = state.teachers.length);
  initScrollReveal();
}
let currentHorarioTeacherId = null;
function openHorario(idx){
  const t = state.teachers[idx];
  currentHorarioTeacherId = t.id;
  document.getElementById('horarioNombre').textContent = t.name;
  document.getElementById('horarioArea').textContent = t.area;
  const color = avatarColors[idx % avatarColors.length];
  const av = document.getElementById('horarioAvatar');
  av.innerHTML = avatarInner(t.name, t.foto);
  av.style.background = color;
  const estadoEl = document.getElementById('horarioEstado');
  estadoEl.className = 'estado-row ' + (t.activo ? 'activo' : 'inactivo');
  estadoEl.innerHTML = `<span class="dot"></span> <span>Estado: ${t.activo ? 'Activo' : 'Inactivo'}</span>`;
  const body = document.getElementById('horarioBody');
  body.innerHTML = t.schedule.map(r=>`<tr><td class="day">${r.day}</td><td>${r.hours}</td><td>${r.tipo}</td></tr>`).join('');
  openOverlay('overlayHorario');
}
function removeTeacher(idx, e){
  e.stopPropagation();
  if(!isAdmin) return;
  state.teachers.splice(idx,1);
  renderTeachers();
  renderAdminTeacherList();
  toast('Docente eliminado');
  queueSaveState();
}
function addTeacherPrompt(){
  const name = prompt('Nombre del docente:');
  if(!name) return;
  const area = prompt('Área / grado que orienta:') || 'Área por definir';
  const password = prompt('Contraseña de acceso para este docente:') || 'docente123';
  const foto = prompt('URL de una foto (opcional, déjalo vacío para usar iniciales):') || '';
  const defaultSchedule = [
    {day:"Lunes", hours:"2:00 pm – 3:00 pm", tipo:"Padres y estudiantes"},
    {day:"Martes", hours:"2:00 pm – 3:00 pm", tipo:"Padres y estudiantes"},
    {day:"Miércoles", hours:"2:00 pm – 3:00 pm", tipo:"Padres y estudiantes"},
    {day:"Jueves", hours:"2:00 pm – 3:00 pm", tipo:"Padres y estudiantes"},
    {day:"Viernes", hours:"10:00 am – 11:00 am", tipo:"Padres y estudiantes"}
  ];
  const id = 'doc-' + Date.now();
  state.teachers.push({id, password, activo:true, name, area, foto, schedule:defaultSchedule});
  renderTeachers();
  renderAdminTeacherList();
  toast('Docente agregado');
  logAudit('Administrador', 'Agregó al docente ' + name);
  queueSaveState();
}

/* ================= ADMIN: listas editables ================= */
function renderAdminTeacherList(){
  const list = document.getElementById('adminTeacherList');
  list.innerHTML = '';
  state.teachers.forEach((t,idx)=>{
    const row = document.createElement('div');
    row.className='mini-row';
    row.style.flexWrap = 'wrap';
    row.innerHTML = `<input value="${t.name}" onchange="updateTeacherName(${idx}, this.value)" style="min-width:110px;">
                      <input value="${t.foto||''}" placeholder="URL de foto (opcional)" onchange="updateTeacherFoto(${idx}, this.value)" style="min-width:150px;">
                      <label style="display:flex; align-items:center; gap:4px; font-size:11px; white-space:nowrap;">
                        <input type="checkbox" style="width:auto;" ${t.activo?'checked':''} onchange="toggleTeacherActivo(${idx}, this.checked)"> Activo
                      </label>
                      <button title="Cambiar contraseña" onclick="changeTeacherPassword(${idx})">🔑</button>
                      <button title="Editar horario" onclick="openEditHorario(${idx})" style="color:var(--navy-deep);">🗓️</button>
                      <button title="Eliminar" onclick="removeTeacher(${idx}, event)">✕</button>`;
    list.appendChild(row);
  });
}
function updateTeacherFoto(idx, val){
  state.teachers[idx].foto = val;
  renderTeachers();
  queueSaveState();
}
function toggleTeacherActivo(idx, checked){
  state.teachers[idx].activo = checked;
  logAudit('Administrador', (checked?'Activó':'Desactivó') + ' al docente ' + state.teachers[idx].name);
  queueSaveState();
}
let passwordChangeContext = null;
function changeTeacherPassword(idx){
  passwordChangeContext = {mode:'admin', idx};
  document.getElementById('cpTitle').textContent = 'Cambiar contraseña de ' + state.teachers[idx].name;
  document.getElementById('cpNew').value = '';
  document.getElementById('cpConfirm').value = '';
  document.getElementById('cpError').classList.remove('show');
  openOverlay('overlayChangePassword');
}
function openDocenteChangePassword(){
  const idx = state.teachers.findIndex(x=>x.id===consoleContext.id);
  if(idx === -1) return;
  passwordChangeContext = {mode:'self', idx};
  document.getElementById('cpTitle').textContent = 'Cambiar mi contraseña';
  document.getElementById('cpNew').value = '';
  document.getElementById('cpConfirm').value = '';
  document.getElementById('cpError').classList.remove('show');
  openOverlay('overlayChangePassword');
}
function saveChangedPassword(){
  const nueva = document.getElementById('cpNew').value.trim();
  const confirmar = document.getElementById('cpConfirm').value.trim();
  const errEl = document.getElementById('cpError');
  if(!nueva || nueva.length < 4){
    errEl.textContent = 'La contraseña debe tener al menos 4 caracteres.';
    errEl.classList.add('show');
    errorSound();
    return;
  }
  if(nueva !== confirmar){
    errEl.textContent = 'Las contraseñas no coinciden.';
    errEl.classList.add('show');
    errorSound();
    return;
  }
  const idx = passwordChangeContext.idx;
  const t = state.teachers[idx];
  t.password = nueva;
  closeOverlay('overlayChangePassword');
  successSound();
  toast('Contraseña de ' + t.name + ' actualizada');
  logAudit(passwordChangeContext.mode==='self' ? t.name : 'Administrador',
    passwordChangeContext.mode==='self' ? 'Cambió su propia contraseña de acceso' : ('Cambió la contraseña de ' + t.name));
  if(passwordChangeContext.mode==='admin') renderAdminTeacherList();
  queueSaveState();
}
function openEditHorario(idx){
  const t = state.teachers[idx];
  document.getElementById('editHorarioNombre').textContent = 'Horario de ' + t.name;
  const list = document.getElementById('editHorarioList');
  list.innerHTML = '';
  t.schedule.forEach((r, ridx)=>{
    const row = document.createElement('div');
    row.className='mini-row';
    row.innerHTML = `<input style="max-width:80px" value="${r.day}" onchange="updateTeacherSchedule(${idx},${ridx},'day',this.value)">
                      <input value="${r.hours}" onchange="updateTeacherSchedule(${idx},${ridx},'hours',this.value)">
                      <input value="${r.tipo}" onchange="updateTeacherSchedule(${idx},${ridx},'tipo',this.value)">`;
    list.appendChild(row);
  });
  openOverlay('overlayEditHorario');
}
function updateTeacherSchedule(idx, ridx, field, val){
  state.teachers[idx].schedule[ridx][field] = val;
  logAudit('Administrador', 'Modificó horario de ' + state.teachers[idx].name);
  queueSaveState();
}
function updateTeacherName(idx, val){
  state.teachers[idx].name = val;
  renderTeachers();
  queueSaveState();
}
function renderAdminScheduleList(){
  // El horario ahora es individual por docente; ver openEditHorario().
}
function savePasswords(){
  const a = document.getElementById('editAdminPass').value.trim();
  const c = document.getElementById('editCoordPass').value.trim();
  if(a) state.adminPass = a;
  if(c) state.coordPass = c;
  document.getElementById('editAdminPass').value='';
  document.getElementById('editCoordPass').value='';
  toast('Contraseñas actualizadas');
  logAudit('Administrador', 'Actualizó contraseñas de acceso');
  queueSaveState();
}

/* ================= TEMA: colores, tipografía, animaciones ================= */
const defaultTheme = {
  navyDeep:"#0B2A4A", celeste:"#6EC1E4", gold:"#F5D68C", mint:"#BFE3D0",
  crestRed:"#C23B32", bgPastel:"#EAF4FB", fontDisplay:"Fraunces", fontBody:"Manrope", animationsOn:true
};
const presets = {
  institucional:{navyDeep:"#0B2A4A", celeste:"#6EC1E4", gold:"#F5D68C", mint:"#BFE3D0", crestRed:"#C23B32", bgPastel:"#EAF4FB"},
  oceano:{navyDeep:"#0B3D5C", celeste:"#3AA6C7", gold:"#F2C14E", mint:"#9FD8CB", crestRed:"#D1495B", bgPastel:"#E7F3F8"},
  pastel:{navyDeep:"#3A4A6B", celeste:"#A9D6E5", gold:"#F7E1A0", mint:"#CDEAC0", crestRed:"#E38B8B", bgPastel:"#FBF6EF"}
};
let loadedFonts = new Set(["Fraunces","Manrope","Space Mono"]);
function loadGoogleFont(name){
  if(loadedFonts.has(name)) return;
  loadedFonts.add(name);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' + name.replace(/ /g,'+') + ':wght@400;500;600;700;800&display=swap';
  document.head.appendChild(link);
}
function lighten(hex, amount){
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2),16), g = parseInt(hex.substring(2,4),16), b = parseInt(hex.substring(4,6),16);
  const nr = Math.round(r + (255-r)*amount), ng = Math.round(g + (255-g)*amount), nb = Math.round(b + (255-b)*amount);
  return '#' + [nr,ng,nb].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function darken(hex, amount){
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2),16), g = parseInt(hex.substring(2,4),16), b = parseInt(hex.substring(4,6),16);
  const nr = Math.round(r*(1-amount)), ng = Math.round(g*(1-amount)), nb = Math.round(b*(1-amount));
  return '#' + [nr,ng,nb].map(x=>x.toString(16).padStart(2,'0')).join('');
}
function hexToRgba(hex, alpha){
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2),16), g = parseInt(hex.substring(2,4),16), b = parseInt(hex.substring(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}
function applyTheme(){
  const root = document.documentElement.style;
  const t = state.theme;
  root.setProperty('--navy-deep', t.navyDeep);
  root.setProperty('--navy', t.navyDeep);
  root.setProperty('--celeste', t.celeste);
  root.setProperty('--celeste-soft', lighten(t.celeste, 0.6));
  root.setProperty('--gold', t.gold);
  root.setProperty('--mint', t.mint);
  root.setProperty('--crest-red', t.crestRed);
  root.setProperty('--bg-pastel', t.bgPastel);
  root.setProperty('--navy-darker', darken(t.navyDeep, 0.4));
  root.setProperty('--celeste-dark', darken(t.celeste, 0.25));
  root.setProperty('--celeste-glow', hexToRgba(t.celeste, 0.55));
  root.setProperty('--celeste-glow-strong', hexToRgba(t.celeste, 0.4));
  root.setProperty('--gold-glow', hexToRgba(t.gold, 0.9));
  loadGoogleFont(t.fontDisplay);
  loadGoogleFont(t.fontBody);
  root.setProperty('--ff-display', `'${t.fontDisplay}', serif`);
  root.setProperty('--ff-body', `'${t.fontBody}', sans-serif`);
  document.body.classList.toggle('no-animations', !t.animationsOn);
}
function populateThemeFields(){
  const t = state.theme;
  document.getElementById('colNavyDeep').value = t.navyDeep;
  document.getElementById('colCeleste').value = t.celeste;
  document.getElementById('colGold').value = t.gold;
  document.getElementById('colMint').value = t.mint;
  document.getElementById('colRed').value = t.crestRed;
  document.getElementById('colBg').value = t.bgPastel;
  document.getElementById('fontDisplaySelect').value = t.fontDisplay;
  document.getElementById('fontBodySelect').value = t.fontBody;
  document.getElementById('animToggle').checked = t.animationsOn;
}
function applyThemeLive(){
  state.theme.navyDeep = document.getElementById('colNavyDeep').value;
  state.theme.celeste = document.getElementById('colCeleste').value;
  state.theme.gold = document.getElementById('colGold').value;
  state.theme.mint = document.getElementById('colMint').value;
  state.theme.crestRed = document.getElementById('colRed').value;
  state.theme.bgPastel = document.getElementById('colBg').value;
  state.theme.fontDisplay = document.getElementById('fontDisplaySelect').value;
  state.theme.fontBody = document.getElementById('fontBodySelect').value;
  state.theme.animationsOn = document.getElementById('animToggle').checked;
  applyTheme();
  queueSaveState();
}
function applyPreset(name){
  const p = presets[name];
  state.theme = {...state.theme, ...p};
  populateThemeFields();
  applyTheme();
  toast('Paleta "' + name + '" aplicada');
  queueSaveState();
}
function resetTheme(){
  state.theme = {...defaultTheme};
  populateThemeFields();
  applyTheme();
  toast('Diseño original restaurado');
  queueSaveState();
}

/* ================= EDITOR DE TEXTO GENÉRICO ================= */
let textEditorCallback = null;
function openTextEditor(title, subtitle, initialValue, callback){
  document.getElementById('textEditorTitle').textContent = title;
  document.getElementById('textEditorSub').textContent = subtitle;
  document.getElementById('textEditorArea').value = initialValue || '';
  textEditorCallback = callback;
  openOverlay('overlayTextEditor');
}
function saveTextEditor(){
  const val = document.getElementById('textEditorArea').value;
  if(textEditorCallback) textEditorCallback(val);
  closeOverlay('overlayTextEditor');
}

/* ================= BIOGRAFÍAS (Inicio) ================= */
function renderBios(){
  const grid = document.getElementById('bioGrid');
  const section = document.getElementById('bioSection');
  grid.innerHTML = '';
  if(state.bios.length === 0){ section.style.display = 'none'; return; }
  section.style.display = 'block';
  state.bios.forEach((b, idx)=>{
    const card = document.createElement('div');
    card.className = 'bio-card';
    const color = avatarColors[idx % avatarColors.length];
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.style.background = color;
    avatar.innerHTML = avatarInner(b.name, b.foto);
    const h4 = document.createElement('h4'); h4.textContent = b.name;
    const role = document.createElement('div'); role.className = 'role'; role.textContent = b.role;
    const p = document.createElement('p'); p.textContent = b.text;
    card.append(avatar, h4, role, p);
    grid.appendChild(card);
  });
  initScrollReveal();
}
function renderAdminBioList(){
  const list = document.getElementById('adminBioList');
  list.innerHTML = '';
  state.bios.forEach((b, idx)=>{
    const row = document.createElement('div');
    row.className = 'mini-row';
    row.style.flexWrap = 'wrap';
    row.innerHTML = `<input value="${b.name}" placeholder="Nombre" onchange="updateBioField(${idx},'name',this.value)" style="min-width:110px;">
                      <input value="${b.role}" placeholder="Cargo" style="max-width:110px" onchange="updateBioField(${idx},'role',this.value)">
                      <input value="${b.foto||''}" placeholder="URL de foto (opcional)" onchange="updateBioField(${idx},'foto',this.value)" style="min-width:150px;">
                      <button title="Editar biografía" onclick="editBioText(${idx})">✏️</button>
                      <button title="Eliminar" onclick="removeBio(${idx})">✕</button>`;
    list.appendChild(row);
  });
}
function updateBioField(idx, field, val){ state.bios[idx][field] = val; renderBios(); queueSaveState(); }
function editBioText(idx){
  const b = state.bios[idx];
  openTextEditor('Biografía de ' + b.name, 'Escribe una breve reseña. Cada línea nueva será un párrafo.', b.text, (val)=>{
    state.bios[idx].text = val;
    renderBios();
    toast('Biografía actualizada');
    queueSaveState();
  });
}
function removeBio(idx){
  state.bios.splice(idx,1);
  renderAdminBioList();
  renderBios();
  toast('Biografía eliminada');
  queueSaveState();
}
function addBioPrompt(){
  const name = prompt('Nombre de la persona:');
  if(!name) return;
  const role = prompt('Cargo o rol (ej. Rector, Fundadora):') || 'Miembro destacado';
  const foto = prompt('URL de una foto (opcional, déjalo vacío para usar iniciales):') || '';
  state.bios.push({name, role, foto, text:''});
  renderAdminBioList();
  renderBios();
  editBioText(state.bios.length-1);
}

/* ================= PESTAÑAS PERSONALIZADAS ================= */
function renderCustomTabs(){
  document.querySelectorAll('.nav-link.custom-tab').forEach(el=>el.remove());
  document.querySelectorAll('.section.custom-section').forEach(el=>el.remove());
  const nav = document.getElementById('mainNav');
  const main = document.querySelector('main');
  state.customTabs.forEach(tab=>{
    const link = document.createElement('a');
    link.className = 'nav-link custom-tab';
    link.dataset.target = tab.id;
    link.textContent = tab.title;
    link.onclick = ()=>goTo(tab.id);
    nav.appendChild(link);

    const section = document.createElement('section');
    section.className = 'section custom-section';
    section.id = 'sec-' + tab.id;

    const head = document.createElement('div');
    head.className = 'section-head';
    const eyebrow = document.createElement('div'); eyebrow.className = 'eyebrow'; eyebrow.textContent = 'Pestaña personalizada';
    const h2 = document.createElement('h2'); h2.textContent = tab.title;
    head.append(eyebrow, h2);
    section.appendChild(head);

    const content = document.createElement('div');
    content.className = 'custom-content';
    const lines = (tab.content || '').split('\n').filter(l=>l.trim()!=='');
    if(lines.length === 0){
      const p = document.createElement('p');
      p.textContent = 'Este espacio aún no tiene contenido. Ingresa como administrador para editarlo.';
      content.appendChild(p);
    }else{
      lines.forEach(line=>{
        const p = document.createElement('p');
        p.textContent = line;
        content.appendChild(p);
      });
    }
    section.appendChild(content);
    main.appendChild(section);
  });
}
function renderAdminTabList(){
  const list = document.getElementById('adminTabList');
  list.innerHTML = '';
  state.customTabs.forEach((t, idx)=>{
    const row = document.createElement('div');
    row.className = 'mini-row';
    row.innerHTML = `<input value="${t.title}" onchange="updateTabTitle(${idx}, this.value)">
                      <button title="Editar contenido" onclick="editTabContent(${idx})">✏️</button>
                      <button title="Eliminar" onclick="removeTab(${idx})">✕</button>`;
    list.appendChild(row);
  });
}
function updateTabTitle(idx, val){
  state.customTabs[idx].title = val;
  renderCustomTabs();
  queueSaveState();
}
function editTabContent(idx){
  const t = state.customTabs[idx];
  openTextEditor('Contenido de "' + t.title + '"', 'Cada línea nueva se mostrará como un párrafo dentro de la pestaña.', t.content, (val)=>{
    t.content = val;
    renderCustomTabs();
    toast('Pestaña actualizada');
    queueSaveState();
  });
}
function removeTab(idx){
  const t = state.customTabs[idx];
  const wasActive = document.getElementById('sec-'+t.id) && document.getElementById('sec-'+t.id).classList.contains('active');
  state.customTabs.splice(idx,1);
  renderCustomTabs();
  renderAdminTabList();
  if(wasActive) goTo('inicio');
  toast('Pestaña eliminada');
  queueSaveState();
}
function addTabPrompt(){
  const title = prompt('Título de la nueva pestaña (ej. Egresados, Bienestar, Admisiones):');
  if(!title) return;
  const id = 'tab-' + Date.now();
  state.customTabs.push({id, title, content:''});
  renderCustomTabs();
  renderAdminTabList();
  editTabContent(state.customTabs.length-1);
}

/* ================= LIVE EDIT (nombre / bienvenida) ================= */
function applyLive(){
  state.schoolName = document.getElementById('editSchoolName').value;
  state.welcome = document.getElementById('editWelcome').value;
  document.getElementById('brandName').textContent = state.schoolName;
  document.getElementById('heroTitle').innerHTML = state.schoolName.replace('Montessori','<span>Montessori</span>');
  document.getElementById('heroWelcome').textContent = state.welcome;
  document.getElementById('footerName').textContent = state.schoolName;
  queueSaveState();
}

/* ================= INIT ================= */
applyTheme();
applyLogoToDom();
renderContactInfo();
renderTeachers();
renderBios();
renderCustomTabs();
populateTurnoForm();
initScrollReveal();