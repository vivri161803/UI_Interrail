import { supabase } from '../utils/supabase.js';

export async function initLoginSection() {
  const overlay = document.getElementById('login-overlay');
  const appContainer = document.getElementById('app');
  if (!overlay) return;

  // We need Supabase configured to use Auth
  if (!supabase) {
    console.warn('[LoginSection] Supabase client not initialized. Cannot use Auth.');
    // If no Supabase, we unlock the app (assuming development or incomplete setup)
    unlockApp();
    return;
  }

  // Check current session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    unlockApp();
  } else {
    lockApp();
  }

  // Setup form submission
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');
  const submitBtn = loginForm.querySelector('.login-button');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.remove('visible');
    errorMsg.textContent = '';
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    submitBtn.textContent = 'Accesso in corso...';
    submitBtn.disabled = true;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        unlockApp();
      }
    } catch (err) {
      errorMsg.textContent = 'Credenziali non valide o errore di connessione.';
      errorMsg.classList.add('visible');
    } finally {
      submitBtn.textContent = 'Accedi';
      submitBtn.disabled = false;
    }
  });

  // Setup logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await handleLogout();
    });
  }

  // Listen to auth state changes to handle external logout or token expiration
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      lockApp();
    } else if (event === 'SIGNED_IN') {
      unlockApp();
    }
  });
}

function unlockApp() {
  document.body.classList.remove('auth-locked');
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function lockApp() {
  document.body.classList.add('auth-locked');
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

export async function handleLogout() {
  if (!supabase) return;
  await supabase.auth.signOut();
  // onAuthStateChange will automatically lock the app
}
