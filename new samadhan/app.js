const express = require('express');
const {KaggleNode} = require('kaggle-node');
const app = express();

// const {translate}= require('@google-cloud/translate');
const { Translate } = require('@google-cloud/translate/build/src/v2');
app.get('/', (req, resd)=>{
    res.send('done');
})
const translate = new Translate({projectId:"formal-office-442516-a4"})
// 
// let kaggleNode = new KaggleNode({
    // credentials:
    // key:
// })
app.post('/query', (req, res)=>{
   const result =  quickStart("hello world");
console.log(result);
res.send("done")

})


async function quickStart(text) {
    // The text to translate
   
    target="hi"
   

    const [translation] = await translate.translate(text,target);
    console.log(`text: ${text}`);
    console.log(`translation:${translation}`);
    
}
quickStart();

app.listen(3000, ()=>{
    console.log("server is running on 3000");
    
})

