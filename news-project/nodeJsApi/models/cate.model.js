
var mongoose = require('mongoose'),
materializedPlugin=require('mongoose-materialized'),
Schema=mongoose.Schema;

var CateSchema=new Schema({//定义分类
    text:{type:String},
    file:{type:Boolean,default:false},
    id:{type:String}
});

CateSchema.plugin(materializedPlugin);
module.exports=mongoose.model('Cate',CateSchema,'cate');//Category