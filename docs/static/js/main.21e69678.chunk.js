(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{252:function(e,t,n){e.exports=n.p+"static/media/error.6e9080df.jpg"},256:function(e,t,n){e.exports=n(593)},41:function(e,t){e.exports=tableau},487:function(e,t){},489:function(e,t){},524:function(e,t){},525:function(e,t){},593:function(e,t,n){"use strict";n.r(t);var a=n(21),r=n.n(a),c=n(44),o=(n(259),n(286),n(308),n(339),n(343),n(352),n(386),n(422),n(425),n(0)),i=n.n(o),s=n(165),u=n.n(s),l=n(41),m=n.n(l),d=n(50),p=n(61),f=n(63),h=n(62),v=n(64),b=n(254),g=n.n(b),y=n(119),E=n(250),k=n(45),w=n.n(k),x=n(56),O=n.n(x),j=n(120),I=n.n(j),T=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).updateInput=function(e){var t=e.target;n.setState(function(e){return{formValues:Object(E.a)({},e.formValues,Object(y.a)({},t.id,t.value))}})},n.submit=function(e){e.stopPropagation();var t=n.state.formValues,a=new URLSearchParams;for(var r in t)a.append(r,t[r]);console.log(a.toString()),n.props.history.push("/oauth_callback?".concat(a.toString()))},n.manualForm=function(){return o.createElement(w.a,{onSubmit:n.submit},o.createElement(w.a.Group,{controlId:"merchant_id"},o.createElement(w.a.Label,null,"Merchant ID"),o.createElement(w.a.Control,{type:"text",value:n.state.formValues.merchant_id,onChange:n.updateInput})),o.createElement(w.a.Group,{controlId:"access_token"},o.createElement(w.a.Label,null,"Access Token"),o.createElement(w.a.Control,{type:"text",value:n.state.formValues.access_token,onChange:n.updateInput})),o.createElement(w.a.Group,{controlId:"environment"},o.createElement(w.a.Label,null,"Environment"),o.createElement(w.a.Control,{as:"select",value:n.state.formValues.environment,onChange:n.updateInput},o.createElement("option",{value:"prod"},"prod (www.clover.com)"),o.createElement("option",{value:"sandbox"},"sandbox (sandbox.dev.clover.com)"))),o.createElement(O.a,{className:"mr-1",variant:"primary",type:"submit"},"Login"),o.createElement(O.a,{className:"ml-1",variant:"secondary",onClick:function(){return n.setState({manualLogin:!1})}},"Back"))},n.buttons=function(){return o.createElement("div",null,o.createElement("h2",null,"Clover POS Web Data Connector"),o.createElement(I.a,null,o.createElement(O.a,{className:"mr-1",variant:"primary",href:"https://clover-wdc.manbeardo.com/connect?environment=prod"},"Login with Clover"),o.createElement(O.a,{className:"mx-1",variant:"secondary",href:"https://clover-wdc.manbeardo.com/connect?environment=sandbox"},"Login with Clover (Sandbox)"),o.createElement(O.a,{className:"ml-1",variant:"secondary",onClick:function(){return n.setState({manualLogin:!0})}},"Login manually")))},n.state={manualLogin:!1,formValues:{merchant_id:"",access_token:"",environment:"prod"}},n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return this.state.manualLogin?this.manualForm():this.buttons()}}]),t}(o.Component);function C(e){var t=new URLSearchParams(e.search);return{merchantID:t.get("merchant_id"),accessToken:t.get("access_token"),environment:t.get("environment")}}var L=n(123),S=n.n(L),D=n(78),R=n.n(D),N=n(253),_=n.n(N),V=n(251),P=n(166),A=Object(P.pRateLimit)({interval:6e4,rate:16,concurrency:5}),z=new function e(){var t=this;Object(d.a)(this,e),this.limit=Object(P.pRateLimit)({interval:6e4,rate:16,concurrency:5}),this.do=function(){var e=Object(c.a)(r.a.mark(function e(t,n){var a,c,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(c in a=new URLSearchParams,n.query)a.append(c,n.query[c]);return n.page&&(a.append("limit",n.page.limit.toString()),a.append("offset",n.page.offset.toString())),a.append("access_token",n.creds.accessToken),e.next=6,A(function(){return fetch("".concat(F(n.creds)).concat(t,"?").concat(a),n)});case 6:if((o=e.sent).ok){e.next=9;break}throw"clover api returned status code ".concat(o.status);case 9:return e.next=11,o.json();case 11:return e.abrupt("return",e.sent);case 12:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),this.get=function(e,n){var a=Object.assign({},n);return n.method="GET",t.do(e,a)},this.getAll=function(){var e=Object(c.a)(r.a.mark(function e(n,a,c){var o,i,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=Object.assign({},a),o=1e3,i=0;case 3:return a.page={limit:o,offset:i},e.next=6,t.get(n,a);case 6:return s=e.sent,e.next=9,c(s.elements);case 9:i+=o;case 10:if(s.elements.length>0){e.next=3;break}case 11:case"end":return e.stop()}},e,this)}));return function(t,n,a){return e.apply(this,arguments)}}()};function F(e){if("prod"===e.environment)return"https://api.clover.com";if("sandbox"===e.environment)return"https://apisandbox.dev.clover.com";throw"unknown environment: ".concat(e.environment)}var G=n(596),B=n(252),U=n.n(B),W=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).submit=function(){n.props.callback(n.state.creds)},n.state={creds:C(e.location),error:!1},z.get("/v3/merchants/".concat(n.state.creds.merchantID),{creds:n.state.creds}).then(function(e){return n.setState({merchantInfo:e})}).catch(function(e){console.error(e),n.setState({error:!0})}),n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){if(this.state.error)return o.createElement("div",null,o.createElement(S.a,{variant:"danger"},"There was an error connecting to Clover.\xa0",o.createElement(S.a.Link,null,o.createElement(G.a,{to:"/authorize"},"Try connecting again."))),o.createElement(_.a,{src:U.a,fluid:!0}));var e=[],t=this.state.merchantInfo;return t?(t.name&&e.push(o.createElement(R.a.Item,{key:"name"},o.createElement("b",null,"Name:")," ",t.name)),t.id&&e.push(o.createElement(R.a.Item,{key:"id"},o.createElement("b",null,"ID:")," ",t.id)),t.website&&e.push(o.createElement(R.a.Item,{key:"website"},o.createElement("b",null,"Website:")," ",t.website)),0===e.length&&e.push(o.createElement(R.a.Item,{key:"unknown"},"???")),o.createElement("div",null,o.createElement(S.a,{variant:"primary"},"Please confirm your business details"),o.createElement(R.a,null,e),o.createElement(I.a,{className:"mt-3"},o.createElement(O.a,{className:"mr-1",variant:"primary",onClick:this.submit},"Looks good!"),o.createElement(G.a,{to:"/authorize"},o.createElement(O.a,{className:"ml-1",variant:"secondary"},"Back"))))):o.createElement(V.SyncLoader,null)}}]),t}(o.Component),q=n(598),J=n(599),K=n(600),M=n(597),Y=n(594),H=function(e){function t(){return Object(d.a)(this,t),Object(f.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.createElement(Y.a,{to:"/confirm".concat(this.props.location.search)})}}]),t}(o.Component),Q=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).confirmCallback=function(e){n.props.callback(e)},n.state={},n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return o.createElement(g.a,{className:"mt-3"},o.createElement(q.a,{hashType:"slash"},o.createElement(J.a,null,o.createElement(K.a,{exact:!0,path:"/authorize",component:T}),o.createElement(K.a,{exact:!0,path:"/oauth_callback",component:H}),o.createElement(K.a,{exact:!0,path:"/confirm",render:function(t){return o.createElement(W,Object.assign({},t,{callback:e.confirmCallback}))}}),o.createElement(K.a,{render:function(){return o.createElement(M.a,{to:"/authorize"})}}))))}}]),t}(o.Component),X={schema:{id:"inventoryItems",alias:"Inventory Items",columns:[{id:"id",alias:"item ID",dataType:"string"},{id:"hidden",dataType:"bool"},{id:"name",alias:"item name",dataType:"string"},{id:"price",alias:"item price",dataType:"float",numberFormat:"currency"},{id:"priceType",alias:"item price type",dataType:"string"},{id:"defaultTaxRates",alias:"uses default tax rates",dataType:"bool"},{id:"cost",alias:"item cost",dataType:"float",numberFormat:"currency"},{id:"isRevenue",alias:"is revenue",dataType:"bool"},{id:"modifiedTime",alias:"last modified time",dataType:"datetime"}]},getRows:function(){var e=Object(c.a)(r.a.mark(function e(t,n){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.getAll("/v3/merchants/".concat(n.merchantID,"/items"),{creds:n},function(e){t.appendRows(e.map(function(e){return e.price=e.price/100,e.cost=e.cost/100,e}))});case 2:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},Z={schema:{id:"categories",alias:"Categories",columns:[{id:"modifiedTime",alias:"last modified time",dataType:"datetime"},{id:"deleted",alias:"is deleted",dataType:"bool"},{id:"sortOrder",alias:"sort order",dataType:"int"},{id:"name",alias:"category name",dataType:"string"},{id:"id",alias:"category ID",dataType:"string"}]},getRows:function(){var e=Object(c.a)(r.a.mark(function e(t,n){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.getAll("/v3/merchants/".concat(n.merchantID,"/categories"),{creds:n},function(e){t.appendRows(e.map(function(e){return{modifiedTime:e.modifiedTime,deleted:e.deleted,sortOrder:e.sortOrder,name:e.name,id:e.id}}))});case 2:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},$={schema:{id:"inventoryItemCategories",alias:"Inventory item categories",joinOnly:!0,foreignKey:{tableId:Z.schema.id,columnId:"id"},columns:[{id:"itemID",alias:"item ID",dataType:"string"},{id:"categoryID",alias:"category ID",dataType:"string",filterable:!0}]},getRows:function(){var e=Object(c.a)(r.a.mark(function e(t,n){var a,c,o,i,s,u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=!0,c=!1,o=void 0,e.prev=3,i=r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.value,e.next=3,z.getAll("/v3/merchants/".concat(n.merchantID,"/categories/").concat(a,"/items"),{creds:n},function(e){t.appendRows(e.map(function(e){return{itemID:e.id,categoryID:a}}))});case 3:case"end":return e.stop()}},e,this)}),s=t.filterValues[Symbol.iterator]();case 6:if(a=(u=s.next()).done){e.next=11;break}return e.delegateYield(i(),"t0",8);case 8:a=!0,e.next=6;break;case 11:e.next=17;break;case 13:e.prev=13,e.t1=e.catch(3),c=!0,o=e.t1;case 17:e.prev=17,e.prev=18,a||null==s.return||s.return();case 20:if(e.prev=20,!c){e.next=23;break}throw o;case 23:return e.finish(20);case 24:return e.finish(17);case 25:case"end":return e.stop()}},e,this,[[3,13,17,25],[18,,20,24]])}));return function(t,n){return e.apply(this,arguments)}}()},ee=m.a.makeConnector(),te=function(){for(var e={},t=[Z,X,$],n=0;n<t.length;n++){var a=t[n];e[a.schema.id]=a}return e}();function ne(){return(ne=Object(c.a)(r.a.mark(function e(t){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=te[t.tableInfo.id],e.next=3,n.getRows(t,m.a.password);case 3:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}ee.init=function(e){m.a.authType=m.a.authTypeEnum.custom,m.a.connectionName="Clover POS";u.a.render(i.a.createElement(Q,{callback:function(e){m.a.username="",m.a.password=e,m.a.submit()},phase:m.a.phase}),document.getElementById("root")),e()},ee.getSchema=function(e){var t=[];for(var n in te)t.push(te[n].schema);e(t)},ee.getData=function(e,t){(function(e){return ne.apply(this,arguments)})(e).then(function(){return t()}).catch(function(e){return m.a.abortWithError(e)})},m.a.registerConnector(ee)}},[[256,2,1]]]);
//# sourceMappingURL=main.21e69678.chunk.js.map