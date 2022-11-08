// index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './global-en'
import zh_cn from '/@/lang/global-zh-cn'

interface assignLocale {
  [key: string]: any
}

// 键不能使用zh-cn
const resources = {
  en: {
    translation: en
  },
  'zh_cn': {
    translation: zh_cn
  }
}

const assignLocale: assignLocale = {
  'zh_cn': [],
  en: []
}

const lng = localStorage.getItem('lang') || 'zh_cn'
if (lng === 'zh_cn') {
  assignLocale[lng].push(getLangFileMessage(import.meta.glob('./pages/zh-cn/**/*.ts', { eager: true }), 'zh-cn'))
} else if (lng === 'en') {
  assignLocale[lng].push(getLangFileMessage(import.meta.glob('./pages/zh-cn/**/*.ts', { eager: true }), 'en'))
}
Object.assign(resources[lng].translation, ...assignLocale[lng])
// console.log(resources[lng])
i18n.use(initReactI18next).init({
  resources,
  lng: lng,
  fallbackLng: 'zh_cn',
  interpolation: {
    escapeValue: false
  }
})

export default i18n

function getLangFileMessage(mList: any, locale: string) {
  interface msg {
    [key: string]: any
  }
  let msg: msg = {}
  locale = '/' + locale
  for (let path in mList) {
    if (mList[path].default) {
      //  获取文件名
      let pathName = path.slice(path.lastIndexOf(locale) + (locale.length + 1), path.lastIndexOf('.'))
      if (pathName.indexOf('/') > 0) {
        let pathNameTmp = pathName.split('/')
        if (pathNameTmp.length == 2) {
          if (msg[pathNameTmp[0]] === undefined) msg[pathNameTmp[0]] = []
          msg[pathNameTmp[0]][pathNameTmp[1]] = handleMsglist(mList[path].default)
        } else if (pathNameTmp.length == 3) {
          if (msg[pathNameTmp[0]] === undefined) msg[pathNameTmp[0]] = []
          if (msg[pathNameTmp[0]][pathNameTmp[1]] === undefined) msg[pathNameTmp[0]][pathNameTmp[1]] = []
          msg[pathNameTmp[0]][pathNameTmp[1]][pathNameTmp[2]] = handleMsglist(mList[path].default)
        } else {
          msg[pathName] = handleMsglist(mList[path].default)
        }
      } else {
        msg[pathName] = handleMsglist(mList[path].default)
      }
    }
  }
  return msg
}

function handleMsglist(mlist: anyObj) {
  let newMlist: any = []
  for (const key in mlist) {
    if (key.indexOf('.') > 0) {
      let keyTmp = key.split('.')
      if (typeof newMlist[keyTmp[0]] === 'undefined') {
        newMlist[keyTmp[0]] = []
      } else {
        newMlist[keyTmp[0]][keyTmp[1]] = mlist[key]
      }
    } else {
      newMlist[key] = mlist[key]
    }
  }
  return newMlist
}

