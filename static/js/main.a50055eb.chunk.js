(this["webpackJsonpsecret-santa"]=this["webpackJsonpsecret-santa"]||[]).push([[0],{13:function(e,t,n){},18:function(e,t,n){e.exports=n(32)},25:function(e,t,n){},27:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var r=n(0),l=n(15),a=n.n(l),u=(n(23),n(24),n(25),n(11)),c=n(1),o=n(2),i=n(7),m=(n(13),n(8));function s(e){var t=e.children;return r.createElement("span",{className:"validation"},t)}var d=function(e){var t=e.usedNames,n=e.usedGroups,l=e.onSubmit,a=Object(i.b)(),u=a.errors,c=a.handleSubmit,o=a.register,d=a.reset;return r.createElement("form",{onSubmit:c((function(e){l({name:e.name,group:""===e.group?void 0:e.group}),d()}))},r.createElement("fieldset",null,r.createElement("legend",null,"Add a New Person"),r.createElement("label",{htmlFor:"name",className:"label-required"},"Name"),r.createElement("input",{id:"name",name:"name",type:"text",ref:o({required:"A name is required",validate:function(e){return e&&!t.includes(e)||"The name must be unique"}})}),r.createElement(m.a,{errors:u,name:"name",as:s}),r.createElement("label",{htmlFor:"group"},"Group"),r.createElement("input",{id:"group",name:"group",type:"text",list:"groupOptions",autoComplete:"off",ref:o}),r.createElement("datalist",{id:"groupOptions"},n.map((function(e){return r.createElement("option",{key:e},e)}))),r.createElement("p",{className:"meta"},"Use groups for simple exclusions to prevent people in the same group from matching with each other."),r.createElement("button",{type:"submit"},"Add Person")))};function p(e){var t=e.people,n=e.removePerson,l=t.reduce((function(e,t){var n,r=e.find((function(e){var n;return e.group===(null!==(n=t.group)&&void 0!==n?n:null)}));r?r.people.push(t):e.push({group:null!==(n=t.group)&&void 0!==n?n:null,people:[t]});return e}),[]);return r.createElement("dl",null,l.map((function(e){var t;return r.createElement(r.Fragment,{key:null!==(t=e.group)&&void 0!==t?t:"fba449b5-deb3-400c-991c-4bac2bb1ad33"},r.createElement("dt",null,null===e.group?r.createElement("strong",null,"No Group"):e.group),e.people.map((function(e){return r.createElement("dd",{key:e.name},e.name," ",r.createElement("button",{onClick:function(){return n(e)}},"Remove"))})))})))}var E=n(3),f=n.n(E),h=n(5),b=n(16);function g(e){var t=e.pairs,n=e.showGroups;return t.length<1?null:r.createElement("table",null,r.createElement("caption",null,"Secret Santa Matches"),r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",{colSpan:n?2:1},"Giver"),r.createElement("th",{colSpan:n?2:1},"Receiver")),n&&r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Group"),r.createElement("th",null,"Name"),r.createElement("th",null,"Group"))),r.createElement("tbody",null,t.map((function(e){var t=Object(o.a)(e,2),l=t[0],a=t[1];return r.createElement("tr",{key:l.name},r.createElement("td",null,l.name),n&&r.createElement("td",null,l.group),r.createElement("td",null,a.name),n&&r.createElement("td",null,a.group))}))))}var v=function(e,t){return GiftExchange.calculateSync(e,{exclusions:t,timeout:5e3}).map((function(t,n){return[e[n],t]}))},y=(n(27),window.location.origin+"/secret-santa/gift-exchange.umd.production.min.js");function x(e){var t=e.people,n=e.exclusions,l=r.useState([]),a=Object(o.a)(l,2),u=a[0],c=a[1],i=r.useState(null),m=Object(o.a)(i,2),s=m[0],d=m[1],p=r.useState(!1),E=Object(o.a)(p,2),x=E[0],S=E[1];r.useLayoutEffect((function(){c([])}),[t,n]);var j=Object(b.a)(v,{autoTerminate:!1,remoteDependencies:[y]}),k=Object(o.a)(j,2),w=k[0],N=k[1],G=N.status,O=N.kill;r.useEffect((function(){"ERROR"===G&&d(new Error("There was an error with the matching Worker, please try again."))}),[G]),r.useEffect((function(){return function(){O()}}),[O]);var q=function(){var e=Object(h.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d(null),w(t,n).then((function(e){c(e)})).catch((function(e){e.message.startsWith("DerangementError")?d(new Error("No matches are possible with the given people and exclusions.")):d(e),c([])}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.createElement(r.Fragment,null,r.createElement("button",{onClick:q,type:"button",disabled:t.length<1||"RUNNING"===G},"Match")," ",r.createElement("label",null,r.createElement("input",{type:"checkbox",onChange:function(){return S((function(e){return!e}))},checked:x})," ","Show Groups"),s&&r.createElement("span",{className:"error"},s.message),r.createElement(g,{pairs:s?[]:u,showGroups:x}))}var S=function(e){return e.type+e.subject+e.excludedType+e.excludedSubject},j=function(e){var t=e.exclusion,n=e.removeHandler;return r.createElement("dd",null,r.createElement("strong",null,t.subject)," cannot give to"," ","group"===t.excludedType&&"group ",r.createElement("strong",null,t.excludedSubject)," ",r.createElement("button",{onClick:n},"Remove"))};function k(e){var t=e.exclusions,n=e.removeExclusion,l=t.filter((function(e){return"name"===e.type})),a=t.filter((function(e){return"group"===e.type}));return r.createElement("dl",null,l.length>0&&r.createElement("dt",null,"Person"),l.map((function(e){return r.createElement(j,{key:e.key,exclusion:e,removeHandler:function(){return n(e.key)}})})),a.length>0&&r.createElement("dt",null,"Group"),a.map((function(e){return r.createElement(j,{key:e.key,exclusion:e,removeHandler:function(){return n(e.key)}})})))}var w=function(e){var t=e.usedNames,n=e.usedGroups,l=e.usedExclusionKeys,a=e.onSubmit,u=Object(i.b)(),c=u.errors,o=u.handleSubmit,d=u.register,p=u.reset,E=u.setError,f=u.watch,h=f("type","name"),b=f("excludedType","name");return r.createElement("form",{onSubmit:o((function(e){l.includes(S(e))?E("excludedSubject",{message:"This exclusion already exists"}):(a(e),p())}))},r.createElement("p",null,"A Source will not be matched with the Excluded."),r.createElement("fieldset",null,r.createElement("legend",null,"Source"),r.createElement("label",null,r.createElement("input",{type:"radio",name:"type",value:"name",defaultChecked:!0,ref:d({required:"A type is required"})})," ","Name"),r.createElement("label",null,r.createElement("input",{type:"radio",name:"type",value:"group",ref:d({required:"A type is required"})})," ","Group"),r.createElement(m.a,{errors:c,name:"type",as:s}),r.createElement("label",{htmlFor:"subject"},"Subject"),r.createElement("select",{id:"subject",name:"subject",disabled:("name"===h?t:n).length<1,ref:d({required:"A ".concat(h," is required"),validate:function(e){return"name"===h?t.includes(e):n.includes(e)}})},("name"===h?t:n).map((function(e){return r.createElement("option",{key:e},e)}))),r.createElement(m.a,{errors:c,name:"subject",as:s})),r.createElement("fieldset",null,r.createElement("legend",null,"Excluded"),r.createElement("label",null,r.createElement("input",{type:"radio",name:"excludedType",value:"name",defaultChecked:!0,ref:d({required:"A type is required"})})," ","Name"),r.createElement("label",null,r.createElement("input",{type:"radio",name:"excludedType",value:"group",ref:d({required:"A type is required"})})," ","Group"),r.createElement(m.a,{errors:c,name:"excludedType",as:s}),r.createElement("label",{htmlFor:"excludedSubject"},"Subject"),r.createElement("select",{id:"excludedSubject",name:"excludedSubject",disabled:("name"===b?t:n).length<1,ref:d({required:"A ".concat(b," is required"),validate:function(e){return"name"===b?t.includes(e):n.includes(e)}})},("name"===b?t:n).map((function(e){return r.createElement("option",{key:e},e)}))),r.createElement(m.a,{errors:c,name:"excludedSubject",as:s})),r.createElement("button",{type:"submit"},"Add Exclusion"))};function N(e){var t=e.children,n=e.heading;return r.createElement("section",null,r.createElement("h2",null,n),t)}var G=n(6),O=(n(31),function(e){return"string"===typeof e});function q(){var e=r.useState([]),t=Object(o.a)(e,2),n=t[0],l=t[1],a=r.useState([]),i=Object(o.a)(a,2),m=i[0],s=i[1],E=r.useMemo((function(){return n.map((function(e){return e.name}))}),[n]),f=r.useMemo((function(){return Object(c.a)(new Set(n.map((function(e){return e.group})).filter(O)))}),[n]),h=r.useMemo((function(){return m.map((function(e){return e.key}))}),[m]);return r.createElement("main",null,r.createElement(G.e,null,r.createElement(G.b,null,r.createElement(G.a,null,"People"),r.createElement(G.a,null,"Exclusions"),r.createElement(G.a,{disabled:n.length<1},"Matches")),r.createElement(G.d,null,r.createElement(G.c,null,r.createElement(N,{heading:"People"},r.createElement(d,{usedNames:E,usedGroups:f,onSubmit:function(e){l((function(t){return t.concat(e)}))}}),r.createElement(p,{people:n,removePerson:function(e){l((function(t){return t.filter((function(t){return t.name!==e.name}))}))}}))),r.createElement(G.c,null,r.createElement(N,{heading:"Exclusions"},r.createElement(w,{usedNames:E,usedGroups:f,usedExclusionKeys:h,onSubmit:function(e){s((function(t){return t.concat(Object(u.a)(Object(u.a)({},e),{},{key:S(e)}))}))}}),r.createElement(k,{exclusions:m,removeExclusion:function(e){s((function(t){return t.filter((function(t){return t.key!==e}))}))}}))),r.createElement(G.c,null,r.createElement(N,{heading:"Matches"},r.createElement(x,{people:n,exclusions:m}))))))}var A=["\ud83c\udf85","\ud83c\udf85\ud83c\udffb","\ud83c\udf85\ud83c\udffc","\ud83c\udf85\ud83c\udffd","\ud83c\udf85\ud83c\udffe","\ud83c\udf85\ud83c\udfff","\ud83e\udd36","\ud83e\udd36\ud83c\udffb","\ud83e\udd36\ud83c\udffc","\ud83e\udd36\ud83c\udffd","\ud83e\udd36\ud83c\udffe","\ud83e\udd36\ud83c\udfff"],M=A[Math.floor(Math.random()*A.length)];var T=function(){return r.useEffect((function(){document.title="Secret Santa ".concat(M)}),[]),r.createElement(r.Fragment,null,r.createElement("header",null,r.createElement("h1",null,"Secret Santa"," ",r.createElement("span",{role:"presentation","aria-hidden":"true"},M)),r.createElement("p",null,"By"," ",r.createElement("a",{href:"https://brianm.me",rel:"noopener noreferrer"},"Brian Mitchell"),". View the source on"," ",r.createElement("a",{href:"https://github.com/BrianMitchL/secret-santa",rel:"noopener noreferrer"},"GitHub"),".")),r.createElement(q,null))};a.a.render(r.createElement(T,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.a50055eb.chunk.js.map