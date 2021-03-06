exports.definition ={
	config:{
		"columns": {
			"id": "String",
			"authenticated": "Int"
		},
		"defaults": {
			"id": "instance",
			"authenticated": 0
		},
		"adapter":{
			"type": "properties",
			"collection_name": "user"
		}		
	},
	extendModel: function(Model) {		
        _.extend(Model.prototype, {
        	authenticatedStatus: function(){        		
        		Ti.API.info('authenticatedStatus : '+this.get('authenticated'));
        		if(this.get('authenticated')){
        			return true	
        		}else{        			
        			 this.set({
                        "authenticated": 0                 
                    });
                    this.save();
                    return false;
        		}
        	},
        	login: function(){
        		this.set({
                	"authenticated":1
                });
				this.save();	
				Ti.API.info('login : '+this.get('authenticated'));
        	},
        	logout: function(){
        		this.set({
                	"authenticated": 0
                });
				this.save();
        	}    						
        });
	    return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
        }); 		
        return Collection;
    }
}
