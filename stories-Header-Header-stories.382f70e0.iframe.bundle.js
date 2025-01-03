/*! For license information please see stories-Header-Header-stories.382f70e0.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkdinggul_system=self.webpackChunkdinggul_system||[]).push([[386],{"./src/stories/Header/Header.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoggedIn:()=>LoggedIn,LoggedOut:()=>LoggedOut,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_test__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/test/dist/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Example/Header",component:__webpack_require__("./src/stories/Header/Header.tsx").Y,tags:["autodocs"],parameters:{layout:"fullscreen"},args:{onLogin:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_0__.fn)(),onLogout:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_0__.fn)(),onCreateAccount:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_0__.fn)()}},LoggedIn={args:{user:{name:"Jane Doe"}}},LoggedOut={},__namedExportsOrder=["LoggedIn","LoggedOut"];LoggedIn.parameters={...LoggedIn.parameters,docs:{...LoggedIn.parameters?.docs,source:{originalSource:"{\n  args: {\n    user: {\n      name: 'Jane Doe'\n    }\n  }\n}",...LoggedIn.parameters?.docs?.source}}},LoggedOut.parameters={...LoggedOut.parameters,docs:{...LoggedOut.parameters?.docs,source:{originalSource:"{}",...LoggedOut.parameters?.docs?.source}}}},"./src/stories/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function toPropertyKey(t){var i=function toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==_typeof(i)?i:i+""}function _defineProperty(e,r,t){return(r=toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}__webpack_require__.d(__webpack_exports__,{$:()=>Button});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["label","size","variant","className","as","href","target","title","isExternalLink","onClick","disabled","readonly","designType"],Button=_ref=>{let{label,size="md",variant="default",className="",as="button",href,target,title,isExternalLink=!1,onClick,disabled=!1,readonly=!1,designType}=_ref,props=function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(e.includes(n))continue;t[n]=r[n]}return t}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)o=s[r],t.includes(o)||{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}(_ref,_excluded);const baseClasses=["btn","btn-".concat(size),"btn-".concat(variant),"btn-".concat(designType),disabled?"btn-disabled":"",readonly?"btn-readonly":"",className].filter(Boolean).join(" "),handleClick=e=>{disabled||readonly?e.preventDefault():onClick&&onClick()};return href||"a"===as?(0,jsx_runtime.jsxs)("a",_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({href:href||"#",className:baseClasses,onClick:handleClick,target,title,rel:"_blank"===target?"noopener noreferrer":void 0},disabled&&{"aria-disabled":!0}),readonly&&{tabIndex:-1,"aria-readonly":!0}),props),{},{children:[label,isExternalLink&&"_blank"===target&&(0,jsx_runtime.jsx)("i",{className:"ico ico-external-link ml-1","aria-hidden":"true"})]})):(0,jsx_runtime.jsx)("button",_objectSpread2(_objectSpread2({type:"button",className:baseClasses,onClick:handleClick,disabled,"aria-disabled":disabled||readonly,tabIndex:readonly?-1:0},props),{},{children:label}))};Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'full'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'full'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'primary' | 'outline-default' | 'outline-primary'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'outline-default'"},{name:"literal",value:"'outline-primary'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},as:{required:!1,tsType:{name:"union",raw:"'button' | 'a'",elements:[{name:"literal",value:"'button'"},{name:"literal",value:"'a'"}]},description:"",defaultValue:{value:"'button'",computed:!1}},href:{required:!1,tsType:{name:"string"},description:""},target:{required:!1,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},isExternalLink:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},readonly:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},designType:{required:!1,tsType:{name:"union",raw:"'type01' | 'type02' | 'type03'",elements:[{name:"literal",value:"'type01'"},{name:"literal",value:"'type02'"},{name:"literal",value:"'type03'"}]},description:""}}}},"./src/stories/Header/Header.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>Header});__webpack_require__("./node_modules/react/index.js");var Button=__webpack_require__("./src/stories/Button/Button.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Header=_ref=>{let{user=null,onLogin,onLogout,onCreateAccount}=_ref;return(0,jsx_runtime.jsx)("header",{children:(0,jsx_runtime.jsxs)("div",{className:"storybook-header",children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:(0,jsx_runtime.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[(0,jsx_runtime.jsx)("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),(0,jsx_runtime.jsx)("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),(0,jsx_runtime.jsx)("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),(0,jsx_runtime.jsx)("h1",{children:"Acme"})]}),(0,jsx_runtime.jsx)("div",{children:user?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("span",{className:"welcome",children:["Welcome, ",(0,jsx_runtime.jsx)("b",{children:user.name}),"!"]}),(0,jsx_runtime.jsx)(Button.$,{size:"sm",onClick:onLogout,label:"Log out"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Button.$,{size:"sm",onClick:onLogin,label:"Log in"}),(0,jsx_runtime.jsx)(Button.$,{size:"sm",onClick:onCreateAccount,label:"Sign up"})]})})]})})};Header.__docgenInfo={description:"",methods:[],displayName:"Header",props:{user:{required:!1,tsType:{name:"union",raw:"User | null",elements:[{name:"User"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},onLogin:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onLogout:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCreateAccount:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./node_modules/react/cjs/react-jsx-runtime.production.js":(__unused_webpack_module,exports)=>{var REACT_ELEMENT_TYPE=Symbol.for("react.transitional.element"),REACT_FRAGMENT_TYPE=Symbol.for("react.fragment");function jsxProd(type,config,maybeKey){var key=null;if(void 0!==maybeKey&&(key=""+maybeKey),void 0!==config.key&&(key=""+config.key),"key"in config)for(var propName in maybeKey={},config)"key"!==propName&&(maybeKey[propName]=config[propName]);else maybeKey=config;return config=maybeKey.ref,{$$typeof:REACT_ELEMENT_TYPE,type,key,ref:void 0!==config?config:null,props:maybeKey}}exports.Fragment=REACT_FRAGMENT_TYPE,exports.jsx=jsxProd,exports.jsxs=jsxProd},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.js")}}]);