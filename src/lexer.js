const moo = require('moo');
const fs = require('mz/fs');
 
let lexer = moo.compile({
  WS:      /[ \t]+/,
  comment: /\/\/.*?$/,
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lparen:  '(',
  rparen:  ')',
  fatarrow: '=>',
  assign: '=', 
  //keyword: ['while', 'if', 'else', 'moo', 'cows'],
  NL:      { match: /\n/, lineBreaks: true },
  identifier: /[a-zA-Z][a-zA-z_0-9]*/,
});

async function main(){
    const code = (await fs.readFile("example.plang")).toString();
    lexer.reset(code);
    while (true){
        const token = lexer.next();
        if(!token){
            break;
        }
        console.log(token);
    }
}

main().catch(err => console.log(err.stack));