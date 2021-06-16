const path = require('path');
var fs = require( 'fs' );

var splitFileName = (_text)=> {
    _text = _text.replace(/\//g,'\\');
    let pos = _text.lastIndexOf('\\');
     return [_text.substr(pos+1),_text.substr(0,pos)];
   };

var copy = function( src, dst , to){
  let _toPath = dst+to[1]+'\\'+to[0];
  try {
    fs.statSync(_toPath)
  }
  catch(err) {
    fs.writeFileSync(_toPath, fs.readFileSync(src, 'utf-8') , 'utf8') 
  }
 
};
var exists =  function( src, dst, to, callback ){
        if( fs.existsSync(dst+to[1]) ) callback( src, dst, to); 
        else{ 
          mkdirsSync(dst+to[1])
          callback( src, dst, to);
        }
};
mkdirsSync = (dirname) =>{
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};
function getArrayConvert(_arr){
  let _obj = {};
  _arr.forEach(ele => {
    _obj[path.resolve(ele.from)] = ele
  });
  return _obj;
}
function relPath(_path){
  return /^\.{1,2}\/([^\\\/\:\*\?\"\<\>\|]+\/)*[^\<\>\/\\\|\:\"\*\?]+\.[a-z0-9]+$/i.test(_path)? _path : 'node_modules/'+_path;
}
function ResolverConvert(options) {
    this.convertObj = {}
    this.convert = options && options.convert ? options.convert : options ;
    typeof  this.convert  === "object" ? this.convertObj[path.resolve(relPath(this.convert.from))] = this.convert : this.convertObj = getArrayConvert(this.convert);
 }
ResolverConvert.prototype.apply = function(compiler) {
    compiler.resolverFactory.hooks.resolver
    .for('normal')
    .tap('name', (resolver) => {
      // you can tap into resolver.hooks now
      resolver.hooks.result.tap('ResolverConvert', (result) => {
           if(this.convertObj[result.descriptionFileRoot]){
              let _rootPath = result.descriptionFileRoot;
              result.descriptionFileRoot = path.resolve(this.convertObj[_rootPath].to)
              exists( result.path , result.descriptionFileRoot ,splitFileName(result.relativePath.replace('./','/')), copy );
              result.path =  result.path.replace( _rootPath , result.descriptionFileRoot) 
              return result;
           }
        return result;
      });
    });
};

// {
//   context: {},
//   path: 'F:\\work2021\\vue\\src\\assets\\images\\list-homeBg.png',
//   request: undefined,
//   query: '',
//   module: false,
//   file: false,
//   descriptionFileRoot: 'F:\\work2021\\vue',
//   relativePath: './src/assets/images/list-homeBg.png',
// }


module.exports = ResolverConvert;