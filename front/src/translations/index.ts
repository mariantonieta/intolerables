// src/i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';  // Para cargar traducciones desde archivos estáticos
import LanguageDetector from 'i18next-browser-languagedetector'; // Para detectar idioma del navegador

i18next
  .use(Backend)  // Usar el backend para cargar archivos de traducción
  .use(LanguageDetector) // Detectar el idioma preferido del usuario
  .use(initReactI18next) // Pasar la instancia de i18next a React
  .init({
    fallbackLng: 'es', // Idioma por defecto
    debug: true, // Habilitar para ver mensajes en consola (opcional)
    interpolation: {
      escapeValue: false, // React ya escapa el HTML, no necesitamos escapar los valores
    },
    backend: {
      loadPath: '/src/translations/{{lng}}/translation.json', // Ruta donde se cargarán los archivos de traducción
    },
    supportedLngs: ['es', 'en', 'it'], // Idiomas soportados
    // Detectar idioma del navegador y usarlo si está soportado
    // Callback para cuando se cambie el idioma
   });

export default i18next;
