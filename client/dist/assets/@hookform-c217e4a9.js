import{g as l,s as d,a as y}from"./react-hook-form-562096cd.js";var h=function(e,r,t){if(e&&"reportValidity"in e){var o=l(t,r);e.setCustomValidity(o&&o.message||""),e.reportValidity()}},m=function(e,r){var t=function(u){var n=r.fields[u];n&&n.ref&&"reportValidity"in n.ref?h(n.ref,u,e):n.refs&&n.refs.forEach(function(i){return h(i,u,e)})};for(var o in r.fields)t(o)},g=function(e,r){r.shouldUseNativeValidation&&m(e,r);var t={};for(var o in e){var u=l(r.fields,o),n=Object.assign(e[o]||{},{ref:u&&u.ref});if(V(r.names||Object.keys(e),o)){var i=Object.assign({},l(t,o));d(i,"root",n),d(t,o,i)}else d(t,o,n)}return t},V=function(e,r){return e.some(function(t){return t.startsWith(r+".")})};function j(e,r,t){return r===void 0&&(r={}),t===void 0&&(t={}),function(o,u,n){try{return Promise.resolve(function(i,c){try{var f=(r.context,Promise.resolve(e[t.mode==="sync"?"validateSync":"validate"](o,Object.assign({abortEarly:!1},r,{context:u}))).then(function(a){return n.shouldUseNativeValidation&&m({},n),{values:t.raw?o:a,errors:{}}}))}catch(a){return c(a)}return f&&f.then?f.then(void 0,c):f}(0,function(i){if(!i.inner)throw i;return{values:{},errors:g((c=i,f=!n.shouldUseNativeValidation&&n.criteriaMode==="all",(c.inner||[]).reduce(function(a,s){if(a[s.path]||(a[s.path]={message:s.message,type:s.type}),f){var v=a[s.path].types,p=v&&v[s.type];a[s.path]=y(s.path,f,a,s.type,p?[].concat(p,s.message):s.message)}return a},{})),n)};var c,f}))}catch(i){return Promise.reject(i)}}}export{j as o};
