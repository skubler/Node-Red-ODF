module.exports = function(RED) {
    function odfNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        this.on('input', function(msg) {
            var DOMParser = require('xmldom').DOMParser;
            //var odfNodecons = require('node-red-contrib-odfNode/odfNodecons/odfNodecons.js');
            //console.log("toto");
           // var odfN = new odfNodecons();

           //console.log(n.parsing);
           //console.log("=========================================================");
           //console.log("================= LET'S PARSE IT NOW ====================");
           //console.log("=========================================================");
           //console.log(msg.payload);
           //console.log("---------------------------------------------------------");

           parser = new DOMParser();
           if (typeof msg.payload != 'undefined' || msg.payload != null){
           xmlDoc = parser.parseFromString(msg.payload,"text/xml");
           var len_obj=xmlDoc.getElementsByTagName("Object").length;

           var obj_i, len_ii, tuple_iik_val, ii_k, len_v, ii_k_name, obj_i_id; 
           var triple = new Array();
           var cpt=0;

           for (i=1 ; i<len_obj ; i++){
            var obj_i=xmlDoc.getElementsByTagName("Object")[i];
            //console.log(obj_i.getElementsByTagName("id")[0].childNodes[0] );
            //if (typeof obj_i.getElementsByTagName("id")[0].childNodes[0] != 'undefined'){

            obj_i_id = obj_i.getElementsByTagName("id")[0].childNodes[0].nodeValue;
            //console.log("++++++++++");
            //console.log(obj_i_id);
            //console.log("***********************");

            var len_ii=obj_i.getElementsByTagName("InfoItem").length;

             for (k=0 ; k<len_ii ; k++){
                ii_k=obj_i.getElementsByTagName("InfoItem")[k];
                ii_k_name = ii_k.getAttribute("name");
                len_v=ii_k.getElementsByTagName("value").length;
                if (len_v>1){
                    console.log("Watch out: the case of multiple values has not been addressed");
                }else{
                    
                    //console.log(ii_k.getElementsByTagName("value")[0].childNodes[0].nodeValue);
 
                    //console.log(ii_k.getElementsByTagName("value")[0].childNodes[0].nodeValue);
                    ii_k_val=ii_k.getElementsByTagName("value")[0].childNodes[0].nodeValue;
                    console.log(obj_i_id + "" + ii_k_name + " " + ii_k_val);
                    
                }
                triple[cpt] = [obj_i_id, ii_k_name, ii_k_val];
                cpt++;
             }
            //}
           }
            msg.payload=triple;
            node.send(msg);
        }

         /*  for (i=0 ; i<len_obj ; i++){
            obj_i=xmlDoc.getElementsByTagName("Object")[i];
            len_ii=obj_i.getElementsByTagName("InfoItem").length;
            for (k=0 ; k<len_ii ; k++){
                ii_k=obj_i.getElementsByTagName("InfoItem")[k];
                len_v=ii_k.getElementsByTagName("value").length;
                if len_v>1{
                    console.log("Watch out: the case of multiple values has not been addressed");
                }else{
                    ii_k_val=ii_k.getElementsByTagName("value");
                    list_values[k]=ii_k_val;
                }   
            }
        }
        //console.log(len);
            msg.payload=list_values;
            node.send(msg);

           /*var options = {
            parsing: n.parsing,
        };

        if (n.parsing == "Object"){
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(msg.payload,"text/xml");
            var len=xmlDoc.getElementsByTagName("Object").length;
            var Objectlist_obj = new Array();
            
            for (i=0 ; i<len ; i++){
                Objectlist_obj[i]=String(xmlDoc.getElementsByTagName("Object")[i])
            }
            //console.log(Objectlist_obj[1]);
            //console.log(len);
            msg.payload=Objectlist_obj;
            node.send(msg);
        } else if (n.parsing == "getListInfoItem"){
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(msg.payload,"text/xml");
            var len=xmlDoc.getElementsByTagName("InfoItem").length;
            var Objectlist_ii = new Array();
            
            for (i=0 ; i<len ; i++){
                Objectlist_ii[i]=String(xmlDoc.getElementsByTagName("InfoItem")[i])
            }
            //console.log(Objectlist_obj[1]);
            //console.log(len);
            msg.payload=Objectlist_ii;
            node.send(msg);
        } else if (n.parsing == "Value"){
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(msg.payload,"text/xml");
            var len=xmlDoc.getElementsByTagName("InfoItem").length;
            var Objectlist_ii = new Array();
            
            for (i=0 ; i<len ; i++){
                Objectlist_ii[i]=String(xmlDoc.getElementsByTagName("InfoItem")[i])
            }
            //console.log(Objectlist_obj[1]);
            //console.log(len);
            msg.payload=Objectlist_ii;
            node.send(msg);
        }*/



    });
    }
    RED.nodes.registerType("odfNode",odfNode);
};



