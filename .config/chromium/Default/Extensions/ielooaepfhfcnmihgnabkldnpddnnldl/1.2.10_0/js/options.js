import{_ as w,b as $,s as b,c as C,u as x}from"../assets/style.f6814c37.js";import{o as t,c as a,a as u,d as v,F as h,r as m,t as p,e as U,f as o,n as y,k as S,l as B,w as M,g as k,i as V,q as g,v as f,y as N,x as A}from"../assets/vendor.a6b2ec5f.js";const j={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-chevron-down"},D=u("polyline",{points:"6 9 12 15 18 9"},null,-1),O=[D];function q(e,l){return t(),a("svg",j,O)}var F={render:q};const I="_container_1jyvn_1";var T={container:I};const z=["value"],E=["value"],L=["value"],G={class:"icon"},H=v({props:{modelValue:{type:String,default:""},options:{type:Array,required:!0},id:{type:String,default:""}},emits:["update:modelValue"],setup(e,{emit:l}){const n=e;return(e,s)=>(t(),a("span",{ref:"container",class:y(e.s.container)},[u("select",{class:"input",value:n.modelValue,onChange:s[0]||(s[0]=e=>l("update:modelValue",e.target.value))},[Array.isArray(n.options[0])?(t(!0),a(h,{key:0},m(n.options,(([e,l])=>(t(),a("option",{key:e,value:e},p(l),9,E)))),128)):(t(!0),a(h,{key:1},m(n.options,(e=>(t(),a("option",{key:e,value:e},p(e),9,L)))),128))],40,z),u("span",G,[U(o(F))])],2))}}),J={s:T};var K=w(H,[["__cssModules",J]]);const P="_input_16o1b_1";var Q={input:P,switch:"_switch_16o1b_8"};const R=["checked"],W=u("span",null,null,-1),X=[W],Y=v({props:{modelValue:Boolean},emits:["update:modelValue"],setup(e,{emit:l}){const n=e;return(e,s)=>(t(),a(h,null,[u("input",{ref:"input",type:"checkbox",class:y(e.s.input),checked:n.modelValue,onChange:s[0]||(s[0]=e=>l("update:modelValue",e.target.checked))},null,42,R),u("span",{class:y(e.s.switch)},X,2)],64))}}),Z={s:Q};var ee=w(Y,[["__cssModules",Z]]);const se=u("h1",null,"Options",-1),te={class:"list"},ne={class:"name"},ae=["value","max","min","onChange"],le=["onUpdate:modelValue"],oe=["onUpdate:modelValue"],ue={key:0,class:"description"},re=v({setup(e){const l=S(!0),n=B({});return $().then((e=>{l.value=!1,Object.assign(n,e)})),M(n,C),(e,s)=>(t(),a("main",null,[se,l.value?k("",!0):(t(!0),a(h,{key:0},m(o(b),(e=>(t(),a("section",{key:e.id},[u("h2",null,p(e.name),1),u("ul",te,[(t(!0),a(h,null,m(e.children,(e=>(t(),a("li",{key:e.id,class:"option"},[u("label",{class:y(["boolean"===e.type&&"inline"])},[u("span",ne,p(e.label),1),"boolean"===e.type?(t(),V(ee,{key:0,modelValue:o(n)[e.id],"onUpdate:modelValue":a=>o(n)[e.id]=a},null,8,["modelValue","onUpdate:modelValue"])):"select"===e.type?(t(),V(K,{key:1,modelValue:o(n)[e.id],"onUpdate:modelValue":a=>o(n)[e.id]=a,options:e.options},null,8,["modelValue","onUpdate:modelValue","options"])):"number"===e.type?(t(),a("input",{key:2,value:o(n)[e.id],max:e.max,min:e.min,type:"number",class:"input",onChange:a=>function(e,{min:a,max:t,id:l}){const s=Number(e.target.value);null!=a||(a=s),null!=t||(t=Math.max(s,a)),n[l]=N(s,a,t)}(a,e)},null,40,ae)):e.multiline?g((t(),a("textarea",{key:3,"onUpdate:modelValue":a=>o(n)[e.id]=a,class:"input"},null,8,le)),[[f,o(n)[e.id]]]):g((t(),a("input",{key:4,"onUpdate:modelValue":a=>o(n)[e.id]=a,type:"text",class:"input"},null,8,oe)),[[f,o(n)[e.id]]])],2),e.description?(t(),a("div",ue,p(e.description),1)):k("",!0)])))),128))])])))),128))]))}});x(),A(re).mount("#app");