"use strict";(self.webpackChunkversakit=self.webpackChunkversakit||[]).push([[183],{29292:function(T,t,e){e.r(t);var _=e(93989),m=e(67294),n=e(85893),l=function(r){console.log(r)},a=[{key:"1",label:"Tab 1",children:"Content of Tab Pane 1"},{key:"2",label:"Tab 2",children:"Content of Tab Pane 2"},{key:"3",label:"Tab 3",children:"Content of Tab Pane 3"}],o=function(){return(0,n.jsx)(_.mQ,{items:a,onChange:l})};t.default=o},25476:function(T,t,e){e.r(t);var _=e(93989),m=e(67294),n=e(85893),l=function(){return(0,n.jsx)(_.mQ,{center:!0,items:new Array(3).fill(null).map(function(o,i){var r=String(i+1);return{label:"Tab ".concat(r),key:r,children:"Content of Tab Pane ".concat(r)}})})};t.default=l},41375:function(T,t,e){e.r(t);var _=e(93989),m=e(67294),n=e(85893),l=[{key:"1",label:"Tab 1",children:"Content of Tab Pane 1"},{key:"2",label:"Tab 2",children:"Content of Tab Pane 2",disabled:!0},{key:"3",label:"Tab 3",children:"Content of Tab Pane 3"}],a=function(){return(0,n.jsx)(_.mQ,{items:l})};t.default=a},63104:function(T,t,e){e.r(t);var _=e(19632),m=e.n(_),n=e(5574),l=e.n(n),a=e(93989),o=e(67294),i=e(85893),r=[{label:"Tab 1",children:"Content of Tab 1",key:"1"},{label:"Tab 2",children:"Content of Tab 2",key:"2"},{label:"Tab 3",children:"Content of Tab 3",key:"3"}],v=function(){var E=(0,o.useState)(r[0].key),f=l()(E,2),u=f[0],c=f[1],D=(0,o.useState)(r),O=l()(D,2),P=O[0],b=O[1],M=(0,o.useRef)(0),g=function(d){c(d)},K=function(){var d="newTab".concat(M.current++),A=m()(P);A.push({label:"New Tab",children:"Content of new Tab",key:d}),b(A),c(d)},x=function(d){var A=u,C=-1;P.forEach(function(j,B){j.key===d&&(C=B-1)});var y=P.filter(function(j){return j.key!==d});y.length&&A===d&&(C>=0?A=y[C].key:A=y[0].key),b(y),c(A)},R=function(d,A){A==="add"?K():x(d)};return(0,i.jsx)(a.mQ,{type:"editable-card",onChange:g,activeKey:u,onEdit:R,items:P})};t.default=v},48850:function(T,t,e){e.r(t);var _=e(19632),m=e.n(_),n=e(5574),l=e.n(n),a=e(93989),o=e(67294),i=e(85893),r=new Array(2).fill(null).map(function(s,E){var f=String(E+1);return{label:"Tab ".concat(f),children:"Content of Tab Pane ".concat(E+1),key:f}}),v=function(){var E=(0,o.useState)(r[0].key),f=l()(E,2),u=f[0],c=f[1],D=(0,o.useState)(r),O=l()(D,2),P=O[0],b=O[1],M=(0,o.useRef)(0),g=function(d){c(d)},K=function(){var d="newTab".concat(M.current++);b([].concat(m()(P),[{label:"New Tab",children:"New Tab Pane",key:d}])),c(d)},x=function(d){var A=P.findIndex(function(j){return j.key===d}),C=P.filter(function(j){return j.key!==d});if(C.length&&d===u){var y=C[A===C.length?A-1:A].key;c(y)}b(C)},R=function(d,A){A==="add"?K():x(d)};return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{style:{marginBottom:16},children:(0,i.jsx)(a.zx,{onClick:K,children:"ADD"})}),(0,i.jsx)(a.mQ,{hideAdd:!0,onChange:g,activeKey:u,type:"editable-card",onEdit:R,items:P})]})};t.default=v},83768:function(T,t,e){e.r(t),e.d(t,{default:function(){return D}});var _=e(93989),m=e(87462),n=e(67294),l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-10.6 267c-14.3 19.9-28.7 35.6-41.9 45.7-10.5 8-18.6 11.4-24 11.6-9-.1-17.7-2.3-34.7-8.8-1.2-.5-2.5-1-4.2-1.6l-4.4-1.7c-17.4-6.7-27.8-10.3-41.1-13.8-18.6-4.8-37.1-7.4-56.9-7.4-20.2 0-39.2 2.5-58.1 7.2-13.9 3.5-25.6 7.4-42.7 13.8-.7.3-8.1 3.1-10.2 3.9-3.5 1.3-6.2 2.3-8.7 3.2-10.4 3.6-17 5.1-22.9 5.2-.7 0-1.3-.1-1.8-.2-1.1-.2-2.5-.6-4.1-1.3-4.5-1.8-9.9-5.1-16-9.8-14-10.9-29.4-28-45.1-49.9-27.5-38.6-53.5-89.8-66-125.7-15.4-44.8-23-87.7-23-128.6 0-60.2 17.8-106 48.4-137.1 26.3-26.6 61.7-41.5 97.8-42.3 5.9.1 14.5 1.5 25.4 4.5 8.6 2.3 18 5.4 30.7 9.9 3.8 1.4 16.9 6.1 18.5 6.7 7.7 2.8 13.5 4.8 19.2 6.6 18.2 5.8 32.3 9 47.6 9 15.5 0 28.8-3.3 47.7-9.8 7.1-2.4 32.9-12 37.5-13.6 25.6-9.1 44.5-14 60.8-15.2 4.8-.4 9.1-.4 13.2-.1 22.7 1.8 42.1 6.3 58.6 13.8-37.6 43.4-57 96.5-56.9 158.4-.3 14.7.9 31.7 5.1 51.8 6.4 30.5 18.6 60.7 37.9 89 14.7 21.5 32.9 40.9 54.7 57.8-11.5 23.7-25.6 48.2-40.4 68.8zm-94.5-572c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"}}]},name:"apple",theme:"outlined"},a=l,o=e(74999),i=function(P,b){return n.createElement(o.Z,(0,m.Z)({},P,{ref:b,icon:a}))},r=n.forwardRef(i),v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M448.3 225.2c-18.6 0-32 13.4-32 31.9s13.5 31.9 32 31.9c18.6 0 32-13.4 32-31.9.1-18.4-13.4-31.9-32-31.9zm393.9 96.4c-13.8-13.8-32.7-21.5-53.2-21.5-3.9 0-7.4.4-10.7 1v-1h-3.6c-5.5-30.6-18.6-60.5-38.1-87.4-18.7-25.7-43-47.9-70.8-64.9l25.1-35.8v-3.3c0-.8.4-2.3.7-3.8.6-2.4 1.4-5.5 1.4-8.9 0-18.5-13.5-31.9-32-31.9-9.8 0-19.5 5.7-25.9 15.4l-29.3 42.1c-30-9.8-62.4-15-93.8-15-31.3 0-63.7 5.2-93.8 15L389 79.4c-6.6-9.6-16.1-15.4-26-15.4-18.6 0-32 13.4-32 31.9 0 6.2 2.5 12.8 6.7 17.4l22.6 32.3c-28.7 17-53.5 39.4-72.2 65.1-19.4 26.9-32 56.8-36.7 87.4h-5.5v1c-3.2-.6-6.7-1-10.7-1-20.3 0-39.2 7.5-53.1 21.3-13.8 13.8-21.5 32.6-21.5 53v235c0 20.3 7.5 39.1 21.4 52.9 13.8 13.8 32.8 21.5 53.2 21.5 3.9 0 7.4-.4 10.7-1v93.5c0 29.2 23.9 53.1 53.2 53.1H331v58.3c0 20.3 7.5 39.1 21.4 52.9 13.8 13.8 32.8 21.5 53.2 21.5 20.3 0 39.2-7.5 53.1-21.3 13.8-13.8 21.5-32.6 21.5-53v-58.2H544v58.1c0 20.3 7.5 39.1 21.4 52.9 13.8 13.8 32.8 21.5 53.2 21.5 20.4 0 39.2-7.5 53.1-21.6 13.8-13.8 21.5-32.6 21.5-53v-58.2h31.9c29.3 0 53.2-23.8 53.2-53.1v-91.4c3.2.6 6.7 1 10.7 1 20.3 0 39.2-7.5 53.1-21.3 13.8-13.8 21.5-32.6 21.5-53v-235c-.1-20.3-7.6-39-21.4-52.9zM246 609.6c0 6.8-3.9 10.6-10.7 10.6-6.8 0-10.7-3.8-10.7-10.6V374.5c0-6.8 3.9-10.6 10.7-10.6 6.8 0 10.7 3.8 10.7 10.6v235.1zm131.1-396.8c37.5-27.3 85.3-42.3 135-42.3s97.5 15.1 135 42.5c32.4 23.7 54.2 54.2 62.7 87.5H314.4c8.5-33.4 30.5-64 62.7-87.7zm39.3 674.7c-.6 5.6-4.4 8.7-10.5 8.7-6.8 0-10.7-3.8-10.7-10.6v-58.2h21.2v60.1zm202.3 8.7c-6.8 0-10.7-3.8-10.7-10.6v-58.2h21.2v60.1c-.6 5.6-4.3 8.7-10.5 8.7zm95.8-132.6H309.9V364h404.6v399.6zm85.2-154c0 6.8-3.9 10.6-10.7 10.6-6.8 0-10.7-3.8-10.7-10.6V374.5c0-6.8 3.9-10.6 10.7-10.6 6.8 0 10.7 3.8 10.7 10.6v235.1zM576.1 225.2c-18.6 0-32 13.4-32 31.9s13.5 31.9 32 31.9c18.6 0 32.1-13.4 32.1-32-.1-18.6-13.4-31.8-32.1-31.8z"}}]},name:"android",theme:"outlined"},s=v,E=function(P,b){return n.createElement(o.Z,(0,m.Z)({},P,{ref:b,icon:s}))},f=n.forwardRef(E),u=e(85893),c=function(){return(0,u.jsx)(_.mQ,{defaultActiveKey:"2",items:[r,f].map(function(P,b){var M=String(b+1);return{key:M,label:"Tab ".concat(M),children:"Tab ".concat(M),icon:(0,u.jsx)(P,{})}})})},D=c},44298:function(T,t,e){e.r(t);var _=e(5574),m=e.n(_),n=e(93989),l=e(67294),a=e(85893),o=function(s){console.log(s)},i=[{key:"1",label:"Tab 1",children:"Content of Tab Pane 1"},{key:"2",label:"Tab 2",children:"Content of Tab Pane 2"},{key:"3",label:"Tab 3",children:"Content of Tab Pane 3"}],r=function(){var s=l.useState("center"),E=m()(s,2),f=E[0],u=E[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.rg,{defaultValue:"center",style:{marginBottom:8},onChange:function(D){return u(D)},options:["start","center","end"]}),(0,a.jsx)(n.mQ,{defaultActiveKey:"1",items:i,onChange:o,indicator:{size:function(D){return D-20},align:f}})]})};t.default=r},74411:function(T,t,e){e.r(t);var _=e(5574),m=e.n(_),n=e(93989),l=e(67294),a=e(85893),o=function(){var r=(0,l.useState)("middle"),v=m()(r,2),s=v[0],E=v[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.rg,{defaultValue:"small",style:{marginBottom:8},onChange:function(u){return E(u)},options:["small","middle","large"]}),(0,a.jsx)(n.mQ,{size:s,items:new Array(3).fill(null).map(function(f,u){var c=String(u+1);return{label:"Tab ".concat(c),key:c,children:"Content of Tab Pane ".concat(c)}})})]})};t.default=o},63597:function(T,t,e){e.r(t);var _=e(5574),m=e.n(_),n=e(93989),l=e(67294),a=e(85893),o=function(){var r=l.useState("top"),v=m()(r,2),s=v[0],E=v[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.rg,{defaultValue:"top",style:{marginBottom:8},onChange:function(u){return E(u)},options:[{label:"Horizontal",value:"top"},{label:"Vertical",value:"left"}]}),(0,a.jsx)(n.mQ,{TabPosition:s,style:{height:220},items:new Array(30).fill(null).map(function(f,u){var c=String(u+1);return{label:"Tab ".concat(c),key:c,children:"Content of Tab Pane ".concat(c)}})})]})};t.default=o},8515:function(T,t,e){e.r(t);var _=e(93989),m=e(67294),n=e(85893),l=(0,n.jsx)(_.zx,{children:"Extra Action"}),a={left:(0,n.jsx)(_.zx,{className:"tabs-extra-demo-button",children:"Left Extra Action"}),right:(0,n.jsx)(_.zx,{children:"Right Extra Action"})},o=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(_.mQ,{tabBarExtraContent:l,items:new Array(3).fill(null).map(function(r,v){var s=String(v+1);return{label:"Tab ".concat(s),key:s,children:"Content of Tab Pane ".concat(s)}})}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)(_.mQ,{tabBarExtraContent:a,items:new Array(3).fill(null).map(function(r,v){var s=String(v+1);return{label:"Tab ".concat(s),key:s,children:"Content of Tab Pane ".concat(s)}})})]})};t.default=o},20612:function(T,t,e){e.r(t);var _=e(5574),m=e.n(_),n=e(93989),l=e(67294),a=e(85893),o=function(s){console.log(s)},i=[{key:"1",label:"Tab 1",children:"Content of Tab Pane 1"},{key:"2",label:"Tab 2",children:"Content of Tab Pane 2"},{key:"3",label:"Tab 3",children:"Content of Tab Pane 3"}],r=function(){var s=l.useState("top"),E=m()(s,2),f=E[0],u=E[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.rg,{defaultValue:"top",style:{marginBottom:8},onChange:function(D){return u(D)},options:["top","bottom","left","right"]}),(0,a.jsx)(n.mQ,{defaultActiveKey:"1",items:i,onChange:o,TabPosition:f})]})};t.default=r},46353:function(T,t,e){e.r(t);var _=e(93989),m=e(67294),n=e(85893),l=function(){return(0,n.jsx)(_.mQ,{type:"card",items:new Array(3).fill(null).map(function(o,i){var r=String(i+1);return{label:"Tab ".concat(r),key:r,children:"Content of Tab Pane ".concat(r)}})})};t.default=l}}]);