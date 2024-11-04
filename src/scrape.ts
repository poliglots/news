import { scrapeCNN, scrapeWP, scrapeGL } from "./news";
import { writeFile, appendFile } from 'fs';

async function writeCNN(){
    // make file blank
    writeFile('docs/World.md', "", err => {
        if(err) console.log(err)
    });
    let content = await scrapeCNN();
    for(let i=0; i<content.length; i++){
        const data = new Uint8Array(Buffer.from("### " + content[i].message+content[i].url+"\n"));
        appendFile('docs/World.md', data, err => {
            if(err) console.log(err)
        });
    }
}

async function writeWP(){
    // make file blank
    writeFile('docs/Washington.md', "", err => {
        if(err) console.log(err)
    });
    let content = await scrapeWP();
    for(let i=0; i<content.length; i++){
        const data = new Uint8Array(Buffer.from("### " + content[i].message+content[i].url+"\n"));
        appendFile('docs/Washington.md', data, err => {
            if(err) console.log(err)
        });
    }
}

async function writeGL(){
    // make file blank
    writeFile('docs/Global.md', "", err => {
        if(err) console.log(err)
    });
    let content = await scrapeGL();
    for(let i=0; i<content.length; i++){
        const data = new Uint8Array(Buffer.from("### " + content[i].message+content[i].url+"\n"));
        appendFile('docs/Global.md', data, err => {
            if(err) console.log(err)
        });
    }
}

writeCNN();
writeWP();
writeGL();