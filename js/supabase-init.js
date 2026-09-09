// =======================================================================
// BASE DE DATOS EN LA NUBE (Supabase / PostgreSQL — gratuito)
// -----------------------------------------------------------------------
// 1. Crea un proyecto gratis en https://supabase.com
// 2. Ve a "SQL Editor" y ejecuta el contenido de docs/supabase.sql
//    (crea las tablas, los índices y activa la sincronización en vivo).
// 3. Ve a "Project Settings" → "API" y copia:
//      - "Project URL"       → pégalo en SUPABASE_URL
//      - "anon public" key   → pégalo en SUPABASE_ANON_KEY
// Mientras no completes esta configuración, la página sigue funcionando
// con datos de ejemplo, pero los cambios no se guardarán entre sesiones
// ni se compartirán entre dispositivos.
// =======================================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://vefvbcxpstnfkxpvbafi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZCbxRBVZ8RO85KbijDcPbA_UVvWI4l_";

let ready = false;
let supabase = null;
try{
  const configured = SUPABASE_URL && !SUPABASE_URL.includes("TU_PROYECTO") &&
                      SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("TU_ANON_KEY");
  if(configured){
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    ready = true;
  }
}catch(e){
  console.warn("Supabase no se pudo inicializar:", e);
}

window.__sb = { supabase, ready };
window.dispatchEvent(new Event("supabase-ready"));
