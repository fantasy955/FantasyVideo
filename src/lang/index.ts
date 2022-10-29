// index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './global-en'
import zh from '/@/lang/global-zh-cn'

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n

