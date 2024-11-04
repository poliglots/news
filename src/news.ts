import axios from 'axios';
import { parse } from 'node-html-parser';

const cnn = "https://edition.cnn.com"
const wp = "https://www.washingtonpost.com/"
const gl = "https://www.bloomberg.com/asia"

export interface myNews{
    message: string;
    url: string;
}

let config = {
    headers:{
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0"
    }
}


export async function scrapeCNN(): Promise<Array<myNews>> {
    console.log("into cn");
    let newsList: Array<myNews> = [];
    const resp = await axios.get(cnn, config);
    const root = parse(resp.data);
    const span_list = root.getElementsByTagName("span");
    for (let i=0; i<span_list.length; i++){
        let headline = span_list[i].text;
        if (headline.length > 50) {
            const mnews: myNews = {message: "["+span_list[i].text+"]", 
                url: "("+cnn+span_list[i].parentNode.parentNode.parentNode.getAttribute("href")!+")"};
            newsList.push(mnews)    
        }     
    }
    console.log(newsList.length);
    return newsList;
}

export async function scrapeWP(): Promise<Array<myNews>> {
    console.log("into wp");
    let newsList: Array<myNews> = [];
    const resp = await axios.get(wp, config);
    const root = parse(resp.data);
    const elem_list = root.getElementsByTagName("a");
    for (let i=0; i<elem_list.length; i++){
        let headline = elem_list[i].text;
        if (headline.length > 50) {
            const mnews: myNews = {message: "["+elem_list[i].text+"]", 
                url: "("+elem_list[i].getAttribute("href")!+")"};
            newsList.push(mnews)    
        }     
    }
    console.log(newsList.length);
    return newsList;
}

export async function scrapeGL(): Promise<Array<myNews>> {
    console.log("into gl");
    let newsList: Array<myNews> = [];
    const resp = await axios.get(gl, config);
    const root = parse(resp.data);
    const span_list = root.getElementsByTagName("span");
    for (let i=0; i<span_list.length; i++){
        let headline = span_list[i].text;
        if (headline.length > 50) {
            const mnews: myNews = {message: "["+span_list[i].text+"]", 
                url: "("+gl+span_list[i].parentNode.parentNode.parentNode.getAttribute("href")!+")"};
            newsList.push(mnews)    
        }     
    }
    console.log(newsList.length);
    return newsList;
}

