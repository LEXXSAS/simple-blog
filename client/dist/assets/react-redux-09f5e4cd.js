import{a as g,R as T}from"./react-64cc6456.js";import{w as U}from"./use-sync-external-store-75d8866b.js";var u="default"in g?T:g,C=Symbol.for("react-redux-context"),w=typeof globalThis<"u"?globalThis:{};function D(){if(!u.createContext)return{};const e=w[C]??(w[C]=new Map);let t=e.get(u.createContext);return t||(t=u.createContext(null),e.set(u.createContext,t)),t}var c=D(),O=()=>{throw new Error("uSES not initialized!")};function y(e=c){return function(){return u.useContext(e)}}var E=y(),R=O,P=e=>{R=e},H=(e,t)=>e===t;function V(e=c){const t=e===c?E:y(e),n=(s,r={})=>{const{equalityFn:i=H,devModeChecks:a={}}=typeof r=="function"?{equalityFn:r}:r,{store:l,subscription:f,getServerState:o,stabilityCheck:b,identityFunctionCheck:p}=t();u.useRef(!0);const v=u.useCallback({[s.name](d){return s(d)}}[s.name],[s,b,a.stabilityCheck]),S=R(f.addNestedSub,l.getState,o||l.getState,v,i);return u.useDebugValue(S),S};return Object.assign(n,{withTypes:()=>n}),n}var J=V();function N(e){e()}function z(){let e=null,t=null;return{clear(){e=null,t=null},notify(){N(()=>{let n=e;for(;n;)n.callback(),n=n.next})},get(){const n=[];let s=e;for(;s;)n.push(s),s=s.next;return n},subscribe(n){let s=!0;const r=t={callback:n,next:null,prev:t};return r.prev?r.prev.next=r:e=r,function(){!s||e===null||(s=!1,r.next?r.next.prev=r.prev:t=r.prev,r.prev?r.prev.next=r.next:e=r.next)}}}}var m={notify(){},get:()=>[]};function W(e,t){let n,s=m,r=0,i=!1;function a(x){b();const M=s.subscribe(x);let h=!1;return()=>{h||(h=!0,M(),p())}}function l(){s.notify()}function f(){d.onStateChange&&d.onStateChange()}function o(){return i}function b(){r++,n||(n=t?t.addNestedSub(f):e.subscribe(f),s=z())}function p(){r--,n&&r===0&&(n(),n=void 0,s.clear(),s=m)}function v(){i||(i=!0,b())}function S(){i&&(i=!1,p())}const d={addNestedSub:a,notifyNestedSubs:l,handleChangeWrapper:f,isSubscribed:o,trySubscribe:v,tryUnsubscribe:S,getListeners:()=>s};return d}var q=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",I=q?u.useLayoutEffect:u.useEffect;function k(e,t){return e===t?e!==0||t!==0||1/e===1/t:e!==e&&t!==t}function Q(e,t){if(k(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;const n=Object.keys(e),s=Object.keys(t);if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(!Object.prototype.hasOwnProperty.call(t,n[r])||!k(e[n[r]],t[n[r]]))return!1;return!0}function K({store:e,context:t,children:n,serverState:s,stabilityCheck:r="once",identityFunctionCheck:i="once"}){const a=u.useMemo(()=>{const o=W(e);return{store:e,subscription:o,getServerState:s?()=>s:void 0,stabilityCheck:r,identityFunctionCheck:i}},[e,s,r,i]),l=u.useMemo(()=>e.getState(),[e]);I(()=>{const{subscription:o}=a;return o.onStateChange=o.notifyNestedSubs,o.trySubscribe(),l!==e.getState()&&o.notifyNestedSubs(),()=>{o.tryUnsubscribe(),o.onStateChange=void 0}},[a,l]);const f=t||c;return u.createElement(f.Provider,{value:a},n)}var X=K;function L(e=c){const t=e===c?E:y(e),n=()=>{const{store:s}=t();return s};return Object.assign(n,{withTypes:()=>n}),n}var _=L();function $(e=c){const t=e===c?_:L(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var Y=$(),Z=N;P(U.useSyncExternalStoreWithSelector);export{X as P,J as a,Z as b,_ as c,Q as s,Y as u};
