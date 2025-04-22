import React, { useState, FormEvent } from 'react';
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (register(email, pass)) {
      navigate('/dashboard');
    } else {
      setError('El usuario ya existe');
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white p-4">
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow max-w-xs w-full p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Crear cuenta</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="input input-bordered w-full" 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          className="input input-bordered w-full" 
          required 
        />
        <button className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
          Registrarme
        </button>
        <a href="/login" className="text-blue-600 text-sm text-center underline">
          ¿Ya tienes cuenta? Inicia sesión
        </a>
      </form>
    </main>
  );
}
